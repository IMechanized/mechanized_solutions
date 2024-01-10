import { Request, Response, NextFunction } from "express";
import { filterSchema } from "../../schema/admin/filter.schema";

export const validateFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationResult = await filterSchema.validateAsync(req.body);
    next();
  } catch (e: any) {
    res.status(400).send({
      message: "Invalid request",
      error: e.message,
    });
  }
};
