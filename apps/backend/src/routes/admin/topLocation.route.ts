import { Express } from 'express'
import { changeLoationStatusHandler, createTopLocationHandler, deleteLocationHandler, deleteMultipleLocationsHandler, disableMultipleLocationHandler, findAdminLocationHandler, findTopLocatioHandler, getLocationBySlugHandler, getLocationHandler, updateLocationHandler } from '../../controller/admin/topLocation.controller'
import { validateTopLocation } from '../../middlewares/admin/topLocation.validate'
import { requireAdmin } from '../../middlewares/requireUser'
import upload from '../../utils/multer'


function topLocationRoute(app: Express) {
    // create a location
    app.post(
        '/api/v1/admin/topLocations',
        requireAdmin,
        validateTopLocation,
        upload.single('locationImage'),
        createTopLocationHandler
    )

    // get a location by id
    app.get('/api/v1/admin/topLocations/byId/:locationId', requireAdmin, getLocationHandler)

    // get a location by slug
    app.get('/api/v1/admin/topLocations/:locationSlug', getLocationBySlugHandler)

    // find all locations public
    app.get('/api/v1/admin/topLocations', findTopLocatioHandler)

    // find all categories admin private
    app.get("/api/v1/admin/private/topLocations", requireAdmin, findAdminLocationHandler);

    // update a location
    app.put('/api/v1/admin/topLocations/byId/:locationId', requireAdmin, upload.single('locationImage'), updateLocationHandler)

    // change a location status by id
    app.put(
        "/api/v1/admin/topLocations/status/:locationId",
        requireAdmin,
        changeLoationStatusHandler
    );

    // disable multiple location status by ids
    app.put(
        "/api/v1/admin/multiselect/topLocations/status",
        requireAdmin,
        disableMultipleLocationHandler
    );

    // delete a location
    app.delete('/api/v1/admin/topLocations/byId/:locationId', requireAdmin, deleteLocationHandler)

    // delete multiple location
    app.delete(
        "/api/v1/admin/multiselect/topLocations",
        requireAdmin,
        deleteMultipleLocationsHandler
    );
}

export default topLocationRoute
