const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username y password son requeridos" });
  }; 
  try {
    const existeUser = await User.findOne({ username });
    if (existeUser) {
      return res.status(400).json({ error: "El username ya está registrado" });
    };
    const newPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: newPassword });
    res.json({ mensaje: "User registrado correctamente" });
  } catch (e) {
    console.log(e.message, "Error");
    if (e.code === 11000) {
      res.status(400).json({ error: "El nombre de usuario ya existe" });
    }else{
      res.status(500).json({ mjs: "Error desde el método Register" });
    }
    
  }
};

const Login = async (req, res) => {
  try{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msj: "Faltan credenciales" });
    }

    const user = await User.findOne({username});
    if (!user || !user.password||!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msj: "Credenciales incorrectas",user, password });
    }
    const SECRET_KEY=process.env.SECRET_KEY
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token)
    res.json({ token });
  }catch(e){
    console.log(e)
    return res.status(500).json({mjs:"Error desde el método Login"})
  }

};
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["autorización"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) return res.status(401).json({ mjs: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ mjs: "Token invalido" });
    req.user = user;
    next();
  });
};

const DeleteUser =async (req, res) =>{
  try{
    const {id} = req.params;
    const user = await User.findById(id)
    
    if(!user){
      return res.status(404).json({msj:"Usuario no existe"})
    }
    await User.deleteOne({_id: id});
    res.json({mjs:"Usuario eliminado correctamente"})
    console.log("Usuario eliminado")
  
  }catch(e){
    console.log(e)
    res.status(500).json({mjs:"Error en el metodo Delete"})
  }
  
}
const Updated = async(req, res)=>{
  try{
    const {id} = req.params;
    const {username,password}=req.body;
    const user = await User.findById(id)
    if(!user){
      return res.status(404).json({msj:"Usuario no existe"})
    }
    if(!username||!password){
      console.log("Se requieren llenar ambos campos")
    }
    const newPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findByIdAndUpdate(
      id,
      {username, password: newPassword},
      {new: true, runValidators: true}
    );
    res.json({msj:"User actualizado",
      data:updateUser
    })
    console.log("User actualizado")
  }catch(e){
    res.status(500).json({msj:"Error desde el método Update"})
  }
}

const ListarUsers = async (req, res)=>{
  try{
    const consulta= await User.find();
    res.json(consulta);
  }catch(e){
    console.log(e)
    res.status(500).json({mjs:"Error desde el método LsitarUsers"})
  }
}
module.exports = { Login, Register, authenticateToken, DeleteUser,Updated, ListarUsers };
