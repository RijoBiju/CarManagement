const express = require("express");
const router = express.Router();
const expenseTypeController = require("../controllers/expenseTypeController");

router.post("/expense-type", expenseTypeController.addExpenseType);
router.get("/expense-type", expenseTypeController.getAllExpenseTypes);

module.exports = router;
