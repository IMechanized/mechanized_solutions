import { Express, Request, Response } from "express";
import { createSellerReviewHandller, findSellerReviewsHandler, getSellerHandler, searchSellerHandler } from "../controller/seller.controller";
import requireUser from "../middlewares/requireUser";

function sellerRoute(app: Express) {

    // Search, filter and sort seller public api
    app.get('/api/v1/user/search/sellers', searchSellerHandler)

    //get a seller by slug public api
    app.get('/api/v1/user/seller/:userName', getSellerHandler)

    // create a seller review
    app.put('/api/v1/seller/review', requireUser, createSellerReviewHandller)

    // find all reviews for a seller
    app.get('/api/v1/seller/review/:sellerId', findSellerReviewsHandler)

}

export default sellerRoute;