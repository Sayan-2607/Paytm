const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const { connectDB } = require("./db");  // Import DB function

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1", rootRouter);

// Connect to MongoDB
connectDB();

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
