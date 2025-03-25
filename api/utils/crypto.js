import crypto from "crypto";

function generateToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

const token = generateToken(16);
console.log(token);
