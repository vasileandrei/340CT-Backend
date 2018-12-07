/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const express = require('express');
const myCors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const chai = require('chai');
const chaiHttp = require('chai-http');
const bodyParser = require('body-parser');
const authCheck = require('./middlewares/tokenMiddleware').AuthToken;
const responseUtil = require('./serviceModels/ResponseUtil');
const constants = require('./globalConstants');
const expires = require('expires');

const port = 8085;

// Cloudinary configuration settings
cloudinary.config({
  cloud_name: 'dpjue1flf',
  api_key: '343849393888324',
  api_secret: 'jWZvaE1uYvNpwTWT2AZSCYi-_As',
});

const app = express();
app.use(myCors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

chai.use(chaiHttp);

// Cloudinary settings -- accept only jpg and png
//                     -- store as <data>-<name>.<extension>
//                     -- size limit at <constants.fileSizeLimit>
const storage = cloudinaryStorage({
  cloudinary,
  folder: '340CT',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(undefined, `${Date.now()}-${file.originalname}`);
  },
  limists: constants.fileSizeLimit,
});
const parser = multer({ storage });

// localhost:8085/api/v1/files/upload/:username/:email -- Receive file upload requests
// Midleware - Check authentification
//           - Save image in Cloudinary, use <image> as working name
app.post('/api/v1/files/upload/:username/:email', authCheck, parser.single('image'), (req, res) => {
  // Construct working request
  req.body.username = req.params.username;
  req.body.email = req.params.email;
  req.body.url = req.file.secure_url;
  // Set expiration date for file <constants.fileExpire>
  req.body.expires = expires.after(constants.fileExpire);
  const uri = 'http://localhost:8080/GatewayApi/files/addDoc';
  let formatedResponse = '';
  chai.request('http://localhost:8080')
    .post('/GatewayApi/files/addDoc')
    .send(
      req.body,
      { headers: req.headers },
    )
    .then((responseFromMicro) => {
      // Construct succesful reponse
      formatedResponse = responseUtil.CreateDataReponse(true, '', uri, responseFromMicro);
      constants.fileLog.info('File successfully uploaded');
      res.send(formatedResponse);
    })
    .catch((err) => {
      // Construct failed reponse
      formatedResponse = responseUtil.CreateBaseReponse(false, err, uri);
      constants.fileLog.error('File failed to be uploaded');
      res.send(formatedResponse);
    });
});

app.listen(port, () => console.log(`Server started on ${port}`));
