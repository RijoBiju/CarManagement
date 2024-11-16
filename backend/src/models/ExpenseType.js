const mongoose = require("mongoose");

const expenseTypeSchema = new mongoose.Schema({
  type_id: {
    type: Number,
    required: true,
    unique: true,
  },
  expense_type: {
    type: String,
    required: true,
  },
  color_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ExpenseType", expenseTypeSchema);
