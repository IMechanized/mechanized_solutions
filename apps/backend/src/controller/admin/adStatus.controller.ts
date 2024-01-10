import { Request, Response } from 'express';
import AdsModel from '../../models/ads.model';
import { findTotalFeaturedAds } from '../../service/ads.service';
import { getUserWithPackage } from '../../service/user.service';

// seller ads status update controller
export async function sellerAdsStatusUpdateHandler(
    req: Request,
    res: Response,
) {
    const adID = req.params.adId;
    const adStatus = req.body.status;
    const userId = res.locals.user._id;

    try {
        const ad = await AdsModel.findById(adID).populate('user', ['email']);
        if (!ad) {
            return res.status(404).send({
                message: 'Ad Not Found',
            });
        }

        switch (adStatus) {
            case 'featured':
                const user = await getUserWithPackage(userId);
                // find the user total featured ads
                if (!user?.packageDetails?.packageId) {
                    return res.status(406).json({
                        message:
                            "You don't have any membership package. Please buy a package to continue",
                    });
                }
                const { featuredAds } = user?.packageDetails?.packageId;
                const featuredAdsCount = await findTotalFeaturedAds(userId);
                if (featuredAdsCount >= featuredAds) {
                    return res.status(406).json({
                        message: 'You have reached your job limit',
                    });
                }

                ad.status.isFeatured = true;
                ad.save();

                return res.status(200).send({
                    message: 'Ad is featured successfully',
                });
            case 'nonFeatured':
                ad.status.isFeatured = false;
                ad.save();

                return res.status(200).send({
                    message: 'Ad is non-featured',
                });
            case 'draft':
                ad.status.isPublished = false;
                ad.save();

                return res.status(200).send({
                    message: 'ad id drafted successfully',
                });
            case 'published':
                ad.status.isPublished = true;
                ad.save();

                return res.status(200).send({
                    message: 'ad is published successfully',
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

// seller multiple-ads drafted controller
export async function sellerMultipleAdsStatusHandler(
    req: Request,
    res: Response,
) {
    const adIDs = req.body.adIds;
    const adsIdsInput = adIDs.split(',');
    console.log('adsIdsInput from multiple drafted', adsIdsInput);
    const userId = res.locals.user._id;

    try {
        const ads = await AdsModel.find({
            _id: {
                $in: adsIdsInput,
            },
        });
        if (!ads) {
            return res.status(404).send({
                message: 'Ads Not Found',
            });
        }

        ads.forEach(async (ad: any) => {
            ad.status.isPublished = false;
            ad.save();
        });

        return res.status(200).send({
            message: 'Ads are drafted successfully',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// admin ads status update controller
export async function adminAdsStatusUpdateHandler(req: Request, res: Response) {
    const adID = req.params.adId;
    const adStatus = req.body.status;
    const userId = res.locals.user._id;

    try {
        const ad = await AdsModel.findById(adID).populate('user', ['email']);
        if (!ad) {
            return res.status(404).send({
                message: 'Ad Not Found',
            });
        }

        switch (adStatus) {
            case 'approved':
                ad.status.isApproved = true;
                ad.save();

                return res.status(200).send({
                    message: 'Ad is approved successfully',
                });
            case 'rejected':
                ad.status.isApproved = false;
                ad.save();

                return res.status(200).send({
                    message: 'Ad is rejected by Admin',
                });
            case 'expired':
                ad.status.isActive = false;
                ad.save();
                return res.status(200).send({
                    message: 'Ad is expired successfully',
                });
            case 'active':
                ad.status.isActive = true;
                ad.save();

                return res.status(200).send({
                    message: 'Ad is activated successfully',
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
