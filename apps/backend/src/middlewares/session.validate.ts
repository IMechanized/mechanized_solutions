import { Request, Response, NextFunction } from 'express';
import { sessionSchema } from '../schema/session.schema';

export const validateSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await sessionSchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}
