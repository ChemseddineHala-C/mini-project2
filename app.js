const express = require("express");
const app = express();
const connectDB = require("./src/db/database");

app.use(express.json());
connectDB();



module.exports = app;
