import { query } from 'express'
import AdAlertModel from '../models/adAlert.model'

// create ad alert service
export async function createAdAlert(input: any) {
    try {
        const adAlert = await AdAlertModel.create(input)
        return adAlert
    } catch (e) {
        throw e
    }
}

// get ad alert service
export async function getAdAlert(alertID: string) {
    try {
        const adAlert = await AdAlertModel.findById(alertID)
        return adAlert
    } catch (e) {
        throw e
    }
}

// find all ad alerts service (private)
export async function findAdAlert(query: any) {
    try {
        const adAlert = await AdAlertModel.find(query).lean(true)
        return adAlert
    } catch (e) {
        throw e
    }
}

// find all ad alerts by query populated user service
export async function findAllAdAlerts(query: any) {
    try {
        const adAlert = await AdAlertModel.find(query).populate('user', ['email']).lean(true)
        return adAlert
    } catch (e) {
        throw e
    }
}

// update ad alert service
export async function updateAdAlert(alertID: string, input: any) {
    try {
        const adAlert = await AdAlertModel.findByIdAndUpdate(alertID, input, {
            new: true,
        })
        return adAlert
    } catch (e) {
        throw e
    }
}

// update ad alert status service
export async function updateAdAlertStatus(alertID: string, update: any) {
    try {
        const adAlert = await AdAlertModel.findByIdAndUpdate(alertID, update, {
            new: true,
        })
        return adAlert
    } catch (e) {
        throw e
    }
}


// delete ad alert  service
export async function deleteAdAlert(alertID: string) {
    try {
        const adAlert = await AdAlertModel.findByIdAndDelete(alertID)
        return adAlert
    } catch (e) {
        throw e
    }
}

// delete multiple ad-alerts  service
export async function deleteMultipleAdAlerts(alertIDs: string) {
    try {
        const adAlert = await AdAlertModel.deleteMany({ _id: { $in: alertIDs } })
        return adAlert
    } catch (e) {
        throw e
    }
}
