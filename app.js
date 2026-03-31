require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const connectDB = require("./src/db/database");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const corsOptions = require("./src/config/crosOptions");
const { globalLimiter, authLimiter } = require("./src/middleware/rateLimiter");

const app = express();

// Security MiddleWare - ORDER MATTERS
app.use(helmet());
app.use(cors(corsOptions));
app.use(globalLimiter);
app.use(express.json());
app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  next();
});
app.use(hpp());

// Database
connectDB();

// Route
const authRoute = require("./src/routes/authRoutes");
const userRoute = require("./src/routes/userRoutes");
const bookRoute = require("./src/routes/bookRoutes");
const borrowRoute = require("./src/routes/borrowRoutes");

app.use("/auth", authLimiter, authRoute);
app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use("/borrows", borrowRoute);

// ERROR HANDLER
app.use(errorMiddleware);

module.exports = app;
