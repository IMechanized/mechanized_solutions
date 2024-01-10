import { Express } from 'express'
import {
    getNotificationHandler,
    updateNotificationHandler,
} from '../controller/notification.controller'
import requireUser from '../middlewares/requireUser'

function notificationRoute(app: Express) {
    // Get all notifications
    app.get(
        '/api/v1/users/notifications/catalog',
        requireUser,
        getNotificationHandler
    )

    // update notification status
    app.put(
        '/api/v1/users/notifications/catalog/:notoficationId',
        requireUser,
        updateNotificationHandler
    )
}
export default notificationRoute
