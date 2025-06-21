import  { Request, Response } from "express";           
import { matchedData } from "express-validator";
import { authService } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ...data } = matchedData(req);
        const { email, password } = data;
        await authService.registerUser(email, password);

        res.status(201).json({
            status: 201,
            message: "User created successfully",
        });
    } catch (error: any) {
        res.status(error.httpStatusCode || 500).json({
            status: error.httpStatusCode || 500,
            message: error.message || "Error creating User",
            data: null
        });
    }
};


export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ...data } = matchedData(req);
        const { email, password } = data;
        const user = await authService.loginUser(email, password);

        res.status(200).json({
            status: 200,
            message: "Login successful",
            data: user
        });
    } catch (error: any) {
        res.status(error.httpStatusCode || 500).json({
            status: error.httpStatusCode || 500,
            message: error.message || "Error During Login",
            data: null
        });
    }
};
