import mongoose from 'mongoose'

export interface TopLocationDocument extends mongoose.Document {
    location: string
    status: {
        isActive: boolean
    }
    slug: string
    avatar: string
    avatarCloudinaryId: string
}

const topLocationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    avatarCloudinaryId: {
        type: String,
    },

})

const TopLocationModel = mongoose.model<TopLocationDocument>('Toplocation', topLocationSchema)

export default TopLocationModel
