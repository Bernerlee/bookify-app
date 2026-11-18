import prisma from "../lib/prisma.js";

// Create a staff member
export const createStaff = async (staffData) => {
  const staff = await prisma.staff.create({
    data: staffData,
  });

  return staff;
};

// Get all staff members
export const getAllStaff = async () => {
  const staff = await prisma.staff.findMany();

  return staff;
};

// Get a staff member by ID
export const getStaffById = async (id) => {
  const staff = await prisma.staff.findUnique({
    where: { id },
  });

  return staff;
};

// Update a staff member
export const updateStaff = async (id, staffData) => {
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!existingStaff) {
    return null;
  }

  const updatedStaff = await prisma.staff.update({
    where: { id },
    data: staffData,
  });

  return updatedStaff;
};

// Delete a staff member
export const deleteStaff = async (id) => {
  const existingStaff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!existingStaff) {
    return null;
  }

  const deletedStaff = await prisma.staff.delete({
    where: { id },
  });

  return deletedStaff;
};
