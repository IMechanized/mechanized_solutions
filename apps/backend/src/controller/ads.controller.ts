import { Request, Response } from 'express';
import _ from 'lodash';
import {
    createAd,
    deleteAd,
    deleteMultipleAds,
    findAdReports,
    findAdminAds,
    findAds,
    findLatestAds,
    findPrivateAds,
    findTotalAdsCount,
    findTotalCount,
    getAd,
    getAdByQuery,
    getAdBySlug,
    reportAd,
    searchAds,
    updateAd,
} from '../service/ads.service';
import { getUserWithPackage } from '../service/user.service';
var slug = require('slug');

// create ad controller
export async function createAdHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    try {
        const hasPackage = res.locals.user?.packageDetails?.packageId;
        const isAdmin = res.locals.user?.role?.isAdmin;
        const isSuperAdmin = res.locals.user?.role?.isSuperAdmin;
        const adminEntry = isAdmin || isSuperAdmin;

        if (!hasPackage && !adminEntry) {
            return res.status(400).json({
                message: 'Please update a package to create an ad',
            });
        }

        const userWithPackage = await getUserWithPackage(userId);

        let input = {};

        if (adminEntry) {
            input = {
                expireAt: new Date(
                    new Date().setDate(new Date().getDate() + 365),
                ),
            };
        }

        if (!adminEntry) {
            const { totalAds, validity } =
                userWithPackage?.packageDetails?.packageId;
            const totalAdsCount = await findTotalAdsCount(userId);

            input = {
                expireAt: new Date(
                    new Date().setDate(new Date().getDate() + validity),
                ),
            };

            if (totalAdsCount >= totalAds) {
                return res.status(400).json({
                    message: 'Sorry, You have reached your ads limit',
                });
            }
        }

        const requestFiles = req.files as any;
        let adGallery = [];
        if (requestFiles.adGallery) {
            adGallery = _.map(requestFiles.adGallery, 'path');
        }
        let adCoverImage = '';
        if (requestFiles.adCoverImage) {
            adCoverImage = requestFiles.adCoverImage[0].path;
        }

        let adVideo = '';
        if (requestFiles.adVideo) {
            adVideo = requestFiles.adVideo[0].path;
        }

        const inputFiles = {
            adGallery,
            adCoverImage,
            adVideo,
        };

        //Location slug
        let adsSlug = slug(req.body.adTitle, { lower: true });
        const getAdsInfo = await getAdByQuery({
            slug: adsSlug,
        });
        if (getAdsInfo) {
            adsSlug = adsSlug + '-' + Math.floor(100 + Math.random() * 900);
        }

        // add input with previous input
        input = {
            user: userId,
            adTitle: req.body.adTitle,
            slug: adsSlug,
            category: req.body.category,
            location: req.body.location,
            tags: JSON.parse(req.body.tags),
            itemCondition: req.body.itemCondition,
            itemWarranty: req.body.itemWarranty,
            adType: req.body.adType,
            specifications: JSON.parse(req.body.specifications),
            description: req.body.description,
            priceDetails: JSON.parse(req.body.priceDetails),
            personalInfo: JSON.parse(req.body.personalInfo),
            specialNote: req.body.specialNote,
            ...input,
        };

        // create an ad
        const ad = await createAd(input, inputFiles);
        console.log('ad', ad);
        return res.status(201).send({
            message: 'New Ad Created',
        });
    } catch (e: any) {
        console.log('error', e);
        res.status(400).json({
            message: 'Invalid request',
            error: e.message,
        });
    }
}

