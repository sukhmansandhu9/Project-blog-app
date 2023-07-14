const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// Create User resgister user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // Existing User
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: "false",
        message: "User is already available here",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Save User
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(`${error}`.bgCyan.white);
    return res.status(500).send({
      message: "Error in register Callback",
      success: false,
      error,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All user Data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all users",
      error,
    });
  }
};

// login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        password: "Invalid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(`${error}`.bgCyan.white);
    res.status(500).send({
      message: "Error in login callBack",
      success: false,
      error,
    });
  }
};
