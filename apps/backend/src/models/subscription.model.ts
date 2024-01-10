import mongoose from 'mongoose'

export interface SubscriptionDocument extends mongoose.Document {
    subscriptionEmail: string
}

const subscriptionSchema = new mongoose.Schema({
    subscriptionEmail: {
        type: String,
        required: true,
        unique: true,
    },
})

const SubscriptionModel = mongoose.model<SubscriptionDocument>(
    'Sotification',
    subscriptionSchema
)

export default SubscriptionModel
