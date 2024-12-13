const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mochi5384:AALTBTPX_X@cluster0.rkfo3qm.mongodb.net/loginUsers?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Conexión a la base de datos exitosa");
  } catch (e) {
    console.log("Error al conectar la base de datos", e);
  }
};

module.exports = {conexionDB};
