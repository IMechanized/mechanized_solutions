import { Express } from 'express'
import { createContactEmailHandler, createEmailHandler, findEmailsHandler, getEmailHandler, updateEmailHandler } from '../../controller/admin/email.controller'
import { requireAdmin } from '../../middlewares/requireUser'

function emailRoute(app: Express) {
    // create a email routes
    app.post('/api/v1/admin/notification/email', requireAdmin, createEmailHandler)

    // get a email by email-type
    app.get(
        '/api/v1/admin/notification/email/:emailType',
        requireAdmin,
        getEmailHandler
    )

    // find all emails
    app.get('/api/v1/admin/notification/emails', requireAdmin, findEmailsHandler)

    //update a email by id
    app.put(
        '/api/v1/admin/notification/email/:emailType',
        requireAdmin,
        updateEmailHandler
    )


    // Contact us email sender
    app.post('/api/v1/contact/email', createContactEmailHandler)
}

export default emailRoute
