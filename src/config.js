const path = require("path");
const fs = require("fs");

const test = (typeof global.it === "function"); // test mode (inside mocha/chai environment)
const production = (!test && (process.env.NODE_ENV === "production")); // production mode (production behaviour, production db on public host)
const staging = (!test && (process.env.NODE_ENV === "staging")); // staging mode (production behaviour, production db on local host)
const development = (!test && (process.env.NODE_ENV === "development")); // development mode (development behaviour , local db on local host)
const livestripe = (!test && (process.env.STRIPE_MODE === "live")); // stripe mode is "live"  

const apiName = "ACME";
const appName = "acme";
const currency = "EUR"; // default currency (ISO 4217:2015)
const company = "Sistemi Solari Rossi";
const urlPublic = "https://acme-server-lingering-brook-4120.fly.dev";
const urlLocal = "http://localhost:5000";
const baseUrl = production ? urlPublic : urlLocal;
const clientSrc = `../${appName}-client/src`; // client app source relative folder to inject config file (do not change for customizations)

const customization = "mda"; // custom configuration to be merged with configBase

/**
 * Import envronment variables from env file depending on current mode.
 * In production we don't have an env file, but a "secrets" environment from the provider
 */
if (!production) {
  require("dotenv").config({ path: staging ? "./.env" : "./.env.dev" });
}


