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
  lot_number: {
    type: String,
  },
  vin: {
    type: String,
  },
  title_code: {
    type: String,
  },
  odometer: {
    type: Number,
  },
  primary_damage: {
    type: String,
  },
  secondary_damage: {
    type: String,
  },
  estimated_retail_value: {
    type: Number,
  },
  cylinders: {
    type: Number,
  },
  color: {
    type: String,
  },
  engine_type: {
    type: String,
  },
  transmission: {
    type: String,
  },
  drive: {
    type: String,
  },
  vehicle_type: {
    type: String,
  },
  fuel: {
    type: String,
  },
  keys: {
    type: Boolean,
  },
  highlights: {
    type: String,
  },
  images: [
    {
      url: String,
      tag: String,
      fileName: String,
    },
  ],
});

module.exports = mongoose.model("Car", carSchema);
