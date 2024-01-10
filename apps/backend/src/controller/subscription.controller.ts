import { Request, Response } from 'express'
import { createSubscription, findSubscription } from '../service/subscription.service'

// create a subscription controller
export async function createSubscriptionHandler(req: Request, res: Response) {
    try {
        const announcement = await createSubscription(req.body)
        return res.status(200).send({
            message: 'You have subscribed successfully',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all subscription controller
export async function findSubscriptionHandler(req: Request, res: Response) {
    try {
        const subscriptions = await findSubscription()
        return res.status(200).send({
            message: 'Successfully find all subscriptions',
            data: subscriptions,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

