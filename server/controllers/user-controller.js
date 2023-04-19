const userService = require("../services/user.service");

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

module.exports.addUser = async (req, res) => {
  const { name, email, cnic, password } = req.body;

  try {
    const user = await userService.addUser(name, email, cnic, password );
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
