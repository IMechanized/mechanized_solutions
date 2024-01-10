import { Request, Response, NextFunction } from 'express'
import { topLocationchema } from '../../schema/admin/topLocation.schema'

export const validateTopLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await topLocationchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}
