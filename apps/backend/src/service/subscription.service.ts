import SubscriptionModel from "../models/subscription.model"

// create subscription service
export async function createSubscription(input: any) {
    try {
        const subscription = await SubscriptionModel.create(input)
        return subscription
    } catch (e) {
        throw e
    }
}

// find subscription service 
export async function findSubscription() {
    try {
        const subscription = await SubscriptionModel.find().lean(true) as any
        return subscription
    } catch (e) {
        throw e
    }
}