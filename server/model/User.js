const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);

// To-do List Schema
