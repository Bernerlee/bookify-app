const appointments = [];

// CREATE
export const createAppointmentService = (appointmentData) => {
  const newAppointment = {
    id: Date.now(),
    ...appointmentData,
    status: "pending",
  };

  appointments.push(newAppointment);

  return newAppointment;
};

// READ ALL
export const getAppointmentsService = () => {
  return appointments;
};

// READ ONE
export const getAppointmentByIdService = (id) => {
  return appointments.find((appointment) => appointment.id === Number(id));
};

// UPDATE
export const updateAppointmentService = (id, updateData) => {
  const appointment = appointments.find(
    (appointment) => appointment.id === Number(id),
  );

  if (!appointment) {
    return null;
  }

  Object.assign(appointment, updateData);

  return appointment;
};

// DELETE
export const deleteAppointmentService = (id) => {
  const appointmentIndex = appointments.findIndex(
    (appointment) => appointment.id === Number(id),
  );

  if (appointmentIndex === -1) {
    return null;
  }

  const deleteAppointment = appointments.splice(appointmentIndex, 1);

  return deleteAppointment[0];
};
