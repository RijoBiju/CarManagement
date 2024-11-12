const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
  expense_id: {
    type: Number,
    required: true,
    unique: true,
  },
  expense_name: {
    type: String,
    required: true,
  },
  expense_type: {
    type: Number,
    required: true,
  },
  expense_amount: {
    type: Number,
    required: true,
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

module.exports = mongoose.model("Expenditure", expenditureSchema);
