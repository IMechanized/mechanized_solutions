import { Request, Response } from 'express'
import { createPackage, deletePackage, findPackage, getPackage, updatePackage } from '../../service/admin/package.service'

// create package controller
export async function createPackageHandler(req: Request, res: Response) {
    try {
        const packageData = {
            ...req.body,
        }
        const packageResult = await createPackage(packageData)
        res.status(200).json({
            message: 'Package created successfully',
        })
    } catch (e: any) {
        console.log(e)
        e === 11000
            ? res.status(400).json({
                message: 'Package already exist',
                error: e,
            })
            : res.status(500).send({
                message: 'Server error',
                error: e,
            })
    }
}

// get package controller
export async function getPackageHandler(req: Request, res: Response) {
    const packageID = req.params.packageId
    // get a package
    try {
        const packageResult = await getPackage(packageID)

        if (!packageResult) {
            return res.status(200).send({
                message: 'Package Not Found',
            })
        }
        return res.status(200).send({
            message: 'Package Found',
            data: packageResult,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all packages controller
export async function findPackageHandler(req: Request, res: Response) {
    try {
        const packages = await findPackage()
        res.status(200).send({
            message: 'Successfully find all Packagess',
            data: packages,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// update package handller
export async function updatePackageHandler(req: Request, res: Response) {
    const packageID = req.params.packageId

    const packageUpdate = {
        ...req.body,
    }
    try {
        const packageResult = await updatePackage(packageID, packageUpdate)

        if (!packageResult) {
            return res.status(200).send({
                message: 'Package Not Found',
            })
        }
        return res.status(200).send({
            message: 'Package Updated',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// delete package handller
export async function deletePackageHandler(req: Request, res: Response) {
    const packageID = req.params.packageId

    // delete a package
    try {
        const packageResult = await deletePackage(packageID)

        if (!packageResult) {
            return res.status(200).send({
                message: 'Package Not Found',
            })
        }
        return res.status(200).send({
            message: 'Package Deleted',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}
