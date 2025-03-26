const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

router.get("/dashboard/stats", dashboardController.getStats);

module.exports = router;
