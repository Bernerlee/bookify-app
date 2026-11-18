import express from "express";

import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/customerController.js";

const router = express.Router();

// POST /api/customers
router.post("/", createCustomerController);

// GET /api/customers
router.get("/", getAllCustomersController);

// GET /api/customers/:id
router.get("/:id", getCustomerByIdController);

// PUT /api/customers/:id
router.put("/:id", updateCustomerController);

// DELETE /api/customers/:id
router.delete("/:id", deleteCustomerController);

export default router;
