import _ from "lodash"
import TopLocationModel from "../../models/admin/topLocation.model"
import AdsModel from "../../models/ads.model"
import cloudinary from "../../utils/cloudinary"

// create location service
export async function createTopLocation(locationData: any, imagePath: any) {
    // let options = { upsert: true, new: true, setDefaultsOnInsert: true }
    try {
        let locationInput
        if (imagePath) {
            // Upload image to cloudinary
            const imageData = await cloudinary.uploader.upload(imagePath)
            locationInput = {
                ...locationData,
                avatar: imageData.secure_url,
                avatarCloudinaryId: imageData.public_id,
            }
        } else {
            locationInput = {
                ...locationData,
            }
        }
        // const locations = await TopLocationModel.findOneAndUpdate({}, input, options)
        console.log('locationInput', locationInput)
        const locations = await TopLocationModel.create(locationInput)
        return locations
    } catch (e) {
        throw e
    }
}

// get a location by id service
export async function getLocation(locationID: string) {
    try {
        const location = await TopLocationModel.findById(locationID).lean(true)

        const locationName = _.pick(location, ['location'])
        const totalAdsCount = await AdsModel.find({
            location: locationName.location,
        }).count()

        const result = {
            ...location,
            count: totalAdsCount,
        }

        // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
        return result
    } catch (e) {
        throw e
    }
}

// get a location by slug service
export async function getLocationBySlug(locationSlug: string) {
    try {
        const location = await TopLocationModel.findOne({
            slug: locationSlug,
        }).lean(true)
        return location
    } catch (e) {
        throw e
    }
}

// get a location by title service
export async function getLocationByTitle(locationTitle: string) {
    try {
        const location = await TopLocationModel.findOne({
            location: locationTitle,
        }).lean(true)
        return location
    } catch (e) {
        throw e
    }
}

// find all location service public
export async function findTopLocation() {
    try {
        const locations = await TopLocationModel.find().lean(true)

        const locationName = _.map(locations, 'location')
        const totalAdsCount = await AdsModel.aggregate([
            {
                $group: {
                    _id: '$location',
                    count: { $sum: 1 },
                },
            },
        ])

        const result = locations.map((location: any) => {
            const locationCount = totalAdsCount.find(
                (count: any) => count._id === location.location
            )
            return {
                ...location,
                count: locationCount ? locationCount.count : 0,
            }
        })

        // return locations[0]?.topLocations
        // return locations
        return result
    } catch (e) {
        throw e
    }
}

// find all categories admin private  service
export async function findAdminLocation() {
    try {
        const locations = await TopLocationModel.find().lean(true);
        return locations;
    } catch (e) {
        throw e;
    }
}

// update a location service
export async function updateLocation(locationID: string, update: any, imagePath: any) {
    try {
        let locationUpdate = null
        if (imagePath) {
            const locationPrevData = (await TopLocationModel.findById(locationID)) as any
            if (locationPrevData.avatarCloudinaryId) {
                await cloudinary.uploader.destroy(locationPrevData.avatarCloudinaryId)
            }
            const imageData = await cloudinary.uploader.upload(imagePath)
            const imageInput = {
                avatar: imageData?.secure_url,
                avatarCloudinaryId: imageData?.public_id,
            }
            locationUpdate = {
                ...update,
                ...imageInput,
            }
        } else {
            locationUpdate = {
                ...update,
            }
        }
        const location = await TopLocationModel.findByIdAndUpdate(locationID, locationUpdate, {
            new: true,
        })
        return location
    } catch (e) {
        throw e
    }
}

// change a location status service
export async function changeLocationStatus(locationID: string) {
    try {
        const location = await TopLocationModel.findById(locationID);
        return location;
    } catch (e) {
        throw e;
    }
}

// delete a location service
export async function deleteLocation(locationID: string) {
    try {
        // Delete image from cloudinary
        const locationPrevData = (await TopLocationModel.findById(locationID)) as any
        if (locationPrevData.avatarCloudinaryId) {
            await cloudinary.uploader.destroy(locationPrevData.avatarCloudinaryId)
        }

        const location = await TopLocationModel.findByIdAndDelete(locationID)
        return location
    } catch (e) {
        throw e
    }
}

// delete multiple location service
export async function deleteMultipleLocation(locaionIDs: string[]) {
    try {
        for (const locationID of locaionIDs) {
            console.log('locationID from service', locationID)
            // Delete image from cloudinary
            const locationPrevData = (await TopLocationModel.findById(locationID)) as any;

            if (locationPrevData?.avatarCloudinaryId) {
                await cloudinary.uploader.destroy(locationPrevData.avatarCloudinaryId);
            }

        }

        const location = await TopLocationModel.deleteMany({ _id: { $in: locaionIDs } });
        return location;
    } catch (e) {
        throw e;
    }
}
