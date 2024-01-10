import { Request, Response } from 'express'
import { createMessageRoom, findMessageRoom, getMessageRoom, updateMessageRoom } from '../service/message.service'

export async function createMessageRoomHandler(req: Request, res: Response) {
    try {
        const messageRoom = await createMessageRoom(req.body)

        return res.status(200).send({
            message: 'Message Sent Successfully',
        })
    } catch (e: any) {
        return res.status(400).send({
            message: 'Message Room Creation Failed',
            error: e.message,
        })
    }
}

// get user all message rooms
export async function findMessageRoomHandler(req: Request, res: Response) {
    const userId = res.locals.user._id

    try {
        const message = await findMessageRoom(userId)

        const totalMessage = message.length as number
        // if no message show not found
        if (totalMessage === 0) {
            return res.status(200).send({
                message: 'No Message Found',
                data: [],
            })
        }

        return res.status(200).send({
            message: 'Fetched message rooms',
            data: message,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Failed to fetch message rooms',
            error: e.message,
        })
    }
}

// get a message room by id
export async function getMessageRoomHandler(req: Request, res: Response) {
    const roomId = req.params.roomId
    try {
        const message = await getMessageRoom(roomId)
        if (!message) {
            return res.status(200).send({
                message: 'No Message Found',
                data: [],
            })
        }
        return res.status(200).send({
            message: 'Fetched message room',
            data: message,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Failed to fetch message rooms',
            error: e.message,
        })
    }
}

// update message by room _id
export async function updateMessageHandler(req: Request, res: Response) {
    const roomId = req.params.roomId
    try {
        const message = await updateMessageRoom(roomId, req.body)

        if (!message) {
            return res.status(200).send({
                message: 'No Message Found',
            })
        }
        return res.status(200).send({
            message: 'Message Sent Successfully',
            data: message,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Failed to update message',
            error: e.message,
        })
    }
}
