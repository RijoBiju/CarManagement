const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expenseController");

router.post("/expense", expenseController.createExpense);

router.get("/expense/:carId", expenseController.getExpensesByCarId);

router.get("/expense", expenseController.getAllExpenses);

module.exports = router;
