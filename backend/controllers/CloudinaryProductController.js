require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

///////////////////////////////////////////////////////////// Util Functions /////////////////////////////////////////////////////////////////

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
      subdomain.poster = cloudinary.url(
        `noteups/${domain}/${subdomain.name}/poster.jpg`
        // {
        //   width: 250,
        //   height: 350,
        //   crop: 'fill',
        // }
      );
    });

    return subdomainsClone;
  } catch (error) {
    console.error(error);
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
      subject.poster = cloudinary.url(
        `noteups/${domain}/${subdomain}/${subject.name}/poster.jpg`
        // {
        //   width: 250,
        //   height: 350,
        //   crop: 'fill',
        // }
      );
    });

    return subjectsClone;
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    addSubjectPosterUrlTransaction.finish();
  }
};
///////////////////////////////////////////////////////////// Controller Functions /////////////////////////////////////////////////////////////////

// Function to get all domain folders from cloudinary
const getAllDomains = async (req, res) => {
  const getDomainsTransaction = Sentry.startTransaction({
    op: "getDomains",
    name: "Get Domains",
  });

  try {
    const result = await cloudinary.api.sub_folders("noteups");
    res.send(result);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getDomainsTransaction.finish();
  }
};

// Function to get all subdomain within a domain folder from cloudinary
const getAllSubdomainsForDomain = async (req, res) => {
  const getSubdomainsTransaction = Sentry.startTransaction({
    op: "getSubdomains",
    name: "Get Subdomains",
  });

  try {
    const subdomains = await cloudinary.api.sub_folders(
      `noteups/${req.params.domain}`
    );

    const subdomainsWithPosters = addSubdomainPosterUrl(
      req.params.domain,
      subdomains
    );
    res.send(subdomainsWithPosters);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubdomainsTransaction.finish();
  }
};

const getAllSubjectsForSubdomain = async (req, res) => {
  const getSubjectsTransaction = Sentry.startTransaction({
    op: "getSubjects",
    name: "Get Subjects",
  });

  try {
    const subjects = await cloudinary.api.sub_folders(
      `noteups/${req.params.domain}/${req.params.subdomain}`
    );

    const subjectsWithPosters = addSubjectPosterUrl(
      req.params.domain,
      req.params.subdomain,
      subjects
    );
    res.send(subjectsWithPosters);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubjectsTransaction.finish();
  }
};

// Function to get all pdfs within a subject within a domain folder from cloudinary
const getAllPDFsForSubject = async (req, res) => {
  const getPdfsTransaction = Sentry.startTransaction({
    op: "getPdfs",
    name: "Get Pdfs",
  });

  try {
    const result = await cloudinary.api.resources(
      `noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getPdfsTransaction.finish();
  }
};

const getSubjectDetails = async (req, res, next) => {
  const getSubjectDetailsTransaction = Sentry.startTransaction({
    op: "getSubjectDetails",
    name: "Get Subject Details",
  });
  try {
    // search for deatils.json in cloudinary folder
    const { resources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND  
        resource_type:raw AND
        filename:details.json`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    // console.log(resources);
    res.send(resources[0]);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubjectDetailsTransaction.finish();
  }
};

const getSubjectImages = async (req, res, next) => {
  const getSubjectImagesTransaction = Sentry.startTransaction({
    op: "getSubjectImages",
    name: "Get Subject Images",
  });

  try {
    // search for images in cloudinary folder
    const { resources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND
        (format:jpg OR format:png)`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    res.send(resources);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubjectImagesTransaction.finish();
  }
};

const getSubjectPDFs = async (req, res) => {
  const getSubjectPDFsTransaction = Sentry.startTransaction({
    op: "getSubjectPDFs",
    name: "Get Subject PDFs",
  });

  try {
    // search for pdfs in cloudinary folder
    const { resources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND
        format:pdf`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    res.send(resources);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubjectPDFsTransaction.finish();
  }
};

const getSubjectEverything = async (req, res, next) => {
  const getSubjectEverythingTransaction = Sentry.startTransaction({
    op: "getSubjectEverything",
    name: "Get Subject Everything",
  });

  try {
    // search for images in cloudinary folder
    const { resources: imageResources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND 
        (format:jpg OR format:png)`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    const { resources: detailsResources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND
        resource_type:raw AND
        filename:details.json`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    const { resources: pdfResources } = await cloudinary.search
      .expression(
        `folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject} AND
        format:pdf`
      )
      .sort_by("created_at", "desc")
      .max_results(10)
      .execute();

    const subjectEverything = {
      images: imageResources,
      details: detailsResources[0],
      pdfs: pdfResources,
    };

    res.send(subjectEverything);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    getSubjectEverythingTransaction.finish();
  }
};

const uploadSubject = async (req, res, next) => {
  const uploadTransaction = Sentry.startTransaction({
    op: "upload",
    name: "Upload",
  });

  try {
    const fileStr = req.body.PDFs;
    console.log(`fileStr ${fileStr}`);

    let promises = [];

    fileStr.forEach((file) => {
      promises.push(
        cloudinary.uploader.upload(file, {
          folder: `noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`,
          use_filename: true,
          unique_filename: false,
          // transformation: [
          //   { width: 500, height: 500, crop: 'limit' },
          //   { quality: 'auto' }
          // ]
        })
      );
    });

    Promise.all(promises).then((results) => {
      res.send(results);
    });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  } finally {
    uploadTransaction.finish();
  }
};

// export all above functions
module.exports = {
  getSubjectDetails,
  getSubjectImages,
  getSubjectPDFs,
  getSubjectEverything,
  uploadSubject,
  getAllDomains,
  getAllSubdomainsForDomain,
  getAllSubjectsForSubdomain,
  getAllPDFsForSubject,
};
