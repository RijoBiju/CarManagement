const Car = require("../models/Car");
const Expense = require("../models/Expense");

exports.getStats = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments({ archived: false });
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalCars,
      totalExpenses: totalExpenses[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
