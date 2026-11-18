import prisma from "../lib/prisma.js";

// Create a new customer
export const createCustomer = async (customerData) => {
  const customer = await prisma.customer.create({
    data: customerData,
  });

  return customer;
};

// Retrieve all customer
export const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany();

  return customers;
};

// Retrieve one customer by ID
export const getCustomerById = async (id) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  return customer;
};

// Update an existing customer
export const updateCustomer = async (id, customerData) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!existingCustomer) {
    return null;
  }

  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data: customerData,
  });

  return updatedCustomer;
};

// Delete an existing customer
export const deleteCustomer = async (id) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!existingCustomer) {
    return null;
  }

  const deletedCustomer = await prisma.customer.delete({
    where: { id },
  });

  return deletedCustomer;
};
