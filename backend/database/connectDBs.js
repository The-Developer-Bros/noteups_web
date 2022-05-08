const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const mongoose = require("mongoose");

// connect to the database
const connectMonooseTransaction = Sentry.startTransaction({
    op: "connectMonoose",
    name: "Connect Mongoose",
});
try {
    mongoose.connect((process.env.MONGODB_URI || "mongodb://localhost/noteups"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    });
    console.log(`Connected to the database successfully`);
} catch (error) {
    console.error(error)
    Sentry.captureException(error);
} finally {
    connectMonooseTransaction.finish();
}

const connectCloudinaryTransaction = Sentry.startTransaction({
    op: "connectCloudinary",
    name: "Connect Cloudinary",
});

try {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
} catch (error) {
    console.error(error)
    Sentry.captureException(error);
}