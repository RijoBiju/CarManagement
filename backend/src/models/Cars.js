// models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_id: {
    type: Number,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  minimum_selling_price: {
    type: Number,
    required: true,
  },
  customer_delivery_fee: {
    type: Number,
    required: true,
  },
  present_market_value: {
    type: Number,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Car", carSchema);
