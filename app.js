const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = 3009;
const SECRET_KEY = "AALTBTPX_x";

const user = [];
app.use(express.json());


/* const autenticadorToken = (Req, res, next)=>{
    
} */
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
