import prisma from "../lib/prisma.js";

// Create an appointment
export const createAppointment = async (appointmentData) => {
  const appointment = await prisma.appointment.create({
    data: appointmentData,
    include: {
      customer: true,
      service: true,
      staff: true,
    },
  });

  return appointment;
};

// Get all appointments
export const getAllAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
      staff: true,
    },
    orderBy: {
      appointmentDate: "asc",
    },
  });

  return appointments;
};

// Get an appointment by ID
export const getAppointmentById = async (id) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      customer: true,
      service: true,
      staff: true,
    },
  });

  return appointment;
};

// Update an appointment
export const updateAppointment = async (id, appointmentData) => {
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!existingAppointment) {
    return null;
  }

  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: appointmentData,
    include: {
      customer: true,
      service: true,
      staff: true,
    },
  });

  return updatedAppointment;
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!existingAppointment) {
    return null;
  }

  const deletedAppointment = await prisma.appointment.delete({
    where: { id },
  });

  return deletedAppointment;
};
