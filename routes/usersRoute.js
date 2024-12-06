const express = require("express");
const router = express.Router();
const {
  Login,
  Register,
  authenticateToken,
} = require("../controllers/usersController");

router.post("/registro", Register);
router.post("/login", Login);
router.get("/autenticacion", authenticateToken);

module.exports = router;
