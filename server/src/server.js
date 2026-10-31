import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

//Middleware
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Bookify API");
});

//Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Bookify API is running",
  });
});

//About route
app.get("/api/about", (req, res) => {
  res.json({
    name: "Bookify",
    description: "An appointement booking platform",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Bookify API running on port ${PORT}`);
});
