// multerConfig.js
const multer = require('multer');
const path = require('path');

const generalStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    console.log('Uploading file:', file.originalname);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const contributionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'contribution_uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const petStatusImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'pet_status_images_uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Agrega otra carpeta para las imágenes de la colecta
const collectImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'collect_images_uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: generalStorage });
const contributionUpload = multer({ storage: contributionStorage });
const petStatusImageUpload = multer({ storage: petStatusImageStorage });
//   middleware de multer para las imágenes de la colecta
const collectImageUpload = multer({ storage: collectImageStorage });

module.exports = {
  upload,
  contributionUpload,
  petStatusImageUpload,
  collectImageUpload,
};
