import { Request, Response } from 'express'
import { createReview, deleteReview, findReviews, getReview, updateReview } from '../service/review.service'


export async function createReviewHandller(req: Request, res: Response) {
    const userID = res.locals.user._id
    const input = {
        ...req.body,
        user: userID,
    }
    try {
        const review = await createReview(input)
        return res.status(201).send({
            message: 'Review Created',
            review,
        })
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        })
    }
}

// get a review handller
export async function getReviewHandler(req: Request, res: Response) {
    const reviewID = req.params.reviewId

    try {
        const review = await getReview(reviewID)
        if (!review) {
            return res.status(404).send({
                message: 'Review Not Found',
            })
        }
        return res.status(200).send({
            message: 'Review Found',
            review,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}


// find all reviews handller
export async function findReviewsHandler(req: Request, res: Response) {
    const sellerID = req.params.sellerId
    try {
        const reviews = await findReviews(sellerID)
        res.status(200).send({
            message: 'Successfully find all the reviews for this ad',
            data: reviews,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
        })
    }
}



// update a review handller
export async function updateReviewHandler(req: Request, res: Response) {
    const reviewID = req.params.reviewId
    const userID = res.locals.user._id
    const input = {
        ...req.body,
        user: userID,
    }
    // update a review
    try {
        const review = await updateReview(reviewID, input)

        if (!review) {
            return res.status(404).send({
                message: 'Review Not Found',
            })
        }
        return res.status(200).send({
            message: 'Review Updated',
            review
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// delete a review handller
export async function deleteReviewHandler(req: Request, res: Response) {
    const reviewID = req.params.reviewId
    // delete a review
    try {
        const review = await deleteReview(reviewID)

        if (!review) {
            return res.status(404).send({
                message: 'Review Not Found',
            })
        }
        return res.status(200).send({
            message: 'Review Deleted',
            review,
        })
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        })
    }
}
