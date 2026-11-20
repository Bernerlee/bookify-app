import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService.js";

const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

// Validate a positive integer ID
const isValidId = (id) => {
  return Number.isInteger(id) && id > 0;
};

// Validate appointment date
const isValidDate = (date) => {
  return date && !Number.isNaN(new Date(date).getTime());
};

// Create an appointment
export const createAppointmentController = async (req, res, next) => {
  try {
    const { customerId, serviceId, staffId, appointmentDate, status } =
      req.body;

    // Validate required fields
    if (
      customerId === undefined ||
      serviceId === undefined ||
      !appointmentDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, and appointment date are required",
      });
    }

    const parsedCustomerId = Number(customerId);
    const parsedServiceId = Number(serviceId);
    const parsedStaffId =
      staffId === undefined || staffId === null || staffId === ""
        ? null
        : Number(staffId);

    if (
      !isValidId(parsedCustomerId) ||
      !isValidId(parsedServiceId) ||
      (parsedStaffId !== null && !isValidId(parsedStaffId))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer, service, or staff ID",
      });
    }

    if (!isValidDate(appointmentDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment date",
      });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await createAppointment({
      customerId: parsedCustomerId,
      serviceId: parsedServiceId,
      staffId: parsedStaffId,
      appointmentDate: new Date(appointmentDate),
      ...(status ? { status } : {}),
    });

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Get all appointments
export const getAllAppointmentsController = async (req, res, next) => {
  try {
    const appointments = await getAllAppointments();

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Get an appointment by ID
export const getAppointmentByIdController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Update an appointment
export const updateAppointmentController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const { customerId, serviceId, staffId, appointmentDate, status } =
      req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    if (
      customerId === undefined ||
      serviceId === undefined ||
      !appointmentDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, and appointment date are required",
      });
    }

    const parsedCustomerId = Number(customerId);
    const parsedServiceId = Number(serviceId);
    const parsedStaffId =
      staffId === undefined || staffId === null || staffId === ""
        ? null
        : Number(staffId);

    if (
      !isValidId(parsedCustomerId) ||
      !isValidId(parsedServiceId) ||
      (parsedStaffId !== null && !isValidId(parsedStaffId))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer, service, or staff ID",
      });
    }

    if (!isValidDate(appointmentDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment date",
      });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await updateAppointment(id, {
      customerId: parsedCustomerId,
      serviceId: parsedServiceId,
      staffId: parsedStaffId,
      appointmentDate: new Date(appointmentDate),
      ...(status ? { status } : {}),
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an appointment
export const deleteAppointmentController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    const appointment = await deleteAppointment(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};
