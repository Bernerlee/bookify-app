import express from "express";

import {
  createServiceController,
  getAllServicesController,
  getServiceByIdController,
} from "../controllers/serviceController.js";

const router = express.Router();

// Create a service
router.post("/", createServiceController);

// Get all services
router.get("/", getAllServicesController);

// Get a service by ID
router.get("/:id", getServiceByIdController);

export default router;
