import _ from 'lodash';
import AdsModel from '../models/ads.model';
import UserModel from '../models/user.model';
import cloudinary from '../utils/cloudinary';

// create an ad service
export async function createAd(input: any, inputFiles: any) {
    try {
        let adGalleryInput = [];
        let adCoverImageInput = '';
        let videoInput = '';
        if (inputFiles.adGallery.length > 0) {
            for (const image of inputFiles.adGallery) {
                const imageData = await cloudinary.uploader.upload(image);
                adGalleryInput.push({
                    url: imageData?.secure_url,
                    public_id: imageData?.public_id,
                });
            }
        }
        if (inputFiles.adCoverImage) {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(
                inputFiles.adCoverImage,
            );

            adCoverImageInput = result.secure_url;
        }
        if (inputFiles.adVideo) {
            // Upload adVideo to cloudinary
            const videoData = await cloudinary.uploader.upload(
                inputFiles.adVideo,
                {
                    resource_type: 'video',
                },
            );

            videoInput = videoData.secure_url;
        }
        const adsTotalInput = {
            ...input,
            adGallery: adGalleryInput,
            adCoverImage: adCoverImageInput,
            adVideo: videoInput,
        };

        const ad = await AdsModel.create(adsTotalInput);
        return ad;
    } catch (e) {
        throw e;
    }
}

// get an ad by id service
export async function getAd(adID: string) {
    try {
        const ad = await AdsModel.findById(adID).lean(true);
        return ad;
    } catch (e) {
        throw e;
    }
}

// get an ad by slug public service
export async function getAdBySlug(adsSlug: string) {
    try {
        //polulate user except password
        const ad = await AdsModel.findOne({
            slug: adsSlug,
        })
            .populate('user', '-password')
            .lean(true);

        const adsCategory = _.pick(ad, ['category']);
        //search ads by category
        const relatedAds = await AdsModel.find({
            category: adsCategory.category,
            slug: { $ne: adsSlug },
        })
            .limit(5)
            .lean(true);

        return { ad, relatedAds };
    } catch (e) {
        throw e;
    }
}

// get an ad by any query service
export async function getAdByQuery(query: any) {
    try {
        const ad = await AdsModel.findOne(query).lean(true);
        return ad;
    } catch (e) {
        throw e;
    }
}

// find all admin ads service
export async function findAdminAds(query: any) {
    const page = query.page;
    const limit = 9;
    let adsTypeQuery: any;
    if (query.adsType === 'all') {
        adsTypeQuery = {};
    } else if (query.adsType === 'featured') {
        adsTypeQuery = {
            'status.isFeatured': true,
        };
    } else if (query.adsType === 'rejected') {
        adsTypeQuery = {
            'status.isApproved': false,
        };
    } else if (query.adsType === 'inactive') {
        adsTypeQuery = {
            'status.isActive': false,
        };
    } else if (query.adsType === 'expired') {
        adsTypeQuery = {
            'status.isActive': false,
        };
    } else {
        adsTypeQuery = {};
    }

    try {
        let qAdsTitle = null;
        let qCategory = null;
        if (query.adTitle) {
            qAdsTitle = new RegExp(query.adTitle, 'i');
        }
        if (query.category) {
            qCategory = new RegExp(query.category, 'i');
        }

        let sortingQuery: any = {};
        if (query.sortbyTitle) {
            sortingQuery = {
                adTitle: query.sortbyTitle === 'descending' ? -1 : 1,
            };
        } else if (query.sortbyCategory) {
            sortingQuery = {
                category: query.sortbyCategory === 'descending' ? -1 : 1,
            };
        } else if (query.sortbyStatus) {
            sortingQuery = {
                'status.isApproved':
                    query.sortbyStatus === 'descending' ? 1 : -1,
            };
        } else if (query.sortbyFeatured) {
            sortingQuery = {
                'status.isFeatured':
                    query.sortbyFeatured === 'ascending' ? -1 : 1,
            };
        } else if (query.sortbyDate) {
            sortingQuery = {
                createdAt: query.sortbyDate === 'ascending' ? -1 : 1,
            };
        } else {
            sortingQuery = {
                createdAt: -1,
            };
        }

        if (qAdsTitle || qCategory) {
            let filterQuery: any = {
                ...adsTypeQuery,
            };
            if (qAdsTitle) filterQuery.adTitle = { $in: qAdsTitle };
            if (qCategory) filterQuery.category = { $in: qCategory };

            const ads = await AdsModel.find(filterQuery)
                .sort(sortingQuery)
                .skip(page * limit)
                .limit(limit);

            const totalAds = await AdsModel.countDocuments(filterQuery);

            return { ads, totalAds };
        } else {
            let defaultQuery: any = {
                ...adsTypeQuery,
            };
            const ads = await AdsModel.find(defaultQuery)
                .sort(sortingQuery)
                .skip(page * limit)
                .limit(limit);

            const totalAds = await AdsModel.countDocuments(defaultQuery);

            return { ads, totalAds };
        }
    } catch (e) {
        throw e;
    }
}

