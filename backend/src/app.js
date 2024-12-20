const express = require("express");
const carRoutes = require("./routes/carRoutes");
const expenseTypeRoutes = require("./routes/expenseTypeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api", carRoutes);
app.use("/api", expenseTypeRoutes);
app.use("/api", expenseRoutes);

app.use(errorHandler);

module.exports = app;
