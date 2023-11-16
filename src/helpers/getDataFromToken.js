import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req, res) => {
  try {

    if (!req.cookies.get("authToken")) {
      return null
    }

    const token = req.cookies.get("authToken")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