// find all private ads service
export async function findPrivateAds(userID: string, query: any) {
    const page = query.page;
    const limit = 9;

    const userQuery = { user: userID };
    let adsTypeQuery: any;
    if (query.adsType === 'all') {
        adsTypeQuery = {};
    } else if (query.adsType === 'featured') {
        adsTypeQuery = {
            'status.isFeatured': true,
        };
    } else if (query.adsType === 'rejected') {
        adsTypeQuery = {
            'status.isApproved': false,
        };
    } else if (query.adsType === 'inactive') {
        adsTypeQuery = {
            'status.isActive': false,
        };
    } else if (query.adsType === 'expired') {
        adsTypeQuery = {
            'status.isActive': false,
        };
    } else {
        adsTypeQuery = {};
    }

    try {
        let qAdsTitle = null;
        let qCategory = null;
        if (query.adTitle) {
            qAdsTitle = new RegExp(query.adTitle, 'i');
        }
        if (query.category) {
            qCategory = new RegExp(query.category, 'i');
        }

        let sortingQuery: any = {};
        if (query.sortbyTitle) {
            sortingQuery = {
                adTitle: query.sortbyTitle === 'descending' ? -1 : 1,
            };
        } else if (query.sortbyCategory) {
            sortingQuery = {
                category: query.sortbyCategory === 'descending' ? -1 : 1,
            };
        } else if (query.sortbyStatus) {
            sortingQuery = {
                'status.isApproved':
                    query.sortbyStatus === 'descending' ? 1 : -1,
            };
        } else if (query.sortbyFeatured) {
            sortingQuery = {
                'status.isFeatured':
                    query.sortbyFeatured === 'ascending' ? -1 : 1,
            };
        } else if (query.sortbyDate) {
            sortingQuery = {
                createdAt: query.sortbyDate === 'ascending' ? -1 : 1,
            };
        } else {
            sortingQuery = {
                createdAt: -1,
            };
        }

        if (qAdsTitle || qCategory) {
            let filterQuery: any = {
                ...userQuery,
                ...adsTypeQuery,
            };
            if (qAdsTitle) filterQuery.adTitle = { $in: qAdsTitle };
            if (qCategory) filterQuery.category = { $in: qCategory };

            const ads = await AdsModel.find(filterQuery)
                .sort(sortingQuery)
                .skip(page * limit)
                .limit(limit);

            const totalAds = await AdsModel.countDocuments(filterQuery);

            return { ads, totalAds };
        } else {
            let defaultQuery: any = {
                ...userQuery,
                ...adsTypeQuery,
            };
            const ads = await AdsModel.find(defaultQuery)
                .sort(sortingQuery)
                .skip(page * limit)
                .limit(limit);

            const totalAds = await AdsModel.countDocuments(defaultQuery);

            return { ads, totalAds };
        }
    } catch (e) {
        throw e;
    }
}

// find all public ads service
export async function findAds() {
    try {
        const ads = await AdsModel.find({
            'status.isApproved': true,
            'status.isPublished': true,
            'status.isActive': true,
        }).lean(true);
        return ads;
    } catch (e) {
        throw e;
    }
}

//find all public latest ads service
export async function findLatestAds() {
    try {
        const ads = await AdsModel.find({
            'status.isApproved': true,
            'status.isPublished': true,
            'status.isActive': true,
        })
            .sort({ createdAt: -1 })
            .limit(8)
            .lean(true);
        return ads;
    } catch (e) {
        throw e;
    }
}

