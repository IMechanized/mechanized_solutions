import ReviewModel from "../models/review.model"
const ObjectId = require('mongodb').ObjectID

// create a review service
export async function createReview(input: any) {
    try {
        const review = await ReviewModel.create(input)
        return review
    } catch (e) {
        throw e
    }
}

// get a review service
export async function getReview(id: string) {
    try {
        const review = await ReviewModel.findById(id)
            .populate('adItem', ['adTitle'])
            .lean(true)
        return review
    } catch (e) {
        throw e
    }
}


// find all reviews service
export async function findReviews(adId: any) {
    try {
        const reviews = await ReviewModel.find({ sellerId: ObjectId(adId) }).populate('user', ['fullName', 'avatar'])
        // find aveage ratingNumber
        const averageRatingCalc = reviews.reduce((acc, curr) => {
            return acc + curr.ratingNumber
        }, 0) / reviews.length

        const averageRating = averageRatingCalc?.toFixed(1)

        //total riview count
        const reviewCount = await ReviewModel.countDocuments({ sellerId: ObjectId(adId) })

        return { reviews, averageRating, reviewCount }


        // return reviews
    } catch (e) {
        throw e
    }
}


// update a review service
export async function updateReview(reviewID: string, update: any) {
    try {
        const review = await ReviewModel.findByIdAndUpdate(reviewID, update, {
            new: true,
        }).lean(true)
        return review
    } catch (e) {
        throw e
    }
}

// delete a review service
export async function deleteReview(reviewID: string) {
    try {
        const review = await ReviewModel.findByIdAndDelete(reviewID)
        return review
    } catch (e) {
        throw e
    }
}
