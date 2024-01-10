import { Request, Response } from 'express'
import { createAnnouncement, findAnnouncement } from '../../service/admin/announcement.service'

// create a filter handller
export async function createAnnouncementHandler(req: Request, res: Response) {
    try {
        const announcement = await createAnnouncement(req.body)
        return res.status(200).send({
            message: 'Announcement created successfully',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all filters handller
export async function findAnnouncementHandler(req: Request, res: Response) {
    try {
        const announcement = await findAnnouncement()
        if (!announcement) {
            return res.status(201).send({
                message: 'No announcement found',
            })
        }
        res.status(200).send({
            message: 'Successfully found Announcement',
            data: announcement,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}