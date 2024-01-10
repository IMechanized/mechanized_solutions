import { Request, Response, NextFunction } from "express";
import { subscriptionSchema } from "../schema/subscription.schema";

export const subscriptionValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await subscriptionSchema.validateAsync(req.body);
        next();
    } catch (e: any) {
        res.status(400).send({
            message: "Invalid request",
            error: e.message,
        });
    }
};
