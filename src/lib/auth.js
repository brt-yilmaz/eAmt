import { jwtVerify, SignJWT } from "jose";


export const getJwtSecretKey = () => {
  if (!process.env.JWT_SECRET_KEY || process.env.JWT_SECRET_KEY.length === 0) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return new TextEncoder().encode(process.env.JWT_SECRET_KEY);
};
export const verifyAuth = async (authToken) => {
  try {
    const verified = await jwtVerify(authToken, getJwtSecretKey());
    return verified.payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const createToken = async (payload) => {
  const authToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // change it according to remember me
    .sign(getJwtSecretKey());

  return authToken;

}