const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();
const port = 3009;

const routes = require("./routes/usersRoute");
const {conexionDB} = require('./config/db.js')

app.use(cors());


app.use(express.json());
app.use("/api/auth", routes);



conexionDB();

/* const autenticadorToken = (Req, res, next)=>{
    
} */
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
