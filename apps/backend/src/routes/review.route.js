"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var review_controller_1 = require("../controller/review.controller");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
function reviewRoute(app) {
    // create a review
    app.post('/api/v1/user/review', requireUser_1["default"], review_controller_1.createReviewHandller);
    // get a review by id
    app.get('/api/v1/user/review/:reviewId', requireUser_1["default"], review_controller_1.getReviewHandler);
    // find all reviews for a seller
    app.get('/api/v1/user/seller/review/:sellerId', review_controller_1.findReviewsHandler);
    //update a review by id
    app.put('/api/v1/user/review/:reviewId', requireUser_1["default"], review_controller_1.updateReviewHandler);
    // delete a review by id
    app["delete"]('/api/v1/user/review/:reviewId', requireUser_1["default"], review_controller_1.deleteReviewHandler);
}
exports["default"] = reviewRoute;
