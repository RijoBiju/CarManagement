require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./middleware/passport");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/carRoutes");
const expenseTypeRoutes = require("./routes/expenseTypeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const isAuthenticated = require("./middleware/auth").isAuthenticated;

const errorHandler = require("./middleware/errorHandler");

console.log(
  "Running in: ",
  process.env.NODE_ENV ? process.env.NODE_ENV : "development"
);

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use("/api/auth", authRoutes);

app.use("/api", isAuthenticated, carRoutes);
app.use("/api", isAuthenticated, expenseTypeRoutes);
app.use("/api", isAuthenticated, expenseRoutes);
app.use("/api", isAuthenticated, dashboardRoutes);

app.get(
  "/admin/test",
  require("./middleware/auth").isAuthenticated,
  (req, res) => {
    res.json({ message: "Welcome to admin dashboard" });
  }
);

app.use(errorHandler);

module.exports = app;
