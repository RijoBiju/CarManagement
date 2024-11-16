const ExpenseType = require("../models/ExpenseType");

exports.addExpenseType = async (req, res) => {
  const { expenseName, colorCode } = req.body;

  try {
    const newExpenseType = new ExpenseType({
      type_id: Date.now(),
      expense_type: expenseName,
      color_code: colorCode,
    });

    const savedExpenseType = await newExpenseType.save();
    res.status(201).json({ Status: 201, Data: savedExpenseType });
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to add expense type.",
        Details: error.message,
      });
  }
};

exports.getAllExpenseTypes = async (req, res) => {
  try {
    const expenseTypes = await ExpenseType.find();

    const formattedExpenseTypes = expenseTypes.map((type) => ({
      expenseName: type.expense_type,
      colorCode: type.color_code,
    }));

    res.status(200).json(formattedExpenseTypes);
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to retrieve expense types.",
        Details: error.message,
      });
  }
};