const configBase = {
  mode: {
    production,
    staging,
    development,
    test,
  },
  baseUrl,
  api: {
    name: apiName,
    payloadLimit: "100mb",
    rateLimit: {
      maxRequestsPerMinute: 1000, // limit requests per minute (use 1 to throttle all requests)
      delayAfterMaxRequestsSeconds: 3, // delay after limit is reached
    },
    allowedVerbs: [
      "GET",
      "POST",
    ],
  },
  publicBasePath: "/public", // use for example as "/public/" if a public folder on server is needed
  clientSrc, // client src folder, to be able to inject the client app section of this config file
  auth: {
    accessTokenExpirationSeconds: 60 * 30, // 30 minutes TTL
    refreshTokenExpirationSeconds: 60 * 60 * 24 * 7, // 1 week TTL
    verificationCodeExpirationSeconds: 60 * 60 * 1, // 1 hour TTL
    codeDeliveryMedium: "email", // "email" / "sms" / ...
  },
  roles: [
    {
      name: "user",
      priority: 1,
    }, {
      name: "dealer",
      priority: 10,
    }, {
      name: "operator",
      priority: 20,
    }, {
      name: "admin",
      priority: 100,
    },
  ],
  plans: [
    {
      name: "free",
      priceCurrency: currency,
      pricePerYear: 0,
      pricePerMonth: undefined,
      supportTypes: [ "email" ],
    },
    {
      name: "standard",
      priceCurrency: currency,
      pricePerYear: 399,
      pricePerMonth: undefined,
      supportTypes: [ "email" ],
    },
    {
      name: "unlimited",
      priceCurrency: currency,
      pricePerYear: 799,
      pricePerMonth: undefined,
      supportTypes: [ "email", "phone" ],
    },
  ],
  products: {
    images: {
      path: "/public/assets/products/images",
      pathWaterMark: "/public/assets/products/imagesWaterMark",
      maximumSidePixels: 1024,
      format: "webp",
      qualityPercent: 80,
      alphaQualityPercent: 90,
      basepath: "/assets/products/images",
    },
  },
  logs: {
    file: "logs/acme.log", // logs and exceptions file
    betterstack: {
      enable: true,
    },
    papertrail: {
      enable: false,
      host: "logs6.papertrailapp.com",
      port: 18466,
    },
    levelMap: { // log levels for all currently foreseen modes
      // in test mode skip console logging for levels lower than crit (error, warning, notice, info, debug)
      // in production mode skip console logging for levels lower than warning (notice, info, debug)
      // in staging mode skip console logging for levels lower than debug (none)
      // in development mode skip console logging for levels lower than info (debug)
      test: "crit",
      production: "warning",
      staging: "debug",
      development: "debug",
    },
  },
  locale: "it", // server"s locale (for dates)
  currency,
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10 MB
  },
  clientDomains: [
    baseUrl,
    "http://localhost:5000", // TODO: for testing a production environment in a local container...
    "http://localhost:5005", // TODO: for development only...
    "http://localhost:4173", // TODO: for staging only...
  ],
  clientEmailUnsubscribeUrl: `${baseUrl}/email-unsubscribe`,
  clientEmailPreferencesUrl: `${baseUrl}/email-preferences`,
  payment: {
    stripe: {
      enabled: false,
      products: livestripe ? { // stripe mode is live
        free: {
          name: "Prodotto Gratuito LIVE",
          product_id: "prod_LC4k3rwA64D45l",
          price_id: "price_1KVgafFZEWHriL1u8PFSvxSy",
        },
        standard: {
          name: "Prodotto Standard LIVE",
          product_id: "prod_LC4lYicsBXPmIA",
          price_id: "price_1KVgbfFZEWHriL1uR5BnWO9W",
        },
        unlimited: {
          name: "Prodotto Illimitato LIVEKBJ",
          price_id: "price_1KVgdSFZEWHriL1udJubMAAn",
        },
      } : { // stripe mode is test
        free: {
          name: "Prodotto Gratuito (test)",
          product_id: "prod_LC4q54jgFITE0U",
          price_id: "price_1KVggqFZEWHriL1uD8hlzL3S",
        },
        standard: {
          name: "Prodotto Standard (test)",
          product_id: "prod_LC4tiakN3cKlSA",
          price_id: "price_1KVgjRFZEWHriL1ujZm3tF2h",
        },
        unlimited: {
          name: "Prodotto Illimitato (test)",
          product_id: "prod_LC4og5H6lpSLoK",
          price_id: "price_1KVgfKFZEWHriL1utJyT904c",
        },
      },
      paymentSuccessUrl: `${baseUrl}/api/payment/paymentSuccess`, // TODO: test me
      paymentCancelUrl: `${baseUrl}/api/payment/paymentCancel`, // TODO: test me
      paymentSuccessUrlClient: `${baseUrl}/payment-success`,
      paymentCancelUrlClient: `${baseUrl}/payment-cancel`,
    },
  },
  email: {
    dryrun: !production, // if true, do not really send emails, use fake send
    subject: {
      prefix: apiName,
    },
    administration: {
      from: "marcosolari@gmail.com",
      fromName: "Sistemi Solari Rossi backend server",
      to: "marcosolari@gmail.com", // "sistemisolarirossi@gmail.com" // when we read this account
      toName: "ACME admin",
    },
    support: {
      to: "marcosolari@gmail.com", // "sistemisolarirossi@gmail.com" // when we read this account
      toName: "ACME support",
    },
    templatesPath: "../templates",
    templatesExtension: ".ejs",
  },
  defaultUsers: {
    admin: {
      email: "marcosolari@gmail.com",
      password: process.env.ADMIN_USER_DEFAULT_PASSWORD,
      firstName: "admin name",
      lastName: "admin surname",
    },
  },
  envRequiredVariables: [
    "JWT_TOKEN_SECRET",
    "MAINTENANCE",
    "ADMIN_USER_DEFAULT_PASSWORD",
    "MONGO_SCHEME",
    "MONGO_URL",
    "MONGO_DB",
    "MONGO_USER",
    "MONGO_PASS",
    "PASSPORT_SECRET",
    "BREVO_EMAIL_API_KEY",
    "STRIPE_MODE",
    "STRIPE_API_KEY_TEST",
    "STRIPE_API_KEY_LIVE",
    "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET",
    "FACEBOOK_OAUTH_CLIENT_ID",
    "FACEBOOK_OAUTH_SECRET_KEY",
  ],
  app: { // this section will be copied to client project as "config.json" file
    _: "WARNING: Please do not edit this file directly! Edit file \"src/config.js\" on the server project, then do \`yarn start-dev\` to inject new config here.",
    customization,
    mode: {
      production,
      staging,
      development,
      test,
    },
    name: appName, // app name
    title: apiName, // app title
    siteUrl: baseUrl, // site url
    company: {
      name: `${company} s.r.l.`,
      title: `${company}`,
      phone: "+39 333 6480983",
      address: "Via Felisio, 19 - 10098 Rivoli (TO)",
      mailto: "mailto:marcosolari@gmail.com", // "sistemisolarirossi@gmail.com" // when we read this account
      copyright: `© ${new Date().getFullYear()} ${company}. All rights reserved.`,
      homeSite: {
        name: "sistemisolarirossi.it", // TODO...
        url: baseUrl,
      },
      owner: {
        name: "Marco Solari",
        fiscalCode: "SLRMRC61M31L219Y",
        streetAddress: "Via Felisio, 19",
        city: "Rivoli",
        province: "TO",
        zipCode: "10098",
        phone: "+39 333 6480983",
        email: "marcosolari@gmail.com",
      },
      contacts: {
        // claimsTitle: i18n.t("Our Company Claims"),
        // claimsSubtitle: i18n.t("We provide the best services in the industry, focusing on quality and customer satisfaction"),
        map: {
          center: [45.0708062, 7.5151672],
          zoom: 13,
        }
      },
    },
    api: { // API settings for clients
      version: 1, // use this as a default for all API calls which do not specify any specific version (in headers["Accept-Version"])
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      timeoutSeconds: production ? 10 : 30, // the maximum time in seconds to wait for an API response
    },
    images: {
      publicPath: "/assets/products/images",
      publicPathWaterMark: "/assets/products/imagesWaterMark",
    },
    legal: {
      termsValidityStartDate: "01-01-2025", // start date of terms validity
      cookieConsentExpirationDays: 365, // days after which cookie with privacy consent does expire
    },
    manifest: {
      // if PWA is hosted at the root of domain (https://example.com/), and it always starts from the root
      // regardless of where the manifest.json is located, use: "start_url": "/";
      // if instead PWA is within a subdirectory (https://example.com/app), and it starts from that subdirectory,
      // use: "start_url": "/app"
      startUrl: "./", // start_url value in manifest
      display: "standalone", // display value in manifest
    },
    auth: {
      clientSessionExpirationSeconds: 60 * 60 * 36, // the seconds of user inactivity before we ask user for session continuation (should be less than auth.refreshTokenExpirationSeconds)
      clientSessionExpirationResponseMaximumSeconds: 15 * 60, // the seconds the user has to respond to the question, before being forcibly logged out
      clientLastActivityCheckTimeoutSeconds: 60 * 60 * 1, // the seconds timeout when we check if client session is expired for user inactivity
    },
    spinner: { // loading spinner
      /** choose one in type in:
       *    Audio, Comment, Grid, Hearts, Hourglass, Oval,
       *    RotatingLines, RotatingSquare, ThreeDots, Watch
       */
      //type: "Watch",
      delay: 500,
      thickness: 4,
      size: 64,
      opacity: 0.9,
      color: "ochra",
    },
    i18n: {
      country: "it",
      phonePrefix: "+39",
      languages: { // ISO 639 language codes
        initial: "it", // the initial language to use for translations: when initializing i18next, setting the lng option determines the language (lng) that i18next will attempt to use first for translations
        supported: {
          "en": { icon: "🇬🇧" },
          "it": { icon: "🇮🇹" },
        },
        fallback: "it", // defines the fallback language(s) to use when a translation in the initial language (lng) is not found; this can be a single language code, an array of language codes, or even a function that dynamically determines the fallback language based on the current language code
      },
    },
    ui: {
      themeMode: "light",
      footerHeight: "1.5rem",
      extraSmallWatershed: 600,
      mobileDesktopWatershed: 900,
      // sounds: {
      //   buttonClick,
      // },
      usePlans: true, // if we do use plans in the app
      toastAutoCloseSeconds: 7, // TODO: REMOVEME
      snacks: {
        maxInStack: 3,
        autoHideDurationSeconds: 5,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        },
        style: {
          fontSize: "1.1rem",
          whiteSpace: "pre-line"
        },
        closeIcon: {
          fontSize: "1.1rem",
        }
      },
      backgroundVideo: "steam",
    },
    oauth: {
      domain: "auth.sistemisolari.com",
      // OK for Google // scope: [ "phone", "email", "profile", "openid", "aws.cognito.signin.user.admin" ],
      scope: [ "email", "openid", "aws.cognito.signin.user.admin" ],
      responseType: "code",
      redirectSignIn: baseUrl,
      redirectSignOut: baseUrl, // TODO: use me!!!
      federatedSigninProviders: [ // we currently handle "Facebook", "Google"
        "Google",
        "Facebook",
      ],
    },
  },
};

let configCustom = {};
if (customization) {
  const configCustomizationPath = path.join(__dirname, `config.${customization}.js`);
  if (fs.existsSync(configCustomizationPath)) {
    configCustom = require(configCustomizationPath);
  } else {
    let error = `Config file ${configCustomizationPath} not found`;
    console.error(error);
    throw new Error(error);
  }
}

// deeply merge objects with precedence to the source one
const deepMergeObjects = (target, source) => {
  for (let key in source) {
    // check if the value is an object or an array
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      // if both target and source have the same key and they are objects, merge them recursively
      if (key in target) {
        Object.assign(source[key], deepMergeObjects(target[key], source[key]));
      }
    } else if (Array.isArray(source[key])) {
      // if the value is an array, merge arrays by concatenating them
      target[key] = (target[key] || []).concat(source[key]);
    }
  }
  // combine target and updated source
  const retval = Object.assign(target || {}, source);
  return Object.assign(target || {}, source);
}

const config = deepMergeObjects(configBase, configCustom);

module.exports = config;
