import prisma from "../lib/prisma.js";

// Create a new service
export const createService = async (serviceData) => {
  const service = await prisma.service.create({
    data: serviceData,
  });

  return service;
};

// Get all services
export const getAllServices = async () => {
  const services = await prisma.service.findMany();

  return services;
};

// Get a service by ID
export const getServiceById = async (id) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  return service;
};