// get an ad controller by id
export async function getAdHandler(req: Request, res: Response) {
    const adID = req.params.adId;
    // get an ad
    try {
        const ad = await getAd(adID);

        if (!ad) {
            return res.status(201).send({
                message: 'Ad Not Found',
                data: ad,
            });
        }
        return res.status(200).send({
            message: 'Ad Found',
            data: ad,
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// get an ad by slug public controller
export async function getAdBySlugHandler(req: Request, res: Response) {
    const adSlug = req.params.slug;
    // get an ad
    try {
        const ad = await getAdBySlug(adSlug);
        if (!ad) {
            return res.status(201).send({
                message: 'Ad Not Found',
                data: ad,
            });
        }
        return res.status(200).send({
            message: 'Ad Found',
            data: ad,
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// find all private ads controller
export async function findPrivateAdsHandler(req: Request, res: Response) {
    const userID = res.locals.user._id;
    const adminRole = res.locals.user.role.isAdmin;
    const superAdminRole = res.locals.user.role.isSuperAdmin;
    const input = {
        ...req.query,
    };
    try {
        if (adminRole === true || superAdminRole === true) {
            const adsData = await findAdminAds(input);
            const data = {
                ads: adsData?.ads,
                adsCount: adsData?.totalAds,
            };
            return res.status(200).send({
                message: 'Jobs Found',
                data: data,
            });
        }
        const adsData = await findPrivateAds(userID, input);
        const data = {
            ads: adsData?.ads,
            adsCount: adsData?.totalAds,
        };
        res.status(200).send({
            message: 'Successfully found ads',
            data: data,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all ads public controller
export async function findAdsHandler(req: Request, res: Response) {
    try {
        const ads = await findAds();
        if (ads.length === 0) {
            return res.status(201).send({
                message: 'No Ads Found',
                data: ads,
            });
        }
        res.status(200).send({
            message: 'Successfully find all ads',
            data: ads,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

//find latest ads public controller
export async function findLatestAdsHandler(req: Request, res: Response) {
    try {
        const ads = await findLatestAds();
        if (ads.length === 0) {
            return res.status(201).send({
                message: 'No Ads Found',
                data: ads,
            });
        }
        res.status(200).send({
            message: 'Successfully find all latest ads',
            data: ads,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// update an ad controller
export async function updateAdHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const adID = req.params.adId;
    try {
        const requestFiles = req.files as any;

        let adGallery = [];
        if (requestFiles.adGallery) {
            adGallery = _.map(requestFiles.adGallery, 'path');
        }
        let adCoverImage = '';
        if (requestFiles.adCoverImage) {
            adCoverImage = requestFiles.adCoverImage[0].path;
        }

        let adVideo = '';
        if (requestFiles.adVideo) {
            adVideo = requestFiles.adVideo[0].path;
        }

        const inputFiles = {
            adGallery,
            adCoverImage,
            adVideo,
            oldGallery: req.body.oldGallery
                ? JSON.parse(req.body.oldGallery)
                : [],
            oldAdCoverImage: req.body.oldAdCoverImage
                ? req.body.oldAdCoverImage
                : '',
            oldAdVideo: req.body.oldAdVideo ? req.body.oldAdVideo : '',
        };

        //Location slug
        let adsSlug = slug(req.body.slug, { lower: true });
        const getAdsInfo = await getAdByQuery({
            slug: adsSlug,
        });

        if (getAdsInfo) {
            if (getAdsInfo?._id?.toString() == adID) {
                adsSlug = slug(req.body.slug, { lower: true });
            } else {
                adsSlug = adsSlug + '-' + Math.floor(100 + Math.random() * 900);
            }
        }

        const input = {
            adTitle: req.body.adTitle,
            slug: adsSlug,
            category: req.body.category,
            location: req.body.location,
            tags: JSON.parse(req.body.tags),
            itemCondition: req.body.itemCondition,
            itemWarranty: req.body.itemWarranty,
            adType: req.body.adType,
            specifications: JSON.parse(req.body.specifications),
            description: req.body.description,
            priceDetails: JSON.parse(req.body.priceDetails),
            personalInfo: JSON.parse(req.body.personalInfo),
            specialNote: req.body.specialNote,
        };

        // update an ad
        const ad = await updateAd(adID, input, inputFiles);
        if (!ad) {
            return res.status(201).send({
                message: 'Ad Not Found',
            });
        }
        return res.status(201).send({
            message: 'Ad Updated',
        });
    } catch (e: any) {
        console.log('error', e);
        res.status(500).json({
            message: 'Invalid request',
            error: e.message,
        });
    }
}

//search and filter ads controller
export async function searchAdsHandler(req: Request, res: Response) {
    const input = {
        ...req.query,
    };
    try {
        const adsResult = await searchAds(input);
        const data = {
            ads: adsResult.ads,
            totalAdsCount: adsResult.adsCount,
        };
        res.status(200).send({
            message: 'Successfully find all ads',
            data,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

//total count for ads, seller, user controller
export async function findTotalCountHandler(req: Request, res: Response) {
    try {
        const totalCount = await findTotalCount();
        res.status(200).send({
            message: 'Successfully fetched total count',
            data: totalCount,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete an ad controller
export async function deleteAdHandler(req: Request, res: Response) {
    const adID = req.params.adId;
    const userID = res.locals.user._id;
    // delete an ad
    try {
        const ad = await deleteAd(adID);

        if (!ad) {
            return res.status(201).send({
                message: 'Ad Not Found',
            });
        }
        return res.status(200).send({
            message: 'Ad Deleted',
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

//delete ads by multiple ids controller
export async function deleteMultipleAdHandler(req: Request, res: Response) {
    const adIDs = req.body.adIDs;
    const inputAdIds = adIDs.split(',');
    const userID = res.locals.user._id;

    try {
        const ads = await deleteMultipleAds(inputAdIds);

        if (!ads) {
            return res.status(201).send({
                message: 'Ad Not Found',
            });
        }
        return res.status(200).send({
            message: 'Ad Deleted',
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// report an ad controller
export async function reportAdHandler(req: Request, res: Response) {
    const adID = req.params.adId;
    const userID = res.locals.user._id;
    const input = {
        user: userID,
        reason: req.body.reason,
    };
    try {
        const ad = await reportAd(adID, input);
        if (!ad) {
            return res.status(201).send({
                message: 'Ad Not Found',
            });
        }
        return res.status(200).send({
            message: 'Ad Reported',
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// find reports of an ad controller
export async function findAdReportsHandler(req: Request, res: Response) {
    const adID = req.params.adId;
    try {
        const reports = await findAdReports(adID);
        if (!reports) {
            return res.status(201).send({
                message: 'Ad Not Found',
            });
        }
        return res.status(200).send({
            message: 'Reports Found',
            data: reports,
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}
