"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var seller_controller_1 = require("../controller/seller.controller");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
function sellerRoute(app) {
    // Search, filter and sort seller public api
    app.get('/api/v1/user/search/sellers', seller_controller_1.searchSellerHandler);
    //get a seller by slug public api
    app.get('/api/v1/user/seller/:userName', seller_controller_1.getSellerHandler);
    // create a seller review
    app.put('/api/v1/seller/review', requireUser_1["default"], seller_controller_1.createSellerReviewHandller);
    // find all reviews for a seller
    app.get('/api/v1/seller/review/:sellerId', seller_controller_1.findSellerReviewsHandler);
}
exports["default"] = sellerRoute;
