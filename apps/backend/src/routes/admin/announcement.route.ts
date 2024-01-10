import { Express } from 'express'
import { requireAdmin } from '../../middlewares/requireUser'
import { validateAnnouncement } from '../../middlewares/admin/announcement.validate'
import { createAnnouncementHandler, findAnnouncementHandler } from '../../controller/admin/announcement.controller'


function announcementRoute(app: Express) {
    // create a filter
    app.post(
        '/api/v1/admin/announcement',
        requireAdmin,
        validateAnnouncement,
        createAnnouncementHandler
    )

    // find all filters
    app.get('/api/v1/admin/announcement', findAnnouncementHandler)
}

export default announcementRoute
