# Noteups - A Lecture Notes Sharing Platform

## Deployed Site Link for Frontend

[FRONTEND LINK](https://noteups-frontend.netlify.app/)

## Deployed Site Link for Backend

[BACKEND LINK](https://noteups-backend.herokuapp.com/)

### Server Routes

```js
app.use("/user", require("./routes/UserRoutes"));
app.use("/auth", require("./routes/OAuthLoginRoutes"));
app.use("/mongo", require("./routes/MongoProductRoutes"));
app.use("/productApi", require("./routes/CloudinaryProductRoutes"));
app.use("/stripeApi", require("./routes/payment/StripeRoutes"));
app.use("/api", require("./routes/api.route"));
```

### Cloudinary Product Routes

```js
router.get("/domains", getAllDomains);
router.get("/:domain/subdomains", getAllSubdomainsForDomain);
router.get("/:domain/:subdomain/subjects", getAllSubjectsForSubdomain);

router.get("/:domain/:subdomain/:subject", getAllPDFsForSubject);

router.get("/details/:domain/:subdomain/:subject", getSubjectDetails);
router.get("/images/:domain/:subdomain/:subject", getSubjectImages);
router.get("/pdfs/:domain/:subdomain/:subject", getSubjectPDFs);
router.get("/everything/:domain/:subdomain/:subject", getSubjectEverything);

router.post("/upload/:domain/:subdomain/:subject", uploadSubject);
```

### Mongo Product Routes

```js
router.get("/domains", listDomains);
router.get("/subdomains", listSubdomains);
router.get("/subjects", listSubjects);
router.get("/subscriptions", listUserSubscriptions);
```

### OAuth Routes

```js
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/");
}

.. more coming soon

```

### User Routes

```js
router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post(
  "/send-verification-mail",
  sendVerificationMailValidation,
  sendVerificationMail
);

router.post("/verify-user-mail", verifyUserMailValidation, verifyUserMail);

router.post(
  "/forgot-password",
  sendForgotPasswordMailValidation,
  sendForgotPasswordMail
);

router.post(
  "/verify-forgot-mail",
  verifyForgotMailValidation,
  verifyForgotMail
);
```

### Stripe Routes

```js
router.get("/prices", retrievePricesList);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/create-subscription-session", createSubscriptionSession);
router.post("/webhook", stripeWebhooks);
```

## Frontend Deployed on -> Netlify

- Connect with GitHub
- put in the build directory and the build command (`CI= npm run build`)
  along with base directory `"./frontend"` and the build directory `"./frontend/build"`
- Setup the environment variables
- Make an `_redirects file` inside public `directory` so that the file is located in `public/_redirects` and paste the line `/* /index.html 200` into the `_redirects` file
  This prevents 404 on netlify page refresh
- name the app `notesup-frontend`
- Obviously setup automatic deploys with Github

## Backend Deployed on -> Heroku

- Connect with GitHub in Heroku app(`noteups-backend`) dashboard
- Setup the environment variables
- Install heroku-cli
- `heroku login`
- Can deploy to Heroku via the web interface or the command line
- Obviously setup automatic deploys with Github

## Products Data Deployed on -> Cloudinary

- Products MetaData Deployed on -> MongoDB

<!-- URL -->

# How to deploy on Netlify and Heroku

- [Post](https://niruhan.medium.com/deploying-mern-fullstack-application-on-the-web-for-free-with-netlify-and-heroku-87d888012635)

# Contact

- Later entire app to be migrated to AWS
- [How to migrate to AWS ?](https://medium.com/@patrickmichelberger/building-a-serverless-e-commerce-app-with-aws-lambda-stripe-and-react-4663e241710b)
