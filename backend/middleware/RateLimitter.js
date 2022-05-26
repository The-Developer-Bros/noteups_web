const rateLimitter = require("express-rate-limit");

// This is global rate limitter for all routes
export const rateLimitterMiddleware = rateLimitter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10), // user should be able to make RATE_LIMIT_MAX requests every RATE_LIMIT_WINDOW_MS seconds
  max: parseInt(process.env.RATE_LIMIT_MAX, 10), // limit each IP to RATE_LIMIT_MAX requests per windowMs
  message: {
    code: 429,
    message: "Too many requests, please try again later",
  },
});

// This is rate limitter for specific routes
// Pass the function as a middleware to the route


