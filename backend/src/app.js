require("dotenv").config();

const express = require("express");
const cors = require("cors");

const carRoutes = require("./routes/carRoutes");
const expenseTypeRoutes = require("./routes/expenseTypeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const errorHandler = require("./middleware/errorHandler");

console.log(
  "Running in: ",
  process.env.NODE_ENV ? process.env.NODE_ENV : "development"
);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", carRoutes);
app.use("/api", expenseTypeRoutes);
app.use("/api", expenseRoutes);

app.use(errorHandler);

module.exports = app;
