require("dotenv").config(); // Load environment variables
require("colors"); // Pretty console logs
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const errorHandler = require("./middlewares/errorMiddleware");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

// Start database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON Requests
app.use(express.urlencoded({ extended: false })); // Form URL Encoded
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler); // Overrides the default express error handler

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
