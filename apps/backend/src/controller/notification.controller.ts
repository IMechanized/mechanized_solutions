import {
    createNotification,
    getNotification,
    updateNotification,
} from '../service/notification.service'
import { Request, Response } from 'express'

// create a notification catalog
export async function createNotificationHandler(req: Request, res: Response) {
    try {
        const notifications = await createNotification(req.body)
        res.status(201).json({
            message: 'Notification created successfully',
        })
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
        })
    }
}

// get notification
export async function getNotificationHandler(req: Request, res: Response) {
    const userId = res.locals.user._id as string
    try {
        const notifications = await getNotification(userId)

        return res.status(200).json({
            message: 'Successfully fetched notifications',
            data: notifications,
        })
    } catch (e: any) {
        return res.status(500).json({
            message: 'Server error',
            error: e.message,
        })
    }
}

// update notification status
export async function updateNotificationHandler(req: Request, res: Response) {
    const userId = res.locals.user._id as string
    const notificationId = req.params.notoficationId
    const notificationStatus = req.body.status

    try {
        const updatedNotification = await updateNotification(
            userId,
            notificationId,
            notificationStatus
        )
        return res.status(200).json({
            message: 'Notification status updated',
            data: updatedNotification,
        })
    } catch (e: any) {
        return res.status(500).json({
            message: 'Server error',
            error: e.message,
        })
    }
}
