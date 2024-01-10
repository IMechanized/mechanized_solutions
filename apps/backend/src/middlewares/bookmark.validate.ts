import { Request, Response, NextFunction } from 'express'
import { bookmarkSchema } from '../schema/bookmark.schema'

export const validateBookmark = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await bookmarkSchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}
