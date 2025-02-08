require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

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

const limiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use("/api", carRoutes);
app.use("/api", expenseTypeRoutes);
app.use("/api", expenseRoutes);

app.use(errorHandler);

module.exports = app;
