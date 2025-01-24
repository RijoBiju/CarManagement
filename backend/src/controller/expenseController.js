const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { carId, name, type, date, amount } = req.body;

    const expense = new Expense({ carId, name, type, date, amount });
    await expense.save();

    res
      .status(201)
      .json({ message: "Expense created successfully", data: expense });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create expense", details: error.message });
  }
};

exports.getExpensesByCarId = async (req, res) => {
  try {
    const { carId } = req.params;

    const expenses = await Expense.find({ carId });

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for the specified car ID" });
    }

    res.status(200).json({ data: expenses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses", details: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json({ data: expenses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses", details: error.message });
  }
};
