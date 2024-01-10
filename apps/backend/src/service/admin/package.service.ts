import _ from 'lodash'
import PackageModel, { PackageDocument } from '../../models/admin/package.model'

// create a package service
export async function createPackage(packageData: PackageDocument) {
    try {
        const packageResult = await PackageModel.create(packageData)
        return packageResult
    } catch (e: any) {
        console.log(e)
        throw e.code
    }
}

// get a package service
export async function getPackage(packageID: string) {
    try {
        const packageResult = await PackageModel.findById(packageID).lean(true)
        return packageResult
    } catch (e) {
        throw e
    }
}

// find all packages service
export async function findPackage() {
    try {
        const packageResult = await PackageModel.find().lean(true)
        return packageResult
    } catch (e) {
        throw e
    }
}

// update a category service
export async function updatePackage(packageID: string, update: object) {
    try {
        const packageResult = await PackageModel.findByIdAndUpdate(packageID, update, {
            new: true,
        })
        return packageResult
    } catch (e) {
        throw e
    }
}

// delete a category service
export async function deletePackage(packageID: string) {
    try {
        const packageResult = await PackageModel.findByIdAndDelete(packageID)
        return packageResult
    } catch (e) {
        throw e
    }
}
