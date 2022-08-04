require("dotenv").config();
require("./services/SentryService");
require("./database/connectDBs");

const cors = require("cors");
const express = require("express");
const session = require("express-session");

const MongoStore = require("connect-mongo");

const createError = require("http-errors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Passport
const passport = require("passport");
require("./middleware/passport");
require("./services/PassportOAuthService");

// NodeJS Strategies
const compression = require("compression");
const rateLimitter = require("express-rate-limit");
const responseTime = require("response-time");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { connection } = require("./database/connectDBs");
const { stripeWebhooks } = require("./controllers/payment/StripeWebhooks");

///////////////////////////////////////////////////////////// APP /////////////////////////////////////////////////////////////////

const app = express();

app.post("/stripe-webhook", express.raw({ type: "*/*" }), stripeWebhooks);
// stripe webhook needs express.raw because it is sending a raw body

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.WEB_APP_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionSuccessStatus: 200,
    maxAge: 3600,
  })
);

app.use(
  compression({
    level: parseInt(process.env.COMPRESSION_LEVEL, 10),
    threshold: parseInt(process.env.COMPRESSION_THRESHOLD, 10),
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(
  rateLimitter({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10), // user should be able to make RATE_LIMIT_MAX requests every RATE_LIMIT_WINDOW_MS seconds
    max: parseInt(process.env.RATE_LIMIT_MAX, 10), // limit each IP to RATE_LIMIT_MAX requests per windowMs
    message: {
      code: 429,
      message: "Too many requests, please try again later",
    },
  })
);

app.use(responseTime({ digits: 2 }));

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// );
// app.use(cookieParser());

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // this is age for the cookie in milliseconds
      maxAge: 30 * 24 * 60 * 60 * 1000,

      // this is the key for the cookie
      keys: [process.env.COOKIE_KEY],

      // An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data.
      httpOnly: false,

      // Note: Standards related to the Cookie SameSite attribute recently changed such that:
      // The cookie-sending behavior if SameSite is not specified is SameSite=Lax. Previously the default was that cookies were sent for all requests.
      // Cookies with SameSite=None must now also specify the Secure attribute (they require a secure context/HTTPS).
      // Cookies from the same domain are no longer considered to be from the same site if sent using a different scheme (http: or https:).

      // Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute. By default, this is false.
      // true will set the SameSite attribute to Strict for strict same site enforcement.
      // false will not set the SameSite attribute.
      // 'lax' will set the SameSite attribute to Lax for lax same site enforcement.
      // 'none' will set the SameSite attribute to None for an explicit cross-site cookie.
      // 'strict' will set the SameSite attribute to Strict for strict same site enforcement.
      sameSite: 'none',
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////////////////////////// ROUTES /////////////////////////////////////////////////////////////////
app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/user", require("./routes/UserRoutes"));
app.use("/auth", require("./routes/OAuthLoginRoutes"));
app.use("/mongo", require("./routes/MongoProductRoutes"));
app.use("/productApi", require("./routes/CloudinaryProductRoutes"));
app.use("/stripeApi", require("./routes/payment/StripeRoutes"));
app.use("/api", require("./routes/api.route"));

///////////////////////////////////////////////////////////// ERROR HANDLING /////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
