const express = require("express");
const router = express.Router();
const {
  Login,
  Register,
  authenticateToken,
  DeleteUser,
  Updated,
  ListarUsers
} = require("../controllers/usersController");

router.post("/registro", Register);
router.post("/login", Login);
router.get("/autenticacion", authenticateToken);
router.delete("/delete/:id", DeleteUser)
router.put("/updated/:id",Updated)
router.get("/listar", ListarUsers)

module.exports = router;
