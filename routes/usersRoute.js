const express = require('express');
const router = express.Router();
const userRoutesController =  require('../controllers/usersController')


app.post("/registro", userRoutesController.Register);
app.post("/login", userRoutesController.Login);
app.get("/autenticacion", userRoutesController.authenticateToken)




module.exports = router