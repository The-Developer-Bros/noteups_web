require("dotenv").config();
require("./services/SentryService");
require("./database/connectDBs");

const cors = require("cors");
const express = require("express");
const session = require("express-session");

const createError = require("http-errors");
const cookieSession = require("cookie-session");
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

///////////////////////////////////////////////////////////// APP /////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.WEB_APP_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
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

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
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
app.use("/productApi", require("./routes/CloudinaryProductRoutes"));
app.use("/paymentApi", require("./routes/PaymentRoutes"));
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
