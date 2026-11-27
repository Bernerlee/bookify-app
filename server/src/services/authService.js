import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/password.js";

export const registerUser = async ({ name, email, password }) => {
  // Normalize the email before checking the database
  const normalizedEmail = email.trim().toLowerCase();

  // Check whether the email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email: normalizedEmail,
    },
    select: {
      id: true,
    },
  });

  // Hash the user's password
  const passwordHash = await hashPassword(password);

  // Create the User and Customer profile together
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,

      customer: existingCustomer
        ? {
            connect: {
              id: existingCustomer.id,
            },
          }
        : {
            create: {
              name: name.trim(),
              email: normalizedEmail,
            },
          },
    },

    // Return only safe information
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return user;
};
