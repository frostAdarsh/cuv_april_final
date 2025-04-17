import ProductUser from "../models/productuser.model.js";

export const productUserCreate = async (req, res) => {
    const { fullName, phone, email } = req.body;

    try {
        if (!fullName || !phone || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        let existingUser = await ProductUser.findOne({ email, phone,fullName });

        if (existingUser) {
            return res.status(200).json({
                message: "Login successful",
                user: existingUser
            });
        }

       
        const newUser = await ProductUser.create({ fullName, phone, email });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Error in productUserCreate controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
