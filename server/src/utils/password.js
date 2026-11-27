import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// Convert a plain-text password into a secure hash
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

// Check whether a password matches an existing hash
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};
