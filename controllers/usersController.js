const User = require('../models/usersModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



export const Login =  async (req, res) => {
        const { username, password } = req.body;
      try{
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: newPassword };
        user.push(newUser);
      
        res.json({ mensaje: "User registrado correctamente" });
      }
      catch(e){
        res.status(500).json({mjs:"Error desde el método Login"})
      }
    }

export const Register = async (req, res) => {
    const { username, password } = req.body;
    const users = User.find((users) => users.username == username);
    if (!users || !(await bcrypt.compare(password, users.password))) {
      returnres.status(401).json({ msj: "Credenciales incorrectas" });
    }
  
    const token = jwt.sign({ username: users.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  }

export const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers["autorización"];
    const token = authHeader && authHeader.split('')[1];
  
    if(!token) return res.status(401).json({mjs:"Token requerido"});
  
    jwt.verify(token, SECRET_KEY, (err, user)=>{
      if(err) return res.status(403).json({mjs:"Token invalido"});
      req.user = user;
       next();
    });
  };
