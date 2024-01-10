import mongoose from 'mongoose'
import { AdsDocument } from './ads.model'
import { UserDocument } from './user.model'

export interface MessageDocument extends mongoose.Document {
    ads: AdsDocument['_id']
    time: string
    members: {
        buyer: UserDocument['_id']
        seller: UserDocument['_id']
    }
    messages: [
        {
            sender: UserDocument['_id']
            reciver: UserDocument['_id']
            message: string
            timestamp: string
        }
    ]
}

// create message schema
const messageSchema = new mongoose.Schema({
    ads: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ads',
    },
    time: {
        type: String,
        required: true,
    },
    members: {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    messages: {
        type: [
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                reciver: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                message: String,
                timestamp: String,
            },
        ],
        required: true,
    },
})

// create message model
const MessageModel = mongoose.model<MessageDocument>('Message', messageSchema)

export default MessageModel
