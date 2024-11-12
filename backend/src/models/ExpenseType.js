const mongoose = require("mongoose");

const expenseType = new mongoose.Schema({
  type_id: {
    type: Number,
    required: true,
    unique: true,
  },
  expense_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expenditure",
    required: true,
  },
});

module.exports = mongoose.model("ExpenseType", expenseType);
