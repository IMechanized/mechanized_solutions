import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface AdAlertDocument extends mongoose.Document {
    user: UserDocument['_id']
    name: string
    active: boolean
    keyword: string
    category: string
    location: string
    tags: [string]
    emailFrequency: string

}

const adAlertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    keyword: {
        type: String,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    emailFrequency: {
        type: String,
    }
})

const AdAlertModel = mongoose.model<AdAlertDocument>('AdAlert', adAlertSchema)

export default AdAlertModel
