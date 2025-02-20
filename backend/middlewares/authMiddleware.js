import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken; 
    console.log("Token received:", token); // Debugging

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token: User does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


