const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomBytes = require("random-bytes");

const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

const checkPassword = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword);

const generateAuthToken = (
  userId: number,
  email: string,
  tokenSecret: string,
  tokenExpiry: string,
) => {
  const authToken = randomBytes(32)
    .toString("hex");
  const tokenData = {
    userId,
    email,
    authToken,
  };
  const signedToken = jwt.sign(tokenData, tokenSecret, {
    expiresIn: tokenExpiry,
  });

  return {
    token: signedToken,
    expiry: tokenExpiry,
  };
};

const decodeAuthToken = (token: string, tokenSecret: string) =>
  jwt.verify(token, tokenSecret);

export {
  hashPassword,
  checkPassword,
  generateAuthToken,
  decodeAuthToken,
};
