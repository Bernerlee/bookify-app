import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// READ ALL
router.get("/", getAppointments);

// READ ONE
router.get("/:id", getAppointmentById);

//UPDATE
router.put("/:id", updateAppointment);

// DELETE
router.delete("/:id", deleteAppointment);

export default router;
