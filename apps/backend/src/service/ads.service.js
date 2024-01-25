"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.findAdReports = exports.reportAd = exports.deleteMultipleAds = exports.deleteAd = exports.searchAdByAlert = exports.findTotalCount = exports.searchAds = exports.updateAd = exports.findTotalAdsCount = exports.findTotalFeaturedAds = exports.findLatestAds = exports.findAds = exports.findPrivateAds = exports.findAdminAds = exports.getAdByQuery = exports.getAdBySlug = exports.getAd = exports.createAd = void 0;
var lodash_1 = __importDefault(require("lodash"));
var ads_model_1 = __importDefault(require("../models/ads.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var cloudinary_1 = __importDefault(require("../utils/cloudinary"));
// create an ad service
function createAd(input, inputFiles) {
    return __awaiter(this, void 0, void 0, function () {
        var adGalleryInput, adCoverImageInput, videoInput, _i, _a, image, imageData, result, videoData, adsTotalInput, ad, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    adGalleryInput = [];
                    adCoverImageInput = '';
                    videoInput = '';
                    if (!(inputFiles.adGallery.length > 0)) return [3 /*break*/, 4];
                    _i = 0, _a = inputFiles.adGallery;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    image = _a[_i];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(image)];
                case 2:
                    imageData = _b.sent();
                    adGalleryInput.push({
                        url: imageData === null || imageData === void 0 ? void 0 : imageData.secure_url,
                        public_id: imageData === null || imageData === void 0 ? void 0 : imageData.public_id
                    });
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!inputFiles.adCoverImage) return [3 /*break*/, 6];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(inputFiles.adCoverImage)];
                case 5:
                    result = _b.sent();
                    adCoverImageInput = result.secure_url;
                    _b.label = 6;
                case 6:
                    if (!inputFiles.adVideo) return [3 /*break*/, 8];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(inputFiles.adVideo, {
                            resource_type: 'video'
                        })];
                case 7:
                    videoData = _b.sent();
                    videoInput = videoData.secure_url;
                    _b.label = 8;
                case 8:
                    adsTotalInput = __assign(__assign({}, input), { adGallery: adGalleryInput, adCoverImage: adCoverImageInput, adVideo: videoInput });
                    return [4 /*yield*/, ads_model_1["default"].create(adsTotalInput)];
                case 9:
                    ad = _b.sent();
                    return [2 /*return*/, ad];
                case 10:
                    e_1 = _b.sent();
                    throw e_1;
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.createAd = createAd;
// get an ad by id service
function getAd(adID) {
    return __awaiter(this, void 0, void 0, function () {
        var ad, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].findById(adID).lean(true)];
                case 1:
                    ad = _a.sent();
                    return [2 /*return*/, ad];
                case 2:
                    e_2 = _a.sent();
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAd = getAd;
// get an ad by slug public service
function getAdBySlug(adsSlug) {
    return __awaiter(this, void 0, void 0, function () {
        var ad, adsCategory, relatedAds, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, ads_model_1["default"].findOne({
                            slug: adsSlug
                        })
                            .populate('user', '-password')
                            .lean(true)];
                case 1:
                    ad = _a.sent();
                    adsCategory = lodash_1["default"].pick(ad, ['category']);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            category: adsCategory.category,
                            slug: { $ne: adsSlug }
                        })
                            .limit(5)
                            .lean(true)];
                case 2:
                    relatedAds = _a.sent();
                    return [2 /*return*/, { ad: ad, relatedAds: relatedAds }];
                case 3:
                    e_3 = _a.sent();
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAdBySlug = getAdBySlug;
// get an ad by any query service
function getAdByQuery(query) {
    return __awaiter(this, void 0, void 0, function () {
        var ad, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].findOne(query).lean(true)];
                case 1:
                    ad = _a.sent();
                    return [2 /*return*/, ad];
                case 2:
                    e_4 = _a.sent();
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAdByQuery = getAdByQuery;
// find all admin ads service
function findAdminAds(query) {
    return __awaiter(this, void 0, void 0, function () {
        var page, limit, adsTypeQuery, qAdsTitle, qCategory, sortingQuery, filterQuery, ads, totalAds, defaultQuery, ads, totalAds, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = query.page;
                    limit = 9;
                    if (query.adsType === 'all') {
                        adsTypeQuery = {};
                    }
                    else if (query.adsType === 'featured') {
                        adsTypeQuery = {
                            'status.isFeatured': true
                        };
                    }
                    else if (query.adsType === 'rejected') {
                        adsTypeQuery = {
                            'status.isApproved': false
                        };
                    }
                    else if (query.adsType === 'inactive') {
                        adsTypeQuery = {
                            'status.isActive': false
                        };
                    }
                    else if (query.adsType === 'expired') {
                        adsTypeQuery = {
                            'status.isActive': false
                        };
                    }
                    else {
                        adsTypeQuery = {};
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    qAdsTitle = null;
                    qCategory = null;
                    if (query.adTitle) {
                        qAdsTitle = new RegExp(query.adTitle, 'i');
                    }
                    if (query.category) {
                        qCategory = new RegExp(query.category, 'i');
                    }
                    sortingQuery = {};
                    if (query.sortbyTitle) {
                        sortingQuery = {
                            adTitle: query.sortbyTitle === 'descending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyCategory) {
                        sortingQuery = {
                            category: query.sortbyCategory === 'descending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyStatus) {
                        sortingQuery = {
                            'status.isApproved': query.sortbyStatus === 'descending' ? 1 : -1
                        };
                    }
                    else if (query.sortbyFeatured) {
                        sortingQuery = {
                            'status.isFeatured': query.sortbyFeatured === 'ascending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyDate) {
                        sortingQuery = {
                            createdAt: query.sortbyDate === 'ascending' ? -1 : 1
                        };
                    }
                    else {
                        sortingQuery = {
                            createdAt: -1
                        };
                    }
                    if (!(qAdsTitle || qCategory)) return [3 /*break*/, 4];
                    filterQuery = __assign({}, adsTypeQuery);
                    if (qAdsTitle)
                        filterQuery.adTitle = { $in: qAdsTitle };
                    if (qCategory)
                        filterQuery.category = { $in: qCategory };
                    return [4 /*yield*/, ads_model_1["default"].find(filterQuery)
                            .sort(sortingQuery)
                            .skip(page * limit)
                            .limit(limit)];
                case 2:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(filterQuery)];
                case 3:
                    totalAds = _a.sent();
                    return [2 /*return*/, { ads: ads, totalAds: totalAds }];
                case 4:
                    defaultQuery = __assign({}, adsTypeQuery);
                    return [4 /*yield*/, ads_model_1["default"].find(defaultQuery)
                            .sort(sortingQuery)
                            .skip(page * limit)
                            .limit(limit)];
                case 5:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(defaultQuery)];
                case 6:
                    totalAds = _a.sent();
                    return [2 /*return*/, { ads: ads, totalAds: totalAds }];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_5 = _a.sent();
                    throw e_5;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminAds = findAdminAds;
// find all private ads service
function findPrivateAds(userID, query) {
    return __awaiter(this, void 0, void 0, function () {
        var page, limit, userQuery, adsTypeQuery, qAdsTitle, qCategory, sortingQuery, filterQuery, ads, totalAds, defaultQuery, ads, totalAds, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = query.page;
                    limit = 9;
                    userQuery = { user: userID };
                    if (query.adsType === 'all') {
                        adsTypeQuery = {};
                    }
                    else if (query.adsType === 'featured') {
                        adsTypeQuery = {
                            'status.isFeatured': true
                        };
                    }
                    else if (query.adsType === 'rejected') {
                        adsTypeQuery = {
                            'status.isApproved': false
                        };
                    }
                    else if (query.adsType === 'inactive') {
                        adsTypeQuery = {
                            'status.isActive': false
                        };
                    }
                    else if (query.adsType === 'expired') {
                        adsTypeQuery = {
                            'status.isActive': false
                        };
                    }
                    else {
                        adsTypeQuery = {};
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    qAdsTitle = null;
                    qCategory = null;
                    if (query.adTitle) {
                        qAdsTitle = new RegExp(query.adTitle, 'i');
                    }
                    if (query.category) {
                        qCategory = new RegExp(query.category, 'i');
                    }
                    sortingQuery = {};
                    if (query.sortbyTitle) {
                        sortingQuery = {
                            adTitle: query.sortbyTitle === 'descending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyCategory) {
                        sortingQuery = {
                            category: query.sortbyCategory === 'descending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyStatus) {
                        sortingQuery = {
                            'status.isApproved': query.sortbyStatus === 'descending' ? 1 : -1
                        };
                    }
                    else if (query.sortbyFeatured) {
                        sortingQuery = {
                            'status.isFeatured': query.sortbyFeatured === 'ascending' ? -1 : 1
                        };
                    }
                    else if (query.sortbyDate) {
                        sortingQuery = {
                            createdAt: query.sortbyDate === 'ascending' ? -1 : 1
                        };
                    }
                    else {
                        sortingQuery = {
                            createdAt: -1
                        };
                    }
                    if (!(qAdsTitle || qCategory)) return [3 /*break*/, 4];
                    filterQuery = __assign(__assign({}, userQuery), adsTypeQuery);
                    if (qAdsTitle)
                        filterQuery.adTitle = { $in: qAdsTitle };
                    if (qCategory)
                        filterQuery.category = { $in: qCategory };
                    return [4 /*yield*/, ads_model_1["default"].find(filterQuery)
                            .sort(sortingQuery)
                            .skip(page * limit)
                            .limit(limit)];
                case 2:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(filterQuery)];
                case 3:
                    totalAds = _a.sent();
                    return [2 /*return*/, { ads: ads, totalAds: totalAds }];
                case 4:
                    defaultQuery = __assign(__assign({}, userQuery), adsTypeQuery);
                    return [4 /*yield*/, ads_model_1["default"].find(defaultQuery)
                            .sort(sortingQuery)
                            .skip(page * limit)
                            .limit(limit)];
                case 5:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(defaultQuery)];
                case 6:
                    totalAds = _a.sent();
                    return [2 /*return*/, { ads: ads, totalAds: totalAds }];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_6 = _a.sent();
                    throw e_6;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.findPrivateAds = findPrivateAds;
// find all public ads service
function findAds() {
    return __awaiter(this, void 0, void 0, function () {
        var ads, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            'status.isApproved': true,
                            'status.isPublished': true,
                            'status.isActive': true
                        }).lean(true)];
                case 1:
                    ads = _a.sent();
                    return [2 /*return*/, ads];
                case 2:
                    e_7 = _a.sent();
                    throw e_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAds = findAds;
//find all public latest ads service
function findLatestAds() {
    return __awaiter(this, void 0, void 0, function () {
        var ads, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            'status.isApproved': true,
                            'status.isPublished': true,
                            'status.isActive': true
                        })
                            .sort({ createdAt: -1 })
                            .limit(8)
                            .lean(true)];
                case 1:
                    ads = _a.sent();
                    return [2 /*return*/, ads];
                case 2:
                    e_8 = _a.sent();
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findLatestAds = findLatestAds;
// find total featured ads count of an user service
function findTotalFeaturedAds(input) {
    return __awaiter(this, void 0, void 0, function () {
        var query, totalAds, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        user: input,
                        'status.isFeatured': true
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ads_model_1["default"].find(query).countDocuments()];
                case 2:
                    totalAds = _a.sent();
                    return [2 /*return*/, totalAds];
                case 3:
                    e_9 = _a.sent();
                    throw e_9;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findTotalFeaturedAds = findTotalFeaturedAds;
// find total created ads count  of an user service
function findTotalAdsCount(input) {
    return __awaiter(this, void 0, void 0, function () {
        var query, totalAds, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        user: input
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ads_model_1["default"].find(query).countDocuments()];
                case 2:
                    totalAds = _a.sent();
                    return [2 /*return*/, totalAds];
                case 3:
                    e_10 = _a.sent();
                    throw e_10;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findTotalAdsCount = findTotalAdsCount;
// update an ad service
function updateAd(adID, update, inputFiles) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adsTotalInput, adGalleryInput, adPrevData, _i, _b, image, _c, _d, image, imageData, adCoverImageInput, result, videoInput, videoData, ad, e_11;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 17, , 18]);
                    adsTotalInput = void 0;
                    if (!inputFiles) return [3 /*break*/, 14];
                    adGalleryInput = inputFiles.oldGallery;
                    if (!(((_a = inputFiles.adGallery) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ads_model_1["default"].findById(adID)];
                case 1:
                    adPrevData = (_e.sent());
                    if (!(adPrevData.adGallery.length > 0)) return [3 /*break*/, 5];
                    _i = 0, _b = adPrevData.adGallery;
                    _e.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    image = _b[_i];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(image.public_id)];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    adGalleryInput = [];
                    _c = 0, _d = inputFiles.adGallery;
                    _e.label = 6;
                case 6:
                    if (!(_c < _d.length)) return [3 /*break*/, 9];
                    image = _d[_c];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(image)];
                case 7:
                    imageData = _e.sent();
                    adGalleryInput.push({
                        url: imageData === null || imageData === void 0 ? void 0 : imageData.secure_url,
                        public_id: imageData === null || imageData === void 0 ? void 0 : imageData.public_id
                    });
                    _e.label = 8;
                case 8:
                    _c++;
                    return [3 /*break*/, 6];
                case 9:
                    adCoverImageInput = inputFiles.oldAdCoverImage !== 'null'
                        ? inputFiles.oldAdCoverImage
                        : '';
                    if (!(inputFiles === null || inputFiles === void 0 ? void 0 : inputFiles.adCoverImage)) return [3 /*break*/, 11];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(inputFiles.adCoverImage)];
                case 10:
                    result = _e.sent();
                    adCoverImageInput = result.secure_url;
                    _e.label = 11;
                case 11:
                    videoInput = inputFiles.oldAdVideo !== 'null' ? inputFiles.oldAdVideo : '';
                    if (!(inputFiles === null || inputFiles === void 0 ? void 0 : inputFiles.adVideo)) return [3 /*break*/, 13];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(inputFiles.adVideo, {
                            resource_type: 'video'
                        })];
                case 12:
                    videoData = _e.sent();
                    videoInput = videoData.secure_url;
                    _e.label = 13;
                case 13:
                    adsTotalInput = __assign(__assign({}, update), { adGallery: adGalleryInput, adCoverImage: adCoverImageInput, adVideo: videoInput });
                    return [3 /*break*/, 15];
                case 14:
                    // if oldAdCoverImage and oldAdVideo is null
                    adsTotalInput = __assign(__assign({}, update), { adCoverImage: inputFiles.oldAdCoverImage, adVideo: inputFiles.oldAdVideo, adGallery: inputFiles.oldGallery });
                    _e.label = 15;
                case 15: return [4 /*yield*/, ads_model_1["default"].findByIdAndUpdate(adID, adsTotalInput, {
                        "new": true
                    }).lean(true)];
                case 16:
                    ad = _e.sent();
                    return [2 /*return*/, ad];
                case 17:
                    e_11 = _e.sent();
                    throw e_11;
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.updateAd = updateAd;
//search and filter ads service
function searchAds(query) {
    return __awaiter(this, void 0, void 0, function () {
        var page, limit, statusQuery, featuredQuery, sortValue, sortValue, sortValue, qAdsTitle, qLocation, qCategory, qAdType, qAdWarranty, filterQuery, ads, adsCount, ads, adsCount, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = query.page;
                    limit = 12;
                    statusQuery = {
                        'status.isPublished': true,
                        'status.isApproved': true,
                        'status.isActive': true
                    };
                    if (query.sortby === 'featured') {
                        featuredQuery = {
                            'status.isFeatured': true
                        };
                    }
                    if (query.sortby === 'ascending') {
                        sortValue = 1.0;
                    }
                    else if (query.sortby === 'descending') {
                        sortValue = -1.0;
                    }
                    else {
                        sortValue = 1.0;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    qAdsTitle = null;
                    qLocation = null;
                    qCategory = null;
                    qAdType = null;
                    qAdWarranty = null;
                    if (query.adTitle) {
                        qAdsTitle = new RegExp(query.adTitle, 'i');
                    }
                    if (query.location) {
                        qLocation = new RegExp(query.location, 'i');
                    }
                    if (query.category) {
                        qCategory = new RegExp(query.category, 'i');
                    }
                    if (query.adType) {
                        qAdType = new RegExp(query.adType, 'i');
                    }
                    if (query.adWarranty) {
                        qAdWarranty = new RegExp(query.adWarranty, 'i');
                    }
                    if (!(query.adTitle ||
                        query.location ||
                        query.category ||
                        query.adType ||
                        query.adWarranty ||
                        query.sortby)) return [3 /*break*/, 4];
                    filterQuery = __assign(__assign({}, statusQuery), featuredQuery);
                    if (qAdsTitle)
                        filterQuery.adTitle = { $in: qAdsTitle };
                    if (qLocation)
                        filterQuery.location = { $in: qLocation };
                    if (qCategory)
                        filterQuery.category = { $in: qCategory };
                    if (qAdType)
                        filterQuery.adType = { $in: qAdType };
                    if (qAdWarranty)
                        filterQuery.itemWarranty = { $in: qAdWarranty };
                    return [4 /*yield*/, ads_model_1["default"].find(filterQuery)
                            //@ts-ignore
                            .sort({ 'priceDetails.price': sortValue, createdAt: -1 })
                            .skip(page * limit)
                            .limit(limit)
                            .lean(true)];
                case 2:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(filterQuery)];
                case 3:
                    adsCount = _a.sent();
                    return [2 /*return*/, { ads: ads, adsCount: adsCount }];
                case 4: return [4 /*yield*/, ads_model_1["default"].find(statusQuery)
                        .skip(page * limit)
                        .limit(limit)
                        .lean(true)
                        .sort({ createdAt: -1 })];
                case 5:
                    ads = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(statusQuery)];
                case 6:
                    adsCount = _a.sent();
                    return [2 /*return*/, { ads: ads, adsCount: adsCount }];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_12 = _a.sent();
                    throw e_12;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.searchAds = searchAds;
// total count for ads, seller, user service
function findTotalCount() {
    return __awaiter(this, void 0, void 0, function () {
        var totalAds, totalSellers, totalUser, total, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, ads_model_1["default"].countDocuments({
                            'status.isApproved': true,
                            'status.isPublished': true,
                            'status.isActive': true
                        })];
                case 1:
                    totalAds = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].countDocuments({
                            'role.isSeller': true
                        })];
                case 2:
                    totalSellers = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].countDocuments({})];
                case 3:
                    totalUser = _a.sent();
                    total = {
                        totalAds: totalAds,
                        totalSellers: totalSellers,
                        totalUser: totalUser
                    };
                    return [2 /*return*/, total];
                case 4:
                    e_13 = _a.sent();
                    throw e_13;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findTotalCount = findTotalCount;
// Alert Search ad service
function searchAdByAlert(query) {
    return __awaiter(this, void 0, void 0, function () {
        var statusQuery, qAdTitle, qLocation, qCategory, qTags, filterQuery, alertJobs, alertJobs, e_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    statusQuery = {
                        'status.isPublished': true,
                        'status.isApproved': true,
                        'status.isActive': true
                    };
                    qAdTitle = null;
                    qLocation = null;
                    qCategory = null;
                    qTags = null;
                    if (query.keyword) {
                        qAdTitle = new RegExp(query.keyword, 'i');
                    }
                    if (query.region) {
                        qLocation = new RegExp(query.locaion, 'i');
                    }
                    if (query.category) {
                        qCategory = new RegExp(query.category, 'i');
                    }
                    if (query.tags) {
                        qTags = query.tags;
                    }
                    if (!(qAdTitle || qLocation || qCategory || qTags)) return [3 /*break*/, 2];
                    filterQuery = __assign({}, statusQuery);
                    if (qAdTitle)
                        filterQuery.keyword = { $in: qAdTitle };
                    if (qLocation)
                        filterQuery.location = { $in: qLocation };
                    if (qCategory)
                        filterQuery.category = { $in: qCategory };
                    if (qTags)
                        filterQuery.tags = { $in: qTags };
                    return [4 /*yield*/, ads_model_1["default"].find(filterQuery)];
                case 1:
                    alertJobs = _a.sent();
                    return [2 /*return*/, alertJobs];
                case 2: return [4 /*yield*/, ads_model_1["default"].find(statusQuery).lean(true)];
                case 3:
                    alertJobs = _a.sent();
                    return [2 /*return*/, alertJobs];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_14 = _a.sent();
                    throw e_14;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.searchAdByAlert = searchAdByAlert;
// delete an ad service
function deleteAd(adID) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var adPrevData, _i, _b, image, ad, e_15;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, ads_model_1["default"].findById(adID)];
                case 1:
                    adPrevData = (_c.sent());
                    if (!(((_a = adPrevData === null || adPrevData === void 0 ? void 0 : adPrevData.adGallery) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 5];
                    _i = 0, _b = adPrevData.adGallery;
                    _c.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    image = _b[_i];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(image.public_id)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, ads_model_1["default"].findByIdAndDelete(adID)];
                case 6:
                    ad = _c.sent();
                    return [2 /*return*/, ad];
                case 7:
                    e_15 = _c.sent();
                    throw e_15;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAd = deleteAd;
//delete multiple ads service
function deleteMultipleAds(adIDs) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _i, adIDs_1, adID, adPrevData, _b, _c, image, ads, e_16;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 9, , 10]);
                    _i = 0, adIDs_1 = adIDs;
                    _d.label = 1;
                case 1:
                    if (!(_i < adIDs_1.length)) return [3 /*break*/, 7];
                    adID = adIDs_1[_i];
                    return [4 /*yield*/, ads_model_1["default"].findById(adID)];
                case 2:
                    adPrevData = (_d.sent());
                    if (!(((_a = adPrevData === null || adPrevData === void 0 ? void 0 : adPrevData.adGallery) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 6];
                    _b = 0, _c = adPrevData.adGallery;
                    _d.label = 3;
                case 3:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    image = _c[_b];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(image.public_id)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 3];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [4 /*yield*/, ads_model_1["default"].deleteMany({ _id: { $in: adIDs } })];
                case 8:
                    ads = _d.sent();
                    return [2 /*return*/, ads];
                case 9:
                    e_16 = _d.sent();
                    throw e_16;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleAds = deleteMultipleAds;
//report an ad service
function reportAd(adID, report) {
    return __awaiter(this, void 0, void 0, function () {
        var ad, e_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].findByIdAndUpdate(adID, {
                            $push: { adsReport: report }
                        })];
                case 1:
                    ad = _a.sent();
                    return [2 /*return*/, ad];
                case 2:
                    e_17 = _a.sent();
                    throw e_17;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.reportAd = reportAd;
// find reports of an ad service
function findAdReports(adID) {
    return __awaiter(this, void 0, void 0, function () {
        var ad, adReports, e_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            _id: adID
                        }, { adsReport: 1 }).populate('adsReport.user', '_id fullName email')];
                case 1:
                    ad = _a.sent();
                    adReports = ad[0].adsReport;
                    return [2 /*return*/, adReports];
                case 2:
                    e_18 = _a.sent();
                    throw e_18;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdReports = findAdReports;
