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
exports.findSellerReviews = exports.createSellerReview = exports.getSeller = exports.searchSeller = void 0;
var ads_model_1 = __importDefault(require("../models/ads.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var ObjectID = require('mongodb').ObjectID;
// Search, filter and sort seller service
function searchSeller(query) {
    return __awaiter(this, void 0, void 0, function () {
        var page, limit, sortBy, sellerQuery, sortValue, qSellerTitle, qSellerType, qSellerRating, ratingNumber, filterQuery, seller, sellerCount, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = query.page;
                    limit = 9;
                    sortBy = query.sortby;
                    sellerQuery = {
                        'role.isSeller': true
                    };
                    if (query.sortBy === 'asc') {
                        sortValue = -1;
                    }
                    else if (query.sortBy === 'des') {
                        sortValue = 1;
                    }
                    else {
                        sortValue = -1;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    qSellerTitle = null;
                    qSellerType = null;
                    qSellerRating = null;
                    if (query.sellerTitle) {
                        qSellerTitle = {
                            $or: [
                                {
                                    'fullName.firstName': {
                                        $regex: query.sellerTitle,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'fullName.lastName': {
                                        $regex: query.sellerTitle,
                                        $options: 'i'
                                    }
                                },
                            ]
                        };
                    }
                    if (query.sellerType === 'verified') {
                        qSellerType = {
                            isConfirmed: true
                        };
                    }
                    if (query.sellerType === 'non-verified') {
                        qSellerType = {
                            isConfirmed: false
                        };
                    }
                    //query if ratingDetails.averageRating  is less than sellerRating query.sellerRating
                    if (query.sellerRating) {
                        ratingNumber = parseInt(query.sellerRating);
                        qSellerRating = {
                            'ratingDetails.averageRating': {
                                $gte: ratingNumber
                            }
                        };
                    }
                    if (!(qSellerTitle || qSellerType || true)) return [3 /*break*/, 4];
                    filterQuery = __assign(__assign(__assign(__assign({}, sellerQuery), qSellerTitle), qSellerType), qSellerRating);
                    return [4 /*yield*/, user_model_1["default"].aggregate([
                            {
                                $match: filterQuery
                            },
                            {
                                $lookup: {
                                    from: 'ads',
                                    localField: '_id',
                                    foreignField: 'user',
                                    as: 'ads'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    fullName: 1,
                                    userName: 1,
                                    avatar: 1,
                                    email: 1,
                                    phone: 1,
                                    profileImage: 1,
                                    isConfirmed: 1,
                                    role: 1,
                                    adsCount: {
                                        $size: '$ads'
                                    },
                                    averageRating: {
                                        $avg: '$sellerReviews.ratingNumber'
                                    }
                                }
                            },
                            {
                                $sort: {
                                    'ratingDetails.reviewCount': sortValue
                                }
                            },
                            {
                                $skip: page * limit
                            },
                            {
                                $limit: limit
                            },
                        ])];
                case 2:
                    seller = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].countDocuments(filterQuery)];
                case 3:
                    sellerCount = _a.sent();
                    return [2 /*return*/, { seller: seller, sellerCount: sellerCount }];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    throw e_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.searchSeller = searchSeller;
// get a seller by slug public public service
function getSeller(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var seller, userQuery, adValidityQuery, filterQuery, sellerAds, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, user_model_1["default"].findOne({ userName: userName }).lean(true)];
                case 1:
                    seller = _a.sent();
                    userQuery = { user: seller === null || seller === void 0 ? void 0 : seller._id };
                    adValidityQuery = {
                        'status.isApproved': true,
                        'status.isPublished': true,
                        'status.isActive': true
                    };
                    filterQuery = __assign(__assign({}, userQuery), adValidityQuery);
                    return [4 /*yield*/, ads_model_1["default"].find(filterQuery)];
                case 2:
                    sellerAds = _a.sent();
                    return [2 /*return*/, { seller: seller, sellerAds: sellerAds }];
                case 3:
                    e_2 = _a.sent();
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getSeller = getSeller;
// create a seller review service
function createSellerReview(updateInput, sellerID) {
    return __awaiter(this, void 0, void 0, function () {
        var review, reviewsData, reviews, averageRatingCalc, averageRating, reviewCount, updateRating, user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate(sellerID, {
                            $push: {
                                sellerReviews: updateInput
                            }
                        }, {
                            "new": true
                        })];
                case 1:
                    review = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].find({
                            _id: sellerID
                        }, {
                            sellerReviews: 1
                        })];
                case 2:
                    reviewsData = _a.sent();
                    reviews = reviewsData[0].sellerReviews;
                    averageRatingCalc = reviews.reduce(function (acc, curr) {
                        return acc + curr.ratingNumber;
                    }, 0) / reviews.length;
                    averageRating = averageRatingCalc.toFixed(1);
                    reviewCount = reviews.length;
                    updateRating = {
                        ratingDetails: {
                            averageRating: averageRating,
                            reviewCount: reviewCount
                        }
                    };
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate({ _id: sellerID }, updateRating, {
                            "new": true
                        })];
                case 3:
                    user = _a.sent();
                    // { reviews, averageRating, reviewCount }
                    return [2 /*return*/, review];
                case 4:
                    e_3 = _a.sent();
                    throw e_3;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createSellerReview = createSellerReview;
// find all reviews service
function findSellerReviews(sellerId) {
    return __awaiter(this, void 0, void 0, function () {
        var reviewsData, reviews, averageRatingCalc, averageRating, reviewCount, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].find({
                            _id: sellerId
                        }, {
                            sellerReviews: 1
                        }).populate('sellerReviews.user', 'fullName avatar')];
                case 1:
                    reviewsData = _a.sent();
                    reviews = reviewsData[0].sellerReviews;
                    averageRatingCalc = reviews.reduce(function (acc, curr) {
                        return acc + curr.ratingNumber;
                    }, 0) / reviews.length;
                    averageRating = averageRatingCalc.toFixed(1);
                    reviewCount = reviews === null || reviews === void 0 ? void 0 : reviews.length;
                    // return { reviews, averageRating, reviewCount }
                    return [2 /*return*/, { reviews: reviews, averageRating: averageRating, reviewCount: reviewCount }];
                case 2:
                    e_4 = _a.sent();
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findSellerReviews = findSellerReviews;
