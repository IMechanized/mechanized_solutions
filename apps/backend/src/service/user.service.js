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
exports.getDashboardStat = exports.updateUserPackage = exports.updateResetLink = exports.updatePassword = exports.findUser = exports.updateUser = exports.getUserWithPackage = exports.getUser = exports.validatePassword = exports.confirmEmail = exports.createUser = void 0;
var config_1 = __importDefault(require("config"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var cloudinary_1 = __importDefault(require("../utils/cloudinary"));
var user_model_1 = __importDefault(require("../models/user.model"));
var ads_model_1 = __importDefault(require("../models/ads.model"));
var bookmark_service_1 = require("./bookmark.service");
// Create user service
function createUser(input) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].create(input)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    e_1 = _a.sent();
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
// Confirmation email link service
function confirmEmail(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate({ _id: userId }, { isConfirmed: true }, {
                            "new": true
                        })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    e_2 = _a.sent();
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.confirmEmail = confirmEmail;
// validate user passowrd service
function validatePassword(_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
        var user, isValid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, user.comparePassword(password)];
                case 2:
                    isValid = _b.sent();
                    if (!isValid)
                        return [2 /*return*/, false];
                    return [2 /*return*/, user.toJSON()];
            }
        });
    });
}
exports.validatePassword = validatePassword;
// get user service
function getUser(query) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].findOne(query).lean(true).select('-password')];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    e_3 = _a.sent();
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
// Get user with package service
function getUserWithPackage(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        _id: userId
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_model_1["default"].findOne(query, 
                        // only retrive package
                        { packageDetails: 1 })
                            .populate('packageDetails.packageId', ['validity', 'totalAds', 'featuredAds'])
                            .lean(true)];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 3:
                    e_4 = _a.sent();
                    throw e_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserWithPackage = getUserWithPackage;
// update user service
function updateUser(userId, update, imageData) {
    return __awaiter(this, void 0, void 0, function () {
        var userUpdate, userPreviousData, result, imageInput, user, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    userUpdate = null;
                    if (!imageData) return [3 /*break*/, 5];
                    return [4 /*yield*/, user_model_1["default"].findOne({ _id: userId })];
                case 1:
                    userPreviousData = _a.sent();
                    if (!userPreviousData.cloudinary_id) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(userPreviousData.cloudinary_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imageData)];
                case 4:
                    result = _a.sent();
                    imageInput = {
                        avatar: result.secure_url,
                        cloudinary_id: result.public_id
                    };
                    userUpdate = __assign(__assign({}, update), imageInput);
                    return [3 /*break*/, 6];
                case 5:
                    userUpdate = __assign({}, update);
                    _a.label = 6;
                case 6: return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate(userId, userUpdate, {
                        "new": true
                    })];
                case 7:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 8:
                    e_5 = _a.sent();
                    throw e_5;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
// find User if exist
function findUser(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_model_1["default"].findOne(query).lean()];
        });
    });
}
exports.findUser = findUser;
// reset password service
function updatePassword(userId, input) {
    return __awaiter(this, void 0, void 0, function () {
        var inputPassword, SALT_NUMBER, salt, hash, userPassword, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputPassword = input.newPassword;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    SALT_NUMBER = config_1["default"].get('saltWorkFactor');
                    return [4 /*yield*/, bcrypt_1["default"].genSalt(SALT_NUMBER)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1["default"].hashSync(inputPassword, salt)];
                case 3:
                    hash = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate({ _id: userId }, { password: hash }, { "new": true })];
                case 4:
                    userPassword = _a.sent();
                    return [2 /*return*/, userPassword];
                case 5:
                    e_6 = _a.sent();
                    throw e_6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updatePassword = updatePassword;
// update reset password token service
function updateResetLink(userId, update) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate({ _id: userId }, update, {
                            "new": true
                        })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    e_7 = _a.sent();
                    throw e_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateResetLink = updateResetLink;
// Update the user package service
function updateUserPackage(userId, update) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1["default"].findByIdAndUpdate({ _id: userId }, update, {
                            "new": true
                        })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 2:
                    e_8 = _a.sent();
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserPackage = updateUserPackage;
// get user dashboard statistics services
function getDashboardStat(query) {
    return __awaiter(this, void 0, void 0, function () {
        var totalPublishedAdsCount, adsCount, inactiveAdsCount, totalFeaturedAdsCount, featuredAdCount, totalSellerCount, totalBuyerCount, userId, favouriteAdsData, favouriteAdsCount, reviewsData, reviews, totalRatingCount, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, ads_model_1["default"].countDocuments({
                            'status.isPublished': true
                        })
                        // Ads count for Seller
                    ];
                case 1:
                    totalPublishedAdsCount = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(__assign({}, query))
                        //Inactive ads count for Seller
                    ];
                case 2:
                    adsCount = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(__assign(__assign({}, query), { 'status.isActive': true }))
                        //total Featured ads count for admin
                    ];
                case 3:
                    inactiveAdsCount = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments({
                            'status.isFeatured': true
                        })
                        //Featured ads count for Seller
                    ];
                case 4:
                    totalFeaturedAdsCount = _a.sent();
                    return [4 /*yield*/, ads_model_1["default"].countDocuments(__assign(__assign({}, query), { 'status.isFeatured': true }))
                        //total Seller count for admin
                    ];
                case 5:
                    featuredAdCount = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].countDocuments({
                            'role.isSeller': true
                        })
                        //total Buyer count for admin
                    ];
                case 6:
                    totalSellerCount = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].countDocuments({
                            'role.isBuyer': true
                        })
                        //favourite ads count for an user
                    ];
                case 7:
                    totalBuyerCount = _a.sent();
                    userId = query === null || query === void 0 ? void 0 : query.user;
                    return [4 /*yield*/, (0, bookmark_service_1.findBookmarks)(userId)];
                case 8:
                    favouriteAdsData = _a.sent();
                    favouriteAdsCount = favouriteAdsData === null || favouriteAdsData === void 0 ? void 0 : favouriteAdsData.length;
                    return [4 /*yield*/, user_model_1["default"].find({
                            _id: userId
                        }, {
                            sellerReviews: 1
                        }).populate('sellerReviews.user')];
                case 9:
                    reviewsData = _a.sent();
                    reviews = reviewsData[0].sellerReviews;
                    totalRatingCount = reviews === null || reviews === void 0 ? void 0 : reviews.length;
                    return [2 /*return*/, {
                            adsCount: adsCount,
                            inactiveAdsCount: inactiveAdsCount,
                            totalPublishedAdsCount: totalPublishedAdsCount,
                            totalFeaturedAdsCount: totalFeaturedAdsCount,
                            featuredAdCount: featuredAdCount,
                            totalSellerCount: totalSellerCount,
                            totalBuyerCount: totalBuyerCount,
                            favouriteAdsCount: favouriteAdsCount,
                            totalRatingCount: totalRatingCount
                        }];
                case 10:
                    e_9 = _a.sent();
                    throw e_9;
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getDashboardStat = getDashboardStat;
