import { Express } from 'express'
import { createPackageHandler, deletePackageHandler, findPackageHandler, getPackageHandler, updatePackageHandler } from '../../controller/admin/packagecontroller'
import validatePackage from '../../middlewares/admin/package.validate'
import { requireAdmin } from '../../middlewares/requireUser'

function packageRoute(app: Express) {
    // create a package
    app.post('/api/v1/package/ads',
        requireAdmin,
        validatePackage,
        createPackageHandler)

    // get a package by id
    app.get('/api/v1/package/ads/:packageId', requireAdmin, getPackageHandler)

    // find all packages
    app.get('/api/v1/package/ads', findPackageHandler)

    // update a package
    app.put('/api/v1/package/ads/:packageId', requireAdmin, updatePackageHandler)

    // delete a package
    app.delete('/api/v1/package/ads/:packageId', requireAdmin, deletePackageHandler)
}

export default packageRoute
