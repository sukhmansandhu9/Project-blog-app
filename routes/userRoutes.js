const express = require("express");
const {
  registerController,
  loginController,
  getAllUsers,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// Get all users || GET
router.get("/all-users", getAllUsers);

// Create User || POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

module.exports = router;
