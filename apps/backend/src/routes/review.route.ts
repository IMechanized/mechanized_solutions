import { Express, Request, Response } from 'express'
import { createReviewHandller, deleteReviewHandler, findReviewsHandler, getReviewHandler, updateReviewHandler } from '../controller/review.controller'
import requireUser from '../middlewares/requireUser'

function reviewRoute(app: Express) {
    // create a review
    app.post('/api/v1/user/review', requireUser, createReviewHandller)

    // get a review by id
    app.get('/api/v1/user/review/:reviewId', requireUser, getReviewHandler)

    // find all reviews for a seller
    app.get('/api/v1/user/seller/review/:sellerId', findReviewsHandler)

    //update a review by id
    app.put('/api/v1/user/review/:reviewId', requireUser, updateReviewHandler)

    // delete a review by id
    app.delete('/api/v1/user/review/:reviewId', requireUser, deleteReviewHandler)

}

export default reviewRoute