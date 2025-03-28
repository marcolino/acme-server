#!/usr/bin/env node
/**
 * Upload new local secrets to github, in parallel
 */

const fs = require("fs");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const sodium = require("libsodium-wrappers");
const crypto = require("crypto");

// configuration
const LOCAL_ENV_FILE = ".env";
const CACHE_FILE = ".secrets-cache.json";

// check if .env file exists
if (!fs.existsSync(LOCAL_ENV_FILE)) {
  console.error(`Error: .env file not found at ${LOCAL_ENV_FILE}`);
  process.exit(1);
}

// load environment variables
dotenv.config({ path: LOCAL_ENV_FILE });

// load or initialize the cache
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  }
  return {};
}

// save the cache to disk
function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// generate a hash of the secret value
function hashSecretValue(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// fetch GitHub public key
async function fetchPublicKey() {
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/actions/secrets/public-key`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch GitHub public key");
    process.exit(1);
  }

  const data = await response.json();
  return { key: data.key, keyId: data.key_id };
}

// encrypt a secret using the GitHub public key
async function encryptSecret(publicKey, secretValue) {
  await sodium.ready;
  const keyBytes = Buffer.from(publicKey, "base64");
  const secretBytes = Buffer.from(secretValue, "utf-8");
  const encryptedBytes = sodium.crypto_box_seal(secretBytes, keyBytes);
  return Buffer.from(encryptedBytes).toString("base64");
}

// upload encrypted secret to GitHub
async function uploadSecret(secretName, encryptedValue, keyId) {
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/actions/secrets/${secretName}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encrypted_value: encryptedValue,
        key_id: keyId,
      }),
    }
  );

  if (!response.ok) {
    console.error(`Failed to upload secret "${secretName}"`);
    console.error(await response.text());
    return false;
  }

  //console.info(`Secret "${secretName}" uploaded successfully`);
  return true;
}

// main function to process secrets
async function processSecrets() {
  const { key, keyId } = await fetchPublicKey();
  const secretEntries = dotenv.parse(fs.readFileSync(".env"));
  const cache = loadCache();

  const secretsToUpload = Object.entries(secretEntries)
    .filter(([secretName, secretValue]) => {
      if (!secretName || !secretValue) {
        console.warn(`Skipping invalid secret: ${secretName} = ${secretValue}`);
        return false;
      }
      if (secretName.startsWith("#") || secretName.startsWith("GITHUB_")) {
        //console.info(`Skipping comment or GitHub key: ${secretName}`);
        return false;
      }
      return true;
    })
    .map(async ([secretName, secretValue]) => {
      const secretHash = hashSecretValue(secretValue);

      // skip if the secret is already uploaded and hasn't changed
      if (cache[secretName] === secretHash) {
        //console.info(`Skipping unchanged secret: ${secretName}`);
        return true;
      }

      const encryptedValue = await encryptSecret(key, secretValue);
      const uploadSuccess = await uploadSecret(secretName, encryptedValue, keyId);

      // update the cache if the upload was successful
      if (uploadSuccess) {
        cache[secretName] = secretHash;
      }

      return uploadSuccess;
    });

  // upload secrets in parallel
  const results = await Promise.all(secretsToUpload);

  // Save the updated cache
  saveCache(cache);

  // check for failures
  if (results.some((result) => result === false)) {
    console.error("Some secrets failed to upload");
    process.exit(1);
  }

  //console.info("All secrets processed successfully");
}

// run the script
processSecrets().catch((err) => {
  console.error("Error processing secrets to upload to GitHub:", err);
  process.exit(1);
});