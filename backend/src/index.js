import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import productuserRoutes from"./routes/productuser.route.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/productuser",productuserRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port:"+PORT);
  connectDB();
});
