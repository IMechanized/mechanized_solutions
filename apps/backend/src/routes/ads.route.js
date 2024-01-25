"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ads_controller_1 = require("../controller/ads.controller");
var ads_validate_1 = require("../middlewares/ads.validate");
var requireUser_1 = __importStar(require("../middlewares/requireUser"));
var multer_1 = __importDefault(require("../utils/multer"));
var cors_1 = __importDefault(require("cors"));
function adsRoute(app) {
    app.use((0, cors_1["default"])({
        origin: '*'
    }));
    // create an ad
    app.post('/api/v1/user/ads', requireUser_1.requireSeller, multer_1["default"].fields([
        { name: 'adGallery', maxCount: 10 },
        {
            name: 'adCoverImage',
            maxCount: 1
        },
        {
            name: 'adVideo',
            maxCount: 1
        },
    ]), ads_validate_1.adsValidate, ads_controller_1.createAdHandler);
    // get an ad by id
    app.get('/api/v1/user/ads/:adId', ads_controller_1.getAdHandler);
    //get an ad by slug public api
    app.get('/api/v1/user/slug/ads/:slug', ads_controller_1.getAdBySlugHandler);
    // find all ads private  (based on user logged in)
    app.get('/api/v1/user/ads', requireUser_1["default"], ads_controller_1.findPrivateAdsHandler);
    // find all ads public
    app.get('/api/v1/ads', ads_controller_1.findAdsHandler);
    //find latest ads public
    app.get('/api/v1/ads/latest', ads_controller_1.findLatestAdsHandler);
    // update an ad by id
    app.put('/api/v1/user/ads/:adId', requireUser_1.requireSeller, multer_1["default"].fields([
        { name: 'adGallery', maxCount: 10 },
        {
            name: 'adCoverImage',
            maxCount: 1
        },
        {
            name: 'adVideo',
            maxCount: 1
        },
    ]), ads_controller_1.updateAdHandler);
    // Search and Filter ads public api
    app.get('/api/v1/user/search/ads', ads_controller_1.searchAdsHandler);
    //total count for ads, seller, user
    app.get('/api/v1/public/totalcount', ads_controller_1.findTotalCountHandler);
    // delete an ad by id
    app["delete"]('/api/v1/user/ads/:adId', requireUser_1["default"], ads_controller_1.deleteAdHandler);
    //delete ads by multiple ids
    app["delete"]('/api/v1/user/multiselect/ads', requireUser_1["default"], ads_controller_1.deleteMultipleAdHandler);
    // report an ad by id
    app.put('/api/v1/user/report/ads/:adId', requireUser_1["default"], ads_controller_1.reportAdHandler);
    // find reports of an ad by id
    app.get('/api/v1/user/report/ads/:adId', requireUser_1.requireAdmin, ads_controller_1.findAdReportsHandler);
}
exports["default"] = adsRoute;
