const mongoose = require("mongoose");

const Images = new mongoose.Schema({
  image_id: {
    type: Number,
    required: true,
    unique: true,
  },
  image_type: {
    type: Text,
    required: true,
    unique: true,
  },
  image_link: {
    type: Text,
    required: true,
    unique: true,
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

module.exports = mongoose.model("Images", Images);
