require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const mongoose = require("mongoose");

// connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/noteups").then(() => {
  console.log("Connected to database!");
}).catch(err => {
  console.log("Error connecting to database", err);
});


// const multer = require('multer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
};

const addSubjectPosterUrl = (domain, subdomain, subjects) => {

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

  return subjectsClone;
};


// Function to get all domain folders from cloudinary
app.get("/api/domains", async (req, res) => {
  try {
    const result = await cloudinary.api.sub_folders("noteups");
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// Function to get all subdomain within a domain folder from cloudinary
app.get("/api/:domain/subdomains", async (req, res) => {
  try {
    const subdomains = await cloudinary.api.sub_folders(`noteups/${req.params.domain}`);

    const subdomainsWithPosters = addSubdomainPosterUrl(req.params.domain, subdomains);
    res.send(subdomainsWithPosters);

  } catch (error) {
    next(error);
  }
});

// Function to get all subjects within a subdomain folder from cloudinary
app.get("/api/:domain/:subdomain/subjects", async (req, res) => {
  try {
    const subjects = await cloudinary.api.sub_folders(`noteups/${req.params.domain}/${req.params.subdomain}`);

    const subjectsWithPosters = addSubjectPosterUrl(req.params.domain, req.params.subdomain, subjects);
    res.send(subjectsWithPosters);

  } catch (error) {
    next(error);
  }
});


// Function to get all pdfs within a subject within a domain folder from cloudinary
app.get("/api/:domain/:subdomain/:subject", async (req, res) => {
  try {
    const result = await cloudinary.api.resources(`noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`);
    res.send(result);
  } catch (error) {
    next(error);
  }
});


app.get('/api/download/:domain/:subdomain/:subject', async (req, res, next) => {
  const { resources } = await cloudinary.search
    .expression(`folder:noteups/${req.params.domain}/${req.params.subdomain}/${req.params.subject}`)
    .sort_by('created_at', 'desc')
    .max_results(10)
    .execute();

  console.log(req.params.domain, req.params.subject);
  const publicIds = resources.map(file => file.public_id);
  console.log(publicIds);
  res.send(publicIds);
});

app.post('/api/upload/:domain/:subdomain/:subject', async (req, res, next) => {
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
    console.log(error);
    res.status(500).json({ msg: 'error', data: error });
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

// Fetch all subjects from cloudinary and 
// 1. if there are domains missing, then add them to the Domain Collection with a randomly generated id
// 2. if there are subdomains missing, then add them to the Subdomain Collection with a randomly generated id
// 3. if there are subjects missing, then add them to the Subject Collection with a randomly generated id
// 4. if there are extra domains, then delete them from the Domain Collection
// 5. if there are extra subdomains, then delete them from the Subdomain Collection
// 6. if there are extra subjects, then delete them from the Subject Collection


// const DomainSchema = new mongoose.Schema({
//   name: {
//       type: String,
//       required: true
//   },
// });


// const SubdomainSchema = new mongoose.Schema({
//   name: {
//       type: String,
//       required: true
//   },
//   domain: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Domain"
//   }
// });

// const SubjectSchema = new mongoose.Schema({
//   name: {
//       type: String,
//       required: true
//   },
//   subdomain: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subdomain"
//   },
//   domain: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Domain"
//   },
//   pdfUrl: {
//       type: String
//   },
//   usersPurchased: [
//       {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User"
//       }
//   ],
// });
const { Domain, Subdomain, Subject } = require('./models/ProductsSchema');
console.log(Domain, Subdomain, Subject);

let finalDomains = [];
let finalSubdomains = [];
let finalSubjects = [];

const fetchAllDomainsFromCloudinaryAndAddToDatabase = async () => {
  try {
    const domains = await cloudinary.api.sub_folders("noteups");
    const domainsInDatabase = await Domain.find({});

    // Check if there are domains missing in the database
    const domainsMissingInDatabase = domains.folders.filter(domain => {
      finalDomains.push(domain.name);
      return !domainsInDatabase.find(dbDomain => dbDomain.name === domain.name);
    });

    // Add domains missing in the database
    if (domainsMissingInDatabase.length > 0) {
      const domainsToAdd = domainsMissingInDatabase.map(domain => {
        return {
          _id: new mongoose.Types.ObjectId(),
          name: domain.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await Domain.insertMany(domainsToAdd);
    }

    // Check if there are extra domains in the database
    const extraDomainsInDatabase = domainsInDatabase.filter(dbDomain => {
      return !domains.folders.find(domain => domain.name === dbDomain.name);
    });

    // Delete extra domains in the database
    if (extraDomainsInDatabase.length > 0) {
      await Domain.deleteMany({ _id: { $in: extraDomainsInDatabase.map(domain => domain._id) } });
    }

    console.log("finalDomains", finalDomains);
  } catch (error) {
    console.log(error);
  }
}

const fetchAllSubdomainsFromCloudinaryAndAddToDatabase = async () => {
  try {
    const domains = await cloudinary.api.sub_folders("noteups");
    const subdomains = {}
    await Promise.all(domains.folders.map(async domain => {
      subdomains[domain.name] = await cloudinary.api.sub_folders(`noteups/${domain.name}`).then(subdomains => subdomains.folders);
    }));
    console.log("subdomains", subdomains);
    const subdomainsInDatabase = await Subdomain.find({});

    // subdomains {
    //   arts: [
    //     { name: 'geography', path: 'noteups/arts/geography' },
    //     { name: 'history', path: 'noteups/arts/history' }
    //   ],
    //   engineering: [
    //     { name: 'aerospace', path: 'noteups/engineering/aerospace' },
    //     { name: 'chemical', path: 'noteups/engineering/chemical' },
    //     { name: 'civil', path: 'noteups/engineering/civil' },
    //     {
    //       name: 'computer-science-and-IT',
    //       path: 'noteups/engineering/computer-science-and-IT'
    //     },
    //     {
    //       name: 'electrical-and-electronics',
    //       path: 'noteups/engineering/electrical-and-electronics'
    //     },
    //     { name: 'mechanical', path: 'noteups/engineering/mechanical' }
    //   ],
    //   commerce: [
    //     {
    //       name: 'profit-and-loss',
    //       path: 'noteups/commerce/profit-and-loss'
    //     }
    //   ]
    // }


    // Check if there are subdomains missing in the database
    const subdomainsMissingInDatabase = Object.keys(subdomains).map(domain => {
      return subdomains[domain].filter(subdomain => {
        finalSubdomains.push(subdomain.name);
        return subdomainsInDatabase.find(dbSubdomain => dbSubdomain.name === subdomain.name);
      });
    });
    console.log("subdomainsMissingInDatabase", subdomainsMissingInDatabase);

    // subdomainsMissingInDatabase [
    //   [
    //     { name: 'geography', path: 'noteups/arts/geography' },
    //     { name: 'history', path: 'noteups/arts/history' }
    //   ],
    //   [],
    //   [
    //     {
    //       name: 'profit-and-loss',
    //       path: 'noteups/commerce/profit-and-loss'
    //     }
    //   ]
    // ]
    // subdo

    // Add subdomains missing in the database
    if (subdomainsMissingInDatabase.length > 0) {
      const subdomainsToAdd = subdomainsMissingInDatabase.map(subdomains => {
        return subdomains.map(subdomain => {
          return {
            _id: new mongoose.Types.ObjectId(),
            name: subdomain.name,
            domain: finalDomains.find(domain => domain === subdomain.path.split('/')[1]),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      });
      console.log("subdomainsToAdd", subdomainsToAdd);
      await Subdomain.insertMany([].concat(...subdomainsToAdd));
    }

    // Check if there are extra subdomains in the database
    const extraSubdomainsInDatabase = subdomainsInDatabase.filter(dbSubdomain => {
      return !subdomains.find(subdomain => subdomain.name === dbSubdomain.name);
    });
    console.log("extraSubdomainsInDatabase", extraSubdomainsInDatabase);

    // Delete extra subdomains in the database
    if (extraSubdomainsInDatabase.length > 0) {
      await Subdomain.deleteMany({ _id: { $in: extraSubdomainsInDatabase.map(subdomain => subdomain._id) } });
    }
    console.log("extraSubdomainsInDatabase", extraSubdomainsInDatabase);

    console.log("finalSubdomains", finalSubdomains);
  } catch (error) {
    console.log(error);
  }
}

const fetchAllSubjectsFromCloudinaryAndAddToDatabase = async (domain, subdomain) => {
  try {
    const subjects = await cloudinary.api.resources(`noteups/${domain}/${subdomain}`);
    const subjectsInDatabase = await Subject.find({ subdomain: subdomain });

    // Check if there are subjects missing in the database
    const subjectsMissingInDatabase = subjects.folders.filter(subject => {
      return !subjectsInDatabase.find(dbSubject => dbSubject.name === subject.public_id);
    });

    // Add subjects missing in the database
    if (subjectsMissingInDatabase.length > 0) {
      const subjectsToAdd = subjectsMissingInDatabase.map(subject => {
        return {
          _id: new mongoose.Types.ObjectId(),
          name: subject.public_id,
          subdomain: subdomain,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await Subject.insertMany(subjectsToAdd);
    }

    // Check if there are extra subjects in the database
    const extraSubjectsInDatabase = subjectsInDatabase.filter(subject => {
      return !subjects.folders.find(dbSubject => dbSubject.public_id === subject.name);
    });

    // Delete extra subjects in the database
    if (extraSubjectsInDatabase.length > 0) {
      await Subject.deleteMany({ name: { $in: extraSubjectsInDatabase.map(subject => subject.name) } });
    }

  } catch (error) {
    console.log(error);
  }
}

// call the functions
fetchAllDomainsFromCloudinaryAndAddToDatabase();
fetchAllSubdomainsFromCloudinaryAndAddToDatabase();
// fetchAllSubjectsFromCloudinaryAndAddToDatabase();