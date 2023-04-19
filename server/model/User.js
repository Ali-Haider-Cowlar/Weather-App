const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (password) {
  console.log(password, this.password)
 
  let status = await bcrypt.compare(password, this.password);
  console.log(status);


  return status;
};

module.exports = mongoose.model("User", userSchema);

