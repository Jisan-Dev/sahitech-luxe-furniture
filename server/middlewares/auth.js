import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
dotenv.config();

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.Authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive)
      return res.status(401).json({ success: false, message: "Not Authorized!" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Not Authorized!" });
  }
};
