const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
