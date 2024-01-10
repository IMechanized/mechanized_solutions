import mongoose from 'mongoose'
import { AdsDocument } from './ads.model'
import { UserDocument } from './user.model'

export interface ReviewDocument extends mongoose.Document {
    user: UserDocument['_id']
    status: {
        isApproved: boolean
    }
    ratingNumber: number
    review: string
    sellerId: AdsDocument['_id']
}

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        isApproved: {
            type: Boolean,
            default: true,
        },
    },
    ratingNumber: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const ReviewModel = mongoose.model<ReviewDocument>(
    'Review',
    reviewSchema
)

export default ReviewModel
