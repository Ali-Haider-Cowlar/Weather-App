const User = require("../model/User");
const bcrypt = require('bcrypt');

module.exports.getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};

//----------------------------------------------------------------------------------------------

module.exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("No user found");
  }
  return user;
};

//----------------------------------------------------------------------------------------------

module.exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found with the provided email");
  }
  return user;
};

//----------------------------------------------------------------------------------------------

module.exports.addUser = async (name, email, cnic, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({ name, email, cnic, password: hashedPassword });
  await user.save();
  return user;
};

//----------------------------------------------------------------------------------------------

module.exports.updateUser = async (id, name, email, cnic, password) => {
  let user = await User.findById(id);
  if (!user) {
    throw new Error("Unable To Update By this ID");
  }
  user.name = name;
  user.email = email;
  user.cnic = cnic;
  user.password = password;
  user = await user.save();
  return user;
};

//----------------------------------------------------------------------------------------------

module.exports.deleteUser = async (id) => {
  const user = await User.findByIdAndRemove(id);
  if (!user) {
    throw new Error("Unable To Delete By this ID");
  }
};
