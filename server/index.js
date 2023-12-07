// app.js
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');  // Importa el módulo 'path' para trabajar con rutas de archivos
const multer = require('multer');
const db = require("./models");
const petController = require('../server/controllers/petController');
const { verifyToken } = require('./middlewares/authMiddleware')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '../server/uploads'); // Carpeta donde se almacenarán las imágenes
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    console.log('Uploading file:', file.originalname);
    cb(null, `${Date.now()}_${file.originalname}`); // Nombre único para evitar colisiones
  },
});

const upload = multer({ storage });

app.post('/fotos', upload.array('petPhotos', 5), verifyToken, petController.createPetWithPhotos, (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

// Esto le dice al servidor que sirva los archivos estáticos desde la carpeta 'uploads'
// app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const sedeRouter = require("./routes/sedeRoutes");
app.use("/sede", sedeRouter);

const userRouter = require("./routes/authRoutes");
app.use("/user", userRouter);

const petRouter = require("./routes/petRoutes"); 
app.use("/pet", petRouter);

const verificationFormRouter = require("./routes/verificationFormRoutes"); 
app.use("/verification", verificationFormRouter);



db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});




// const express = require("express");
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');  // Importa el módulo 'path' para trabajar con rutas de archivos
// const db = require("./models");
// const petController = require('../server/controllers/petController');
// const { verifyToken } = require('./middlewares/authMiddleware');

// app.use(cors());
// app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Utiliza la ruta absoluta para la carpeta de destino
//     cb(null, path.join(__dirname, '../server/uploads').replace(/\\/g, '/'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// app.post('/fotos', upload.array('petPhotos', 5), verifyToken, petController.createPetWithPhotos, (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

// const userRouter = require("./routes/authRoutes");
// app.use("/user", userRouter);

// const petRouter = require("./routes/petRoutes");
// app.use("/pet", petRouter);

// // Ruta para servir archivos estáticos (imágenes)
// app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// db.sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log("Server running on port 3000");
//   });
// });
