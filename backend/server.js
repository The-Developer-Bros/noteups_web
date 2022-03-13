const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

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

// app.post('/upload', async (req, res, next) => {

//   try {

//     const { files } = req.body;
//     let promises = [];

//     files.forEach(file => {
//       promises.push(cloudinary.uploader.upload(file, {
//         folder: 'test',
//         use_filename: true,
//         unique_filename: false,
//         // transformation: [
//         //   { width: 500, height: 500, crop: 'limit' },
//         //   { quality: 'auto' }
//         // ]
//       }
//       ));
//     });

//     Promise.all(promises).then(results => {
//       res.send(results);
//     });

//   } catch (error) {
//     next(error);
//   }

// });

app.get('/api/download/:domain/:subject', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression(`folder:${req.params.domain}/${req.params.subject}`)
    .sort_by('created_at', 'desc')
    .max_results(10)
    .execute();

  const publicIds = resources.map(file => file.public_id);
  res.send(publicIds);
});

app.post('/api/upload/:domain/:subject', async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: `${req.params.domain}/${req.params.subject}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    console.log(uploadedResponse);
    res.json({ msg: 'success', data: uploadedResponse });

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