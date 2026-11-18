import {
  createAppointmentService,
  getAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentService,
  deleteAppointmentService,
} from "../services/appointmentService.js";

//CREATE
export const createAppointment = (req, res, next) => {
  try {
    const { customerName, email, service } = req.body;

    if (!customerName || !email || !service) {
      return res.status(400).json({
        success: false,
        message: "All appointment fields are required",
      });
    }

    const appointment = createAppointmentService({
      customerName,
      email,
      service,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL
export const getAppointments = (req, res, next) => {
  try {
    const appointments = getAppointmentsService();

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE
export const getAppointmentById = (req, res, next) => {
  try {
    const { id } = req.params;

    const appointment = getAppointmentByIdService(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

//UPDATE
export const updateAppointment = (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedAppointment = updateAppointmentService(id, req.body);

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteAppointment = (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAppointment = deleteAppointmentService(id);

    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      appointment: deletedAppointment,
    });
  } catch (error) {
    next(error);
  }
};
