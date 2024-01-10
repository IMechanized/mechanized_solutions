import mongoose from 'mongoose'
import { AdsDocument } from './ads.model'
import { UserDocument } from './user.model'

export interface BookmarkDocument extends mongoose.Document {
    user: UserDocument['_id']
    bookmarks: [
        {
            ads: AdsDocument['_id']
            note: string
        }
    ]
    createdAt: Date
    updatedAt: Date
}

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bookmarks: [
        {
            ads: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ads',
            },
            note: {
                type: String,
                default: '',
            },
        },
    ],
},
    {
        timestamps: true,
    }
)

const BookmarkModel = mongoose.model<BookmarkDocument>(
    'Bookmark',
    bookmarkSchema
)

export default BookmarkModel
