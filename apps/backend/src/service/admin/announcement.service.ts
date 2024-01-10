import AnnouncementModel from "../../models/admin/announcement.model"

// create filter service
export async function createAnnouncement(input: any) {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }
    try {
        const announcement = await AnnouncementModel.findOneAndUpdate({}, input, options)
        return announcement
    } catch (e) {
        throw e
    }
}

// find all filters service
export async function findAnnouncement() {
    try {
        const announcement = await AnnouncementModel.find().lean(true)
        return announcement[0]?.announcement
    } catch (e) {
        throw e
    }
}