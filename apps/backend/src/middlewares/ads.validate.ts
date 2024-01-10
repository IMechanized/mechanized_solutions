import { Request, Response, NextFunction } from "express";
import { adsSchema } from "../schema/ads.schema";

export const adsValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationResult = await adsSchema.validateAsync(req.body);
    next();
  } catch (e: any) {
    res.status(400).send({
      message: "Invalid request",
      error: e.message,
    });
  }
};
