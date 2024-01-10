import { Request, Response } from 'express'
import AdAlertModel from '../models/adAlert.model'
import { createAdAlert, deleteAdAlert, deleteMultipleAdAlerts, findAdAlert, getAdAlert, updateAdAlert, updateAdAlertStatus } from '../service/adAlert.service'
import { searchAdByAlert } from '../service/ads.service'

// create ad alert controller
export async function createAdAlertHandler(req: Request, res: Response) {
    const userId = res.locals.user._id
    const input = {
        ...req.body,
        user: userId,
    }

    try {
        const adAlert = await createAdAlert(input)

        res.status(200).send({
            message: 'Successfully created a ad alert',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// get ad alert by ID controller
export async function getAdAlertHandler(req: Request, res: Response) {
    const alertID = req.params.alertId
    try {
        const adAlertResult = await getAdAlert(alertID)

        res.status(200).send({
            message: 'Successfully get alert an alert',
            data: adAlertResult
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// show alert result controller
export async function showAdAlertHandler(req: Request, res: Response) {
    const alertID = req.params.alertId
    try {
        const adAlertQuery = await getAdAlert(alertID)

        const alertAds = await searchAdByAlert(adAlertQuery)

        const data = {
            alertAds: alertAds
        }
        res.status(200).send({
            message: 'Successfully get alert ads',
            data
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// find ad alert controller (private)
export async function findAdAlertHandler(req: Request, res: Response) {
    const userID = res.locals.user._id

    try {
        const adAlerts = await findAdAlert({ user: userID })

        res.status(200).send({
            message: 'Successfully found all ad alerts',
            data: adAlerts
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// update ad alert controller
export async function updateAdAlertHandler(req: Request, res: Response) {
    const alertID = req.params.alertId
    const body = req.body

    try {
        const adAlert = await updateAdAlert(alertID, body)
        res.status(200).send({
            message: 'Successfully update an ad alert',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// update ad alert status controller
export async function updateAdAlertStatusHandler(req: Request, res: Response) {
    const alertID = req.params.alertId
    const alertData = {
        active: req.body.active,
    }
    try {
        // update a ad
        const adAlert = await updateAdAlertStatus(alertID, alertData)

        if (!adAlert) {
            return res.status(404).send({
                message: 'Ad Alert Not Found',
            })
        }
        return res.status(200).send({
            message: 'Ad Alert Updated',
        })
    } catch (e) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

//  disable multiple alert status  handller
export async function disableMultipleAdAlertHandler(req: Request, res: Response) {
    const alertIDs = req.body.alertIds;
    const inputAlertIds = alertIDs?.split(",");

    try {
        const adAlerts = await AdAlertModel.find({
            _id: {
                $in: inputAlertIds,
            },
        })
        if (!adAlerts) {
            return res.status(404).send({
                message: 'Ad alerts Not Found',
            })
        }

        adAlerts.forEach(async (adAlert: any) => {
            adAlert.active = false
            adAlert.save()
        })

        return res.status(200).send({
            message: 'Successfully disabled ad alert list',
        })

    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
            error: e.message,
        });
    }
}

// delete ad alert controller
export async function deleteAdAlertHandler(req: Request, res: Response) {
    const alertID = req.params.alertId

    try {
        const adAlert = await deleteAdAlert(alertID)

        res.status(200).send({
            message: 'Successfully delete a ad alert',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

// delete multiple ads alert controller
export async function deleteMultipleAdAlertsHandler(req: Request, res: Response) {
    const alertIDs = req.body.alertIds
    const alertIdInput = alertIDs.split(',')

    try {
        const adAlerts = await deleteMultipleAdAlerts(alertIdInput)

        res.status(200).send({
            message: 'Successfully delete ad alerts',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: "Server Error",
        });
    }
}

