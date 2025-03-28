const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// Allow only your frontend URL
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Function to retry database connection
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully");
      app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
      return;
    } catch (err) {
      console.error(`DB Connection Error (Attempt ${i + 1}):`, err);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("Failed to connect to the database after multiple attempts.");
        process.exit(1);
      }
    }
  }
};

// Start the server with retry logic
connectWithRetry();
