import mongoose from "mongoose";

const ProductUserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const ProductUser = mongoose.model("ProductUser", ProductUserSchema);
export default ProductUser;
