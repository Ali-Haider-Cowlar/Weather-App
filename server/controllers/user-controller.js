/* eslint-disable no-undef */

const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userService.getUserByEmail(email);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.addUser = async (req, res) => {
  const { name, email, cnic, password } = req.body;

  try {
    const user = await userService.addUser(name, email, cnic, password);
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, cnic, password } = req.body;
  try {
    const user = await userService.updateUser(id, name, email, cnic, password);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userService.deleteUser(id);
    return res.status(200).json({ message: "User Successfully Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res.status(200).json({ message: "Login successful", token }); // add token to the response object
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token cookie
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
