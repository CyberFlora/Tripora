const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tripRoutes = require("./routes/tripRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Tripora backend is running!"
    });
});

// Trip routes
app.use("/api/trips", tripRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Tripora backend running on port ${PORT}`);
});