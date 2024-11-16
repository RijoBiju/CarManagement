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
  car_plate: {
    type: String,
    required: true,
  },
  year_of_manufacture: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  minimum_selling_price: {
    type: Number,
  },
  customer_delivery_fee: {
    type: Number,
  },
  present_market_value: {
    type: Number,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Car", carSchema);
