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
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const admin = await Admin.findOne({
      $expr: {
        $eq: [{ $concat: ["$fname", " ", "$lname"] }, username],
      },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (admin.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    generateToken(admin._id, res);
    res.status(200).json({
      _id: admin._id,
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminupdate = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const userId = req.admin._id;

    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (fname) admin.fname = fname;
    if (lname) admin.lname = lname;

    if (email) {
      const emailExists = await Admin.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      admin.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.status(200).json({
      message: "User updated successfully",
      admin: {
        fullName: `${admin.fname} ${admin.lname}`,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("Error in adminupdate controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
