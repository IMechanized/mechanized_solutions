"use strict";
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
exports.adminAdsStatusUpdateHandler = exports.sellerMultipleAdsStatusHandler = exports.sellerAdsStatusUpdateHandler = void 0;
var ads_model_1 = __importDefault(require("../../models/ads.model"));
var ads_service_1 = require("../../service/ads.service");
var user_service_1 = require("../../service/user.service");
// seller ads status update controller
function sellerAdsStatusUpdateHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var adID, adStatus, userId, ad, _c, user, featuredAds, featuredAdsCount, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    adID = req.params.adId;
                    adStatus = req.body.status;
                    userId = res.locals.user._id;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, ads_model_1["default"].findById(adID).populate('user', ['email'])];
                case 2:
                    ad = _d.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    _c = adStatus;
                    switch (_c) {
                        case 'featured': return [3 /*break*/, 3];
                        case 'nonFeatured': return [3 /*break*/, 6];
                        case 'draft': return [3 /*break*/, 7];
                        case 'published': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, (0, user_service_1.getUserWithPackage)(userId)];
                case 4:
                    user = _d.sent();
                    // find the user total featured ads
                    if (!((_a = user === null || user === void 0 ? void 0 : user.packageDetails) === null || _a === void 0 ? void 0 : _a.packageId)) {
                        return [2 /*return*/, res.status(406).json({
                                message: "You don't have any membership package. Please buy a package to continue"
                            })];
                    }
                    featuredAds = ((_b = user === null || user === void 0 ? void 0 : user.packageDetails) === null || _b === void 0 ? void 0 : _b.packageId).featuredAds;
                    return [4 /*yield*/, (0, ads_service_1.findTotalFeaturedAds)(userId)];
                case 5:
                    featuredAdsCount = _d.sent();
                    if (featuredAdsCount >= featuredAds) {
                        return [2 /*return*/, res.status(406).json({
                                message: 'You have reached your job limit'
                            })];
                    }
                    ad.status.isFeatured = true;
                    ad.save();
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad is featured successfully'
                        })];
                case 6:
                    ad.status.isFeatured = false;
                    ad.save();
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad is non-featured'
                        })];
                case 7:
                    ad.status.isPublished = false;
                    ad.save();
                    return [2 /*return*/, res.status(200).send({
                            message: 'ad id drafted successfully'
                        })];
                case 8:
                    ad.status.isPublished = true;
                    ad.save();
                    return [2 /*return*/, res.status(200).send({
                            message: 'ad is published successfully'
                        })];
                case 9: return [2 /*return*/, res.status(400).send({
                        message: 'Invalid status'
                    })];
                case 10: return [3 /*break*/, 12];
                case 11:
                    e_1 = _d.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_1.message
                        })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.sellerAdsStatusUpdateHandler = sellerAdsStatusUpdateHandler;
// seller multiple-ads drafted controller
function sellerMultipleAdsStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adIDs, adsIdsInput, userId, ads, e_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adIDs = req.body.adIds;
                    adsIdsInput = adIDs.split(',');
                    console.log('adsIdsInput from multiple drafted', adsIdsInput);
                    userId = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            _id: {
                                $in: adsIdsInput
                            }
                        })];
                case 2:
                    ads = _a.sent();
                    if (!ads) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Ads Not Found'
                            })];
                    }
                    ads.forEach(function (ad) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            ad.status.isPublished = false;
                            ad.save();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ads are drafted successfully'
                        })];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_2.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sellerMultipleAdsStatusHandler = sellerMultipleAdsStatusHandler;
// admin ads status update controller
function adminAdsStatusUpdateHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adID, adStatus, userId, ad, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adID = req.params.adId;
                    adStatus = req.body.status;
                    userId = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ads_model_1["default"].findById(adID).populate('user', ['email'])];
                case 2:
                    ad = _a.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    switch (adStatus) {
                        case 'approved':
                            ad.status.isApproved = true;
                            ad.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Ad is approved successfully'
                                })];
                        case 'rejected':
                            ad.status.isApproved = false;
                            ad.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Ad is rejected by Admin'
                                })];
                        case 'expired':
                            ad.status.isActive = false;
                            ad.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Ad is expired successfully'
                                })];
                        case 'active':
                            ad.status.isActive = true;
                            ad.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Ad is activated successfully'
                                })];
                        default:
                            return [2 /*return*/, res.status(400).send({
                                    message: 'Invalid status'
                                })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_3.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.adminAdsStatusUpdateHandler = adminAdsStatusUpdateHandler;
