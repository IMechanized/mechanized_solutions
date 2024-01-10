import mongoose from 'mongoose'

export interface AnnouncementDocument extends mongoose.Document {
    announcement: string

}

const announcementSchema = new mongoose.Schema({
    announcement: {
        type: String,
        default: ''
    },
})

const AnnouncementModel = mongoose.model<AnnouncementDocument>('Announcement', announcementSchema)

export default AnnouncementModel