// find total featured ads count of an user service
export async function findTotalFeaturedAds(input: any) {
    const query = {
        user: input,
        'status.isFeatured': true,
    };
    try {
        const totalAds = await AdsModel.find(query).countDocuments();
        return totalAds;
    } catch (e) {
        throw e;
    }
}

// find total created ads count  of an user service
export async function findTotalAdsCount(input: any) {
    const query = {
        user: input,
    };
    try {
        const totalAds = await AdsModel.find(query).countDocuments();
        return totalAds;
    } catch (e) {
        throw e;
    }
}

// update an ad service
export async function updateAd(adID: string, update: any, inputFiles: any) {
    try {
        let adsTotalInput;

        if (inputFiles) {
            let adGalleryInput = inputFiles.oldGallery;
            if (inputFiles.adGallery?.length > 0) {
                const adPrevData = (await AdsModel.findById(adID)) as any;
                if (adPrevData.adGallery.length > 0) {
                    for (const image of adPrevData.adGallery) {
                        await cloudinary.uploader.destroy(image.public_id);
                    }
                }
                adGalleryInput = [];
                for (const image of inputFiles.adGallery) {
                    const imageData = await cloudinary.uploader.upload(image);
                    adGalleryInput.push({
                        url: imageData?.secure_url,
                        public_id: imageData?.public_id,
                    });
                }
            }
            let adCoverImageInput =
                inputFiles.oldAdCoverImage !== 'null'
                    ? inputFiles.oldAdCoverImage
                    : '';
            if (inputFiles?.adCoverImage) {
                // Upload image to cloudinary
                const result = await cloudinary.uploader.upload(
                    inputFiles.adCoverImage,
                );

                adCoverImageInput = result.secure_url;
            }

            let videoInput =
                inputFiles.oldAdVideo !== 'null' ? inputFiles.oldAdVideo : '';
            if (inputFiles?.adVideo) {
                // Upload adVideo to cloudinary
                const videoData = await cloudinary.uploader.upload(
                    inputFiles.adVideo,
                    {
                        resource_type: 'video',
                    },
                );

                videoInput = videoData.secure_url;
            }

            adsTotalInput = {
                ...update,
                adGallery: adGalleryInput, // old and new gallery images
                adCoverImage: adCoverImageInput,
                adVideo: videoInput,
            };
        } else {
            // if oldAdCoverImage and oldAdVideo is null
            adsTotalInput = {
                ...update,
                adCoverImage: inputFiles.oldAdCoverImage,
                adVideo: inputFiles.oldAdVideo,
                adGallery: inputFiles.oldGallery,
            };
        }

        const ad = await AdsModel.findByIdAndUpdate(adID, adsTotalInput, {
            new: true,
        }).lean(true);
        return ad;
    } catch (e) {
        throw e;
    }
}

//search and filter ads service
export async function searchAds(query: any) {
    const page = query.page;
    const limit = 12;

    const statusQuery = {
        'status.isPublished': true,
        'status.isApproved': true,
        'status.isActive': true,
    };
    let featuredQuery: any;
    if (query.sortby === 'featured') {
        featuredQuery = {
            'status.isFeatured': true,
        };
    }
    if (query.sortby === 'ascending') {
        var sortValue = 1.0;
    } else if (query.sortby === 'descending') {
        var sortValue = -1.0;
    } else {
        var sortValue = 1.0;
    }

    try {
        let qAdsTitle = null;
        let qLocation = null;
        let qCategory = null;
        let qAdType = null;
        let qAdWarranty = null;

        if (query.adTitle) {
            qAdsTitle = new RegExp(query.adTitle, 'i');
        }
        if (query.location) {
            qLocation = new RegExp(query.location, 'i');
        }
        if (query.category) {
            qCategory = new RegExp(query.category, 'i');
        }
        if (query.adType) {
            qAdType = new RegExp(query.adType, 'i');
        }
        if (query.adWarranty) {
            qAdWarranty = new RegExp(query.adWarranty, 'i');
        }

        if (
            query.adTitle ||
            query.location ||
            query.category ||
            query.adType ||
            query.adWarranty ||
            query.sortby
        ) {
            let filterQuery: any = {
                ...statusQuery,
                ...featuredQuery,
            };
            if (qAdsTitle) filterQuery.adTitle = { $in: qAdsTitle };
            if (qLocation) filterQuery.location = { $in: qLocation };
            if (qCategory) filterQuery.category = { $in: qCategory };
            if (qAdType) filterQuery.adType = { $in: qAdType };
            if (qAdWarranty) filterQuery.itemWarranty = { $in: qAdWarranty };
            const ads = await AdsModel.find(filterQuery)
                //@ts-ignore
                .sort({ 'priceDetails.price': sortValue, createdAt: -1 })
                .skip(page * limit)
                .limit(limit)
                .lean(true);
            //ads count
            const adsCount = await AdsModel.countDocuments(filterQuery);

            return { ads, adsCount };
        } else {
            const ads = await AdsModel.find(statusQuery)
                .skip(page * limit)
                .limit(limit)
                .lean(true)
                .sort({ createdAt: -1 });
            //Ads count
            const adsCount = await AdsModel.countDocuments(statusQuery);

            return { ads, adsCount };
        }
    } catch (e) {
        throw e;
    }
}

