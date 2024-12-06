const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username y password son requeridos" });
  }
  
  try {
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: newPassword });
    res.json({ mensaje: "User registrado correctamente" });
  } catch (e) {
    console.log(e.message, "Error");
    res.status(500).json({ mjs: "Error desde el método Register" });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  const users = User.find((users) => users.username == username);
  if (!users || !(await bcrypt.compare(password, users.password))) {
    returnres.status(401).json({ msj: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ username: users.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
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

module.exports = { Login, Register, authenticateToken };
