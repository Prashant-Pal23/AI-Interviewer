import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};