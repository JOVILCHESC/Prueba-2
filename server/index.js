// // app.js
// const express = require("express");
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');  // Importa el módulo 'path' para trabajar con rutas de archivos
// const multer = require('multer');
// const db = require("./models");
// const petController = require('../server/controllers/petController');
// const { verifyToken } = require('./middlewares/authMiddleware')

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, '../server/uploads'); // Carpeta donde se almacenarán las imágenes
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     console.log('Uploading file:', file.originalname);
//     cb(null, `${Date.now()}_${file.originalname}`); // Nombre único para evitar colisiones
//   },
// });

// const upload = multer({ storage });
// //nuevo
// module.exports = {
//   upload,
// };

// //otra configruacion de multer:
// const contributionStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'contribution_uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const contributionUpload = multer({ storage: contributionStorage });

// module.exports = {
//   upload,
//   contributionUpload,
// };
// ////////////////////////////////////////////////



// //////////////////////////////////
// app.post('/fotos', upload.array('petPhotos', 5), verifyToken, petController.createPetWithPhotos, (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });
// //fotos actulizadas
// app.put('/fotos/:petId', upload.array('petPhotos', 5), verifyToken, petController.updateUserPet, (req, res) => {
//   console.log(req.body);
//   console.log(req.files);
// });




// // Esto le dice al servidor que sirva los archivos estáticos desde la carpeta 'uploads'
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// const sedeRouter = require("./routes/sedeRoutes");
// app.use("/sede", sedeRouter);

// const userRouter = require("./routes/authRoutes");
// app.use("/user", userRouter);

// const petRouter = require("./routes/petRoutes"); 
// app.use("/pet", petRouter);

// const verificationFormRouter = require("./routes/verificationFormRoutes"); 
// app.use("/verification", verificationFormRouter);

// const collectRouter = require("./routes/collectRouter"); 
// app.use("/collect", collectRouter);

// const appointmentFormRouter = require("./routes/appointmentFormRoutes"); 
// app.use('/appointment', appointmentFormRouter);

// const adoptedPetRouter = require("./routes/adoptedPetRoutes"); 
// app.use('/adoptedPet', adoptedPetRouter);

// const vaccineFormRouter = require("./routes/vaccineFormRoutes"); 
// app.use('/vaccineForm', vaccineFormRouter);

// const fundraisingRoutes = require('./routes/fundrainsingRoutes');
// app.use('/fundraising', fundraisingRoutes);

// db.sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log("Server running on port 3000");
//   });
// });




// app.js
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');  // Importa el módulo 'path' para trabajar con rutas de archivos
// const multer = require('multer');
const multerConfig = require('./multerConfig');
const db = require("./models");
const petController = require('../server/controllers/petController');
const { verifyToken } = require('./middlewares/authMiddleware')

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////

const upload = multerConfig.upload; // Usa el objeto de configuración de Multer desde multerConfig.js
const contributionUpload = multerConfig.contributionUpload; // Usa el objeto de configuración de Multer desde multerConfig.js


//////////////////////////////////
app.post('/fotos', upload.array('petPhotos', 5), verifyToken, petController.createPetWithPhotos, (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

// Fotos actualizadas
app.put('/fotos/:petId', upload.array('petPhotos', 5), verifyToken, petController.updateUserPet, (req, res) => {
  console.log(req.body);
  console.log(req.files);
});

// Esto le dice al servidor que sirva los archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/contribution_uploads', express.static(path.join(__dirname, 'contribution_uploads')));


// // Esto le dice al servidor que sirva los archivos estáticos desde la carpeta 'uploads'
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const sedeRouter = require("./routes/sedeRoutes");
app.use("/sede", sedeRouter);

const userRouter = require("./routes/authRoutes");
app.use("/user", userRouter);

const petRouter = require("./routes/petRoutes"); 
app.use("/pet", petRouter);

const verificationFormRouter = require("./routes/verificationFormRoutes"); 
app.use("/verification", verificationFormRouter);

const collectRouter = require("./routes/collectRouter"); 
app.use("/collect", collectRouter);

const appointmentFormRouter = require("./routes/appointmentFormRoutes"); 
app.use('/appointment', appointmentFormRouter);

const adoptedPetRouter = require("./routes/adoptedPetRoutes"); 
app.use('/adoptedPet', adoptedPetRouter);

const vaccineFormRouter = require("./routes/vaccineFormRoutes"); 
app.use('/vaccineForm', vaccineFormRouter);

const fundraisingRoutes = require('./routes/fundrainsingRoutes');
app.use('/fundraising', fundraisingRoutes);

const petStatusRoutes = require('./routes/petStatusRoutes');
app.use('/pet-status', petStatusRoutes);


db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});