require("dotenv").config(); // Load environment variables
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require("./middlewares/errorMiddleware");

// Routes
const goalRoutes = require("./routes/goalRoutes");

// Middlewares
app.use(express.json()); // Parse JSON Requests
app.use(express.urlencoded({ extended: false })); // Form URL Encoded
app.use(errorHandler); // Overrides the default express error handler
app.use("/api/goals", goalRoutes);

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
