import { Request, Response, NextFunction } from 'express'
import { announcementSchema } from '../../schema/admin/announcement.schema'

export const validateAnnouncement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await announcementSchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}
