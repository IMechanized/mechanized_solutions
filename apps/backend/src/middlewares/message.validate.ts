import { Request, Response, NextFunction } from 'express'
import { messageSchemaValidation } from '../schema/message.schema'

export const messageValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await messageSchemaValidation.validateAsync(
            req.body
        )
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}
