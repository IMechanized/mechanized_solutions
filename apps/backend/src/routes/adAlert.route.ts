import { Express, Request, Response } from 'express'
import { createAdAlertHandler, deleteAdAlertHandler, deleteMultipleAdAlertsHandler, disableMultipleAdAlertHandler, findAdAlertHandler, getAdAlertHandler, showAdAlertHandler, updateAdAlertHandler, updateAdAlertStatusHandler } from '../controller/adAlert.controller'
import { requireBuyer } from '../middlewares/requireUser'

function adAlertRoute(app: Express) {

    // Create ad alert
    app.post(
        '/api/v1/user/alert/ads',
        requireBuyer,
        createAdAlertHandler
    )

    // get a ad alert by ID
    app.get('/api/v1/user/alert/ads/:alertId', requireBuyer, getAdAlertHandler)

    // show alert result
    app.get('/api/v1/user/alert/ads/search/:alertId', requireBuyer, showAdAlertHandler)

    // Find all ad alerts (private)
    app.get('/api/v1/user/alert/ads', requireBuyer, findAdAlertHandler)

    // update a ad alert
    app.put(
        '/api/v1/user/alert/ads/:alertId',
        requireBuyer,
        updateAdAlertHandler
    )

    // update ad alert status
    app.put('/api/v1/user/alert/status/ads/:alertId', requireBuyer, updateAdAlertStatusHandler)

    // disable multiple ad alert status by ids
    app.put(
        "/api/v1/user/multiselect/alert/ads",
        requireBuyer,
        disableMultipleAdAlertHandler
    );

    // delete a ad alert
    app.delete(
        '/api/v1/user/alert/ads/:alertId',
        requireBuyer,
        deleteAdAlertHandler
    )

    // delete multiple ad alerts 
    app.delete(
        '/api/v1/user/multiselect/alert/ads',
        requireBuyer,
        deleteMultipleAdAlertsHandler
    )


}

export default adAlertRoute
