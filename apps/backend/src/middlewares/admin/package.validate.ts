import { Request, Response, NextFunction } from 'express'
import { packageSchema } from '../../schema/admin/package.schema'

const validatePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validateResult = await packageSchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}

export default validatePackage