// total count for ads, seller, user service
export async function findTotalCount() {
    try {
        const totalAds = await AdsModel.countDocuments({
            'status.isApproved': true,
            'status.isPublished': true,
            'status.isActive': true,
        });
        const totalSellers = await UserModel.countDocuments({
            'role.isSeller': true,
        });
        const totalUser = await UserModel.countDocuments({});
        const total = {
            totalAds,
            totalSellers,
            totalUser,
        };
        return total;
    } catch (e: any) {
        throw e;
    }
}

// Alert Search ad service
export async function searchAdByAlert(query: any) {
    try {
        const statusQuery = {
            'status.isPublished': true,
            'status.isApproved': true,
            'status.isActive': true,
        };

        let qAdTitle = null;
        let qLocation = null;
        let qCategory = null;
        let qTags = null;

        if (query.keyword) {
            qAdTitle = new RegExp(query.keyword, 'i');
        }
        if (query.region) {
            qLocation = new RegExp(query.locaion, 'i');
        }
        if (query.category) {
            qCategory = new RegExp(query.category, 'i');
        }
        if (query.tags) {
            qTags = query.tags;
        }

        if (qAdTitle || qLocation || qCategory || qTags) {
            let filterQuery: any = {
                ...statusQuery,
            };
            if (qAdTitle) filterQuery.keyword = { $in: qAdTitle };
            if (qLocation) filterQuery.location = { $in: qLocation };
            if (qCategory) filterQuery.category = { $in: qCategory };
            if (qTags) filterQuery.tags = { $in: qTags };

            const alertJobs = await AdsModel.find(filterQuery);
            return alertJobs;
        } else {
            const alertJobs = await AdsModel.find(statusQuery).lean(true);
            return alertJobs;
        }
    } catch (e) {
        throw e;
    }
}

// delete an ad service
export async function deleteAd(adID: string) {
    try {
        // Delete image from cloudinary
        const adPrevData = (await AdsModel.findById(adID)) as any;
        if (adPrevData?.adGallery?.length > 0) {
            for (const image of adPrevData.adGallery) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }
        const ad = await AdsModel.findByIdAndDelete(adID);
        return ad;
    } catch (e) {
        throw e;
    }
}

//delete multiple ads service
export async function deleteMultipleAds(adIDs: string[]) {
    try {
        for (const adID of adIDs) {
            // Delete image from cloudinary
            const adPrevData = (await AdsModel.findById(adID)) as any;
            if (adPrevData?.adGallery?.length > 0) {
                for (const image of adPrevData.adGallery) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }
        }
        const ads = await AdsModel.deleteMany({ _id: { $in: adIDs } });
        return ads;
    } catch (e) {
        throw e;
    }
}

//report an ad service
export async function reportAd(adID: string, report: any) {
    try {
        const ad = await AdsModel.findByIdAndUpdate(adID, {
            $push: { adsReport: report },
        });
        return ad;
    } catch (e) {
        throw e;
    }
}

// find reports of an ad service
export async function findAdReports(adID: string) {
    try {
        const ad = await AdsModel.find(
            {
                _id: adID,
            },
            { adsReport: 1 },
        ).populate('adsReport.user', '_id fullName email');

        const adReports = ad[0].adsReport;
        return adReports;
    } catch (e) {
        throw e;
    }
}
