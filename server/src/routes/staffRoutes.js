import express from "express";

import {
  createStaffController,
  getAllStaffController,
  getStaffByIdController,
  updateStaffController,
  deleteStaffController,
} from "../controllers/staffController.js";

const router = express.Router();

// Create a staff member
router.post("/", createStaffController);

// Get all staff members
router.get("/", getAllStaffController);

// Get a staff member by ID
router.get("/:id", getStaffByIdController);

// Update a staff member
router.put("/:id", updateStaffController);

// Delete a staff member
router.delete("/:id", deleteStaffController);

export default router;
