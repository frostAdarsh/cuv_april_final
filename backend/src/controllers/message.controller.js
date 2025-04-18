import ProductUser from "../models/productuser.model.js";

export const getUser = async (req, res) => {
    try {
        const users = await ProductUser.find({})

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}