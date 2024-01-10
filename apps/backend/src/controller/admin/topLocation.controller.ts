import { Request, Response } from 'express';
import TopLocationModel from '../../models/admin/topLocation.model';
import {
    changeLocationStatus,
    createTopLocation,
    deleteLocation,
    deleteMultipleLocation,
    findAdminLocation,
    findTopLocation,
    getLocation,
    getLocationBySlug,
    getLocationByTitle,
    updateLocation,
} from '../../service/admin/topLocation.service';
var slug = require('slug');

// create a top-location controller
export async function createTopLocationHandler(req: Request, res: Response) {
    try {
        //Location slug
        let locationSlug = slug(req.body.location, { lower: true });
        const getLocationInfo = await getLocationBySlug(locationSlug);
        if (getLocationInfo) {
            locationSlug =
                locationSlug + '-' + Math.floor(100 + Math.random() * 900);
        }

        const checkLocation = await getLocationByTitle(req.body.location);
        if (checkLocation) {
            return res.status(400).send({
                message: 'Location already exist',
            });
        }

        const locationData = {
            location: req.body.location,
            slug: locationSlug,
        };
        const imagePath = req.file?.path;
        const locations = await createTopLocation(locationData, imagePath);
        return res.status(200).send({
            message: 'Locations created successfully',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// get top-location handller by id
export async function getLocationHandler(req: Request, res: Response) {
    const locationID = req.params.locationId;

    // get a location
    try {
        const location = await getLocation(locationID);

        if (!location) {
            return res.status(404).send({
                message: 'Location Not Found',
            });
        }
        return res.status(200).send({
            message: 'Location Found',
            data: location,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// get top-location handller by slug
export async function getLocationBySlugHandler(req: Request, res: Response) {
    const locationSlug = req.params.locationSlug;
    // get a location
    try {
        const location = await getLocationBySlug(locationSlug);

        if (!location) {
            return res.status(404).send({
                message: 'Location Not Found',
            });
        }
        return res.status(200).send({
            message: 'Location Found',
            data: location,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all top-location controller public
export async function findTopLocatioHandler(req: Request, res: Response) {
    try {
        const locations = await findTopLocation();
        res.status(200).send({
            message: 'Successfully find all top-locations',
            data: locations,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all location admin private handller
export async function findAdminLocationHandler(req: Request, res: Response) {
    try {
        const locations = await findAdminLocation();
        res.status(200).send({
            message: 'Successfully find all Locations',
            data: locations,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// update Locaion handller
export async function updateLocationHandler(req: Request, res: Response) {
    const locationID = req.params.locationId;
    try {
        //location slug
        let locationSlug = slug(req.body.location, { lower: true });
        const getLocationInfo = await getLocationBySlug(locationSlug);
        if (getLocationInfo) {
            locationSlug =
                locationSlug + '-' + Math.floor(100 + Math.random() * 900);
        }
        const checkLocation = await getLocationByTitle(req.body.location);

        if (checkLocation && checkLocation?._id != locationID) {
            return res.status(400).send({
                message: 'Location already exist',
            });
        }

        const imagePath = req.file?.path as any;
        const locationData = {
            location: req.body.location,
            slug: locationSlug,
        };
        const location = await updateLocation(
            locationID,
            locationData,
            imagePath,
        );

        if (!location) {
            return res.status(404).send({
                message: 'Locaion Not Found',
            });
        }
        return res.status(200).send({
            message: 'Locaion Updated',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  change a locaion status handller
export async function changeLoationStatusHandler(req: Request, res: Response) {
    const locationID = req.params.locationId;
    const locationyStatus = req.body.status;

    try {
        const location = (await changeLocationStatus(locationID)) as any;

        switch (locationyStatus) {
            case 'enbable':
                location.status.isActive = true;
                location.save();
                return res.status(200).send({
                    message: 'Location is activated successfully',
                });

            case 'disable':
                location.status.isActive = false;
                location.save();
                return res.status(200).send({
                    message: 'Location is deactivated successfully',
                });

            default:
                return res.status(400).send({
                    message: 'Invalid status',
                });
        }
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  disable multiple locaion status handller
export async function disableMultipleLocationHandler(
    req: Request,
    res: Response,
) {
    const locaionIDs = req.body.locationIds;
    const inputLocationIds = locaionIDs?.split(',');

    try {
        const locations = await TopLocationModel.find({
            _id: {
                $in: inputLocationIds,
            },
        });
        if (!locations) {
            return res.status(404).send({
                message: 'Locaion Not Found',
            });
        }

        locations.forEach(async (location: any) => {
            location.status.isActive = false;
            location.save();
        });

        return res.status(200).send({
            message: 'Locaions are disabled successfully',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete locaion handller
export async function deleteLocationHandler(req: Request, res: Response) {
    const locationID = req.params.locationId;
    // delete a Locaion
    try {
        const locaion = await deleteLocation(locationID);

        if (!locaion) {
            return res.status(404).send({
                message: 'Locaion Not Found',
            });
        }
        return res.status(200).send({
            message: 'Locaion Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete multiple  locaion handller
export async function deleteMultipleLocationsHandler(
    req: Request,
    res: Response,
) {
    const locaionIDs = req.body.locationIds;
    const inputLocationsIds = locaionIDs?.split(',');

    try {
        const locaion = await deleteMultipleLocation(inputLocationsIds);

        if (!locaion) {
            return res.status(404).send({
                message: 'Locaion Not Found',
            });
        }
        return res.status(200).send({
            message: 'Locaion Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}
