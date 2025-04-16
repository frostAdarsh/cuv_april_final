import mongoose from "mongoose";

const AdminShema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,minlength: 6 },
    role:{ type: String, enum: ["Admin", "notAdmin"], default: "notAdmin" },
  },
  { timestamps: true }
);


const Admin = mongoose.model("Admin", AdminShema);

export default Admin;