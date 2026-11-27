import prisma from "./lib/prisma.js";

import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bookify API",
  });
});

// Customer routes
app.use("/api/customers", customerRoutes);

// Service(haircut, shaving) routes
app.use("/api/services", serviceRoutes);

// Appointment routes
app.use("/api/appointments", appointmentRoutes);

// Staff routes
app.use("/api/staff", staffRoutes);

// Register route
app.use("/api/auth", authRoutes);

app.get("/api/db-check", async (req, res, next) => {
  try {
    const customerCount = await prisma.customer.count();

    res.status(200).json({
      success: true,
      message: "Database connected successfully!",
      customers: customerCount,
    });
  } catch (error) {
    next(error);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
