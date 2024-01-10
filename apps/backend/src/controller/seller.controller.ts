import { Request, Response } from 'express';
import {
    createSellerReview,
    findSellerReviews,
    getSeller,
    searchSeller,
} from '../service/seller.service';

// Search, filter and sort seller controller
export const searchSellerHandler = async (req: Request, res: Response) => {
    try {
        const sellers = await searchSeller(req.query);
        res.status(200).json({
            message: 'Successfully found sellers',
            data: sellers,
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        });
    }
};

// get an seller by slug public controller
export async function getSellerHandler(req: Request, res: Response) {
    // const sellerID = req.params.sellerId
    const userName = req.params.userName;

    // get an ad
    try {
        // const sellerResult = await getSeller(sellerID)
        const sellerResult = await getSeller(userName);

        if (!sellerResult.seller) {
            return res.status(201).send({
                message: 'Seller Not Found',
            });
        }
        const data = {
            seller: sellerResult.seller,
            sellerAds: sellerResult.sellerAds,
        };
        return res.status(200).send({
            message: 'Seller Found',
            data,
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// create a seller review controller
export async function createSellerReviewHandller(req: Request, res: Response) {
    const userID = res.locals.user._id;
    const sellerID = req.body.sellerId;
    const updateInput = {
        ratingNumber: req.body.ratingNumber,
        review: req.body.review,
        user: userID,
    };
    try {
        const review = await createSellerReview(updateInput, sellerID);
        return res.status(201).send({
            message: 'Review Created',
            review,
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}

// find all reviews for a seller controller
export async function findSellerReviewsHandler(req: Request, res: Response) {
    const sellerID = req.params.sellerId;
    try {
        const reviews = await findSellerReviews(sellerID);
        res.status(200).send({
            message: 'Successfully find all the reviews for this seller',
            data: reviews,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
        });
    }
}
