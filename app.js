const express = require("express");
const app = express();
const connectDB = require("./src/db/database");

app.use(express.json());
connectDB();
const authRoute = require("./src/routes/authRoutes");
const userRoute = require("./src/routes/userRoutes");
const bookRoute = require("./src/routes/bookRoutes");
const borrowRoute = require("./src/routes/borrowRoutes");

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use("/borrows", borrowRoute);

module.exports = app;
