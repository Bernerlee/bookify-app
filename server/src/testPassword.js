import { hashPassword, comparePassword } from "./utils/password.js";

const password = "BookifyTest123";

const hashedPassword = await hashPassword(password);

console.log("Original password:", password);
console.log("Hashed password:", hashedPassword);

const correctPassword = await comparePassword("BookifyTest123", hashedPassword);

const incorrectPassword = await comparePassword(
  "WrongPassword123",
  hashedPassword,
);

console.log("Correct password:", correctPassword);
console.log("Incorrect password:", incorrectPassword);
