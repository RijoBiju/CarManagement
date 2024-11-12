const mongoose = require("mongoose");

const admins = new mongoose.Schema({
  admin_id: {
    type: Number,
    required: true,
    unique: true,
  },
  admin_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admins", admins);
