require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const mongoose = require("mongoose");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

require("./services/SentryService");
require("./database/connectDBs");
// const multer = require('multer');

const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

// Function to add poster url to each subdomain from cloudinary
const addSubdomainPosterUrl = (domain, subdomains) => {

  const addSubdomainPosterUrlTransaction = Sentry.startTransaction({
    op: "addSubdomainPosterUrl",
    name: "Add Subdomain Poster Url",
  });

  try {
    // Create a clone of subdomains
    const subdomainsClone = JSON.parse(JSON.stringify(subdomains));

    // Correct way to add JSON fields to an object 
    subdomainsClone.folders.map((subdomain) => {
      subdomain.poster = cloudinary.url(`noteups/${domain}/${subdomain.name}/poster.jpg`,
        // {
        //   width: 250,
        //   height: 350,
        //   crop: 'fill',
        // }
      );
    });

    return subdomainsClone;
  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    addSubdomainPosterUrlTransaction.finish();
  }
};

const addSubjectPosterUrl = (domain, subdomain, subjects) => {

  const addSubjectPosterUrlTransaction = Sentry.startTransaction({
    op: "addSubjectPosterUrl",
    name: "Add Subject Poster Url",
  });

  try {
    // Create a clone of subjects
    const subjectsClone = JSON.parse(JSON.stringify(subjects));

    // Correct way to add JSON fields to an object
    subjectsClone.folders.map((subject) => {
      subject.poster = cloudinary.url(`noteups/${domain}/${subdomain}/${subject.name}/poster.jpg`,
        // {
        //   width: 250,
        //   height: 350,
        //   crop: 'fill',
        // }
      );
    });
  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  }
  finally {
    addSubjectPosterUrlTransaction.finish();
  }

  return subjectsClone;
};


// Function to get all domain folders from cloudinary
app.get("/api/domains", async (req, res) => {

  const getDomainsTransaction = Sentry.startTransaction({
    op: "getDomains",
    name: "Get Domains",
  });

  try {
    const result = await cloudinary.api.sub_folders("noteups");
    res.send(result);
  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    getDomainsTransaction.finish();
  }
});

// Function to get all subdomain within a domain folder from cloudinary
app.get("/api/:domain/subdomains", async (req, res) => {

  const getSubdomainsTransaction = Sentry.startTransaction({
    op: "getSubdomains",
    name: "Get Subdomains",
  });

  try {
    const subdomains = await cloudinary.api.sub_folders(`noteups/${req.params.domain}`);

    const subdomainsWithPosters = addSubdomainPosterUrl(req.params.domain, subdomains);
    res.send(subdomainsWithPosters);

  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    getSubdomainsTransaction.finish();
  }

});

// Function to get all subjects within a subdomain folder from cloudinary
app.get("/api/:domain/:subdomain/subjects", async (req, res) => {

  const getSubjectsTransaction = Sentry.startTransaction({
    op: "getSubjects",
    name: "Get Subjects",
  });

  try {
    const subjects = await cloudinary.api.sub_folders(`noteups/${req.params.domain}/${req.params.subdomain}`);

    const subjectsWithPosters = addSubjectPosterUrl(req.params.domain, req.params.subdomain, subjects);
    res.send(subjectsWithPosters);

  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    getSubjectsTransaction.finish();
  }
});


// Function to get all pdfs within a subject within a domain folder from cloudinary
app.get("/api/:domain/:subdomain/:subject", async (req, res) => {

  const getPdfsTransaction = Sentry.startTransaction({
    op: "getPdfs",
    name: "Get Pdfs",
  });

  try {
    const result = await cloudinary.api.resources(`noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`);
    res.send(result);
  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    getPdfsTransaction.finish();
  }
});


app.get('/api/download/:domain/:subdomain/:subject', async (req, res, next) => {

  const downloadTransaction = Sentry.startTransaction({
    op: "download",
    name: "Download",
  });
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`)
      .sort_by('created_at', 'desc')
      .max_results(10)
      .execute();

    console.log(req.params.domain, req.params.subject);
    const publicIds = resources.map(file => file.public_id);
    console.log(publicIds);
    res.send(publicIds);
  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    downloadTransaction.finish();
  }

});

app.post('/api/upload/:domain/:subdomain/:subject', async (req, res, next) => {

  const uploadTransaction = Sentry.startTransaction({
    op: "upload",
    name: "Upload",
  });

  try {
    const fileStr = req.body.PDFs;
    console.log(`fileStr ${fileStr}`);

    let promises = [];

    fileStr.forEach(file => {
      promises.push(cloudinary.uploader.upload(file, {
        folder: `noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`,
        use_filename: true,
        unique_filename: false,
        // transformation: [
        //   { width: 500, height: 500, crop: 'limit' },
        //   { quality: 'auto' }
        // ]
      }
      ));
    });

    Promise.all(promises).then(results => {
      res.send(results);
    });

  } catch (error) {
    console.error(error)
    Sentry.captureException(error);
  } finally {
    uploadTransaction.finish();
  }
});


app.use('/api', require('./routes/api.route'));

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
