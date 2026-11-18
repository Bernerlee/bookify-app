import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../services/staffService.js";

// Create a staff member
export const createStaffController = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Staff name is required",
      });
    }

    if (email !== undefined && email !== null && typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email must be a valid string",
      });
    }

    const staff = await createStaff({
      name: name.trim(),
      email: email?.trim() || null,
    });

    return res.status(201).json({
      success: true,
      message: "Staff member created successfully",
      staff,
    });
  } catch (error) {
    next(error);
  }
};

// Get all staff members
export const getAllStaffController = async (req, res, next) => {
  try {
    const staff = await getAllStaff();

    return res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    next(error);
  }
};

// Get a staff member by ID
export const getStaffByIdController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID",
      });
    }

    const staff = await getStaffById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    next(error);
  }
};

// Update a staff member
export const updateStaffController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID",
      });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Staff name is required",
      });
    }

    if (email !== undefined && email !== null && typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email must be a valid string",
      });
    }

    const staff = await updateStaff(id, {
      name: name.trim(),
      email: email?.trim() || null,
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff member updated successfully",
      staff,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a staff member
export const deleteStaffController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID",
      });
    }

    const staff = await deleteStaff(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff member deleted successfully",
      staff,
    });
  } catch (error) {
    // A staff member may still be referenced by appointments
    if (error.code === "P2003") {
      return res.status(409).json({
        success: false,
        message:
          "Cannot delete this staff member because appointments are linked to them",
      });
    }

    next(error);
  }
};
