import express from "express";
import { productUserCreate } from "../controllers/productuser.controller.js";

const router = express.Router();
router.post("/usercreate", productUserCreate);

export default router;
