import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    if (newAdmin) {
      generateToken(newAdmin._id, res);
      await newAdmin.save();

      res.status(201).json({
        _id: newAdmin._id,
        fname: newAdmin.fname,
        lname: newAdmin.lname,
        email: newAdmin.email,
        role: newAdmin.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  res.send("login");
};
export const logout = async (req, res) => {
  res.send("logout");
};
