const express = require("express");
const path = require("path");
const cors = require("cors");
const i18nextMiddleware = require("i18next-http-middleware");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { logger } = require("./src/controllers/logger.controller");
const db = require("./src/models");
const { assertEnvironment } = require("./src/helpers/environment");
const { audit } = require("./src/helpers/messaging");
const emailService = require("./src/services/email.service");
const { localeDateTime, inject } = require("./src/helpers/misc");
const i18n = require("./src/middlewares/i18n");
const rateLimit = require("./src/middlewares/rateLimit");
const checkReferer = require("./src/middlewares/checkReferer");
const passportSetup = require("./src/middlewares/passportSetup");
const config = require("./src/config");

const configInjectedFileName = "config.json"; // injected config file name

// environment configuration
// if (config.mode.production) { // load environment variables from .env file
//   logger.info("Loading production environment");
//   require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
// } else { // load environment variables from .env.dev file
//   logger.info("Loading development environment");
//   require("dotenv").config({ path: path.resolve(__dirname, "./.env.dev") });
// }
// environment configuration
if (config.mode.development) { // load environment variables from .env.dev file
  logger.info("Loading development environment");
  require("dotenv").config({ path: path.resolve(__dirname, "./.env.dev") });
}
// in production we have variables in environment from the provider "secrets" setup (see `yarn fly-import-secrets`)

const app = express();

//console.log("HELMET:", helmet.contentSecurityPolicy.getDefaultDirectives());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'"],
    fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "https: data:"]
  }
}));

// use compression
app.use(compression());

// log requests to express output, while developing
if (config.mode.development) {
  app.use(morgan("dev"));
}

// enable CORS, and whitelist our urls
app.use(cors({
  // origin: Object.keys(config.clientDomains).map(domain => config.clientDomains[domain]), // TODO!!!
  origin: true,
  methods: "GET,POST", // allowed methods
  credentials: true, // if you need cookies/auth headers
  exposedHeaders: ["X-Maintenance-Status"],
}));

// initialize Passport and session management using the middleware
passportSetup(app);

// parse requests of content-type - application/json
app.use(express.json({
  limit: config.api.payloadLimit, // limit payload to avoid too much data to be uploaded
}));

// use i18n
app.use(i18nextMiddleware.handle(i18n/*ext*/));

// apply rate limiting middleware globally
app.use(rateLimit);

// apply check referer middleware globally
app.use(checkReferer);

// add default headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // if (process.env.MAINTENANCE === "true") { // handle maintenance mode
  //   res.header("X-Maintenance-Status", "true");
  // }
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
  next();
});

// merge req.query and req.body to req.parameters
app.use((req, res, next) => {
  console.log("app.use - req.query, req.body:", req.query, req.body); // TODO...
  req.parameters = Object.assign({}, req.query, req.body);
  next();
});

// handle maintenance mode
app.use((req, res, next) => {
  if (process.env.MAINTENANCE === "true") {
    res.header("X-Maintenance-Status", "true");
  }
  next();
});

// handle version, if needed
app.use((req, res, next) => {
  // req.version is used to determine the version
  req.version = req.headers["accept-version"];
  next();
});

// verify if request verb is allowed
app.use((req, res, next) => {
  if (config.api.allowedVerbs.includes(req.method)) {
    next();
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
});

// setup the email service
emailService.setup(process.env.BREVO_EMAIL_API_KEY);

// assert environment to be fully compliant with expectations
assertEnvironment();

// the client root: the folder with the frontend site
const rootClient = path.join(__dirname, "client", "build");
// the client src root, used to inject client src too
const rootClientSrc = path.join(__dirname, config.clientSrc);
// the coverage root (used while developing only)
const rootCoverage = path.join(__dirname, "coverage");

// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/product.routes")(app);
require("./src/routes/payment.routes")(app);
require("./src/routes/misc.routes")(app);

// expose a /public folder on server
if (config.publicBasePath) {
  app.use(express.static(path.join(__dirname, config.publicBasePath)));
}

// handle errors in API routes
app.use((err, req, res, next) => {
  res.locals.error = err;
  logger.error(`Server error: ${err.message}`);
  let status = err.status || 500;
  let message = `${err.message || req.t("Server error")}`
  if (status === 500) {
    message += ` -  ${req.t("We are aware of this error, and working to solve it")}. ${req.t("Please, retry soon")}`;
  }
  return res.status(status).json({ message });
});

// handle static routes
app.use("/", express.static(rootClient)); // base client root
config.mode.development && app.use("/coverage", express.static(rootCoverage)); // coverage root

// handle not found API routes
app.all(/^\/api(\/.*)?$/, (req, res) => {
  return res.status(404).json({ message: "Not found" });
})

// handle client route for base urls
app.get("/", async (req, res) => {
  //res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString()); 
  if (process.env.MAINTENANCE === "true") {
    res.header("X-Maintenance-Status", "true");
  }
  res.sendFile(path.resolve(rootClient, "index.html"));
});

// handle client routes for all other urls
app.get("*", (req, res) => {
  res.sendFile(path.resolve(rootClient, "index.html"));
});

// inject client app config in configInjectedFileName
const injectConfig = () => {
  try {
    inject(rootClient, rootClientSrc, config.app, configInjectedFileName);
  } catch (err) {
    logger.error(`Error injecting config app data in ${configInjectedFileName} file:`, err);
    throw err;
  }
};

async function start() {
  try {
    await db.connect(); // connect database, synchronously
  } catch (err) {
    logger.error(`Database connection error: ${err}`, `${process.env.MONGO_SCHEME}://${process.env.MONGO_URL}/${process.env.MONGO_DB}`);
    process.exit(1);
  }

  if (!config.mode.containerized) {
    injectConfig();
  }
  
  try {
    // listen for requests
    let port = process.env.PORT;
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      audit({ subject: `server startup`, htmlContent: `Server is running on port ${port} on ${localeDateTime()}` });
    });
  } catch (err) {
    logger.error(`Server listen error: ${err}`);
  }
};

// export the app
module.exports = app;

// if not in test mode, start the server immediately
if (!config.mode.test) {
  start();
}
