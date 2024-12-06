const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    mongoose.conncet(DATABASE,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
      }
    );
    console.log("Coneixión a la base de datos exitosa");
  } catch (e) {
    console.log("Erroso al conectar la base de datos");
  }
};

module.exports = conexionDB();
