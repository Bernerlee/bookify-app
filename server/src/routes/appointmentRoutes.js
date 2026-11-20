import express from "express";

import {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create an appointment
router.post("/", createAppointmentController);

// Get all appointments
router.get("/", getAllAppointmentsController);

// Get an appointment by ID
router.get("/:id", getAppointmentByIdController);

// Update an appointment
router.put("/:id", updateAppointmentController);

// Delete an appointment
router.delete("/:id", deleteAppointmentController);

export default router;
