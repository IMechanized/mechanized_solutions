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
exports.findAdReportsHandler = exports.reportAdHandler = exports.deleteMultipleAdHandler = exports.deleteAdHandler = exports.findTotalCountHandler = exports.searchAdsHandler = exports.updateAdHandler = exports.findLatestAdsHandler = exports.findAdsHandler = exports.findPrivateAdsHandler = exports.getAdBySlugHandler = exports.getAdHandler = exports.createAdHandler = void 0;
var lodash_1 = __importDefault(require("lodash"));
var ads_service_1 = require("../service/ads.service");
var user_service_1 = require("../service/user.service");
var slug = require('slug');
// create ad controller
function createAdHandler(req, res) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var userId, hasPackage, isAdmin, isSuperAdmin, adminEntry, userWithPackage, input, _h, totalAds, validity, totalAdsCount, requestFiles, adGallery, adCoverImage, adVideo, inputFiles, adsSlug, getAdsInfo, ad, e_1;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    userId = res.locals.user._id;
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 7, , 8]);
                    hasPackage = (_b = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.packageDetails) === null || _b === void 0 ? void 0 : _b.packageId;
                    isAdmin = (_d = (_c = res.locals.user) === null || _c === void 0 ? void 0 : _c.role) === null || _d === void 0 ? void 0 : _d.isAdmin;
                    isSuperAdmin = (_f = (_e = res.locals.user) === null || _e === void 0 ? void 0 : _e.role) === null || _f === void 0 ? void 0 : _f.isSuperAdmin;
                    adminEntry = isAdmin || isSuperAdmin;
                    if (!hasPackage && !adminEntry) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Please update a package to create an ad'
                            })];
                    }
                    return [4 /*yield*/, (0, user_service_1.getUserWithPackage)(userId)];
                case 2:
                    userWithPackage = _j.sent();
                    input = {};
                    if (adminEntry) {
                        input = {
                            expireAt: new Date(new Date().setDate(new Date().getDate() + 365))
                        };
                    }
                    if (!!adminEntry) return [3 /*break*/, 4];
                    _h = (_g = userWithPackage === null || userWithPackage === void 0 ? void 0 : userWithPackage.packageDetails) === null || _g === void 0 ? void 0 : _g.packageId, totalAds = _h.totalAds, validity = _h.validity;
                    return [4 /*yield*/, (0, ads_service_1.findTotalAdsCount)(userId)];
                case 3:
                    totalAdsCount = _j.sent();
                    input = {
                        expireAt: new Date(new Date().setDate(new Date().getDate() + validity))
                    };
                    if (totalAdsCount >= totalAds) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Sorry, You have reached your ads limit'
                            })];
                    }
                    _j.label = 4;
                case 4:
                    requestFiles = req.files;
                    adGallery = [];
                    if (requestFiles.adGallery) {
                        adGallery = lodash_1["default"].map(requestFiles.adGallery, 'path');
                    }
                    adCoverImage = '';
                    if (requestFiles.adCoverImage) {
                        adCoverImage = requestFiles.adCoverImage[0].path;
                    }
                    adVideo = '';
                    if (requestFiles.adVideo) {
                        adVideo = requestFiles.adVideo[0].path;
                    }
                    inputFiles = {
                        adGallery: adGallery,
                        adCoverImage: adCoverImage,
                        adVideo: adVideo
                    };
                    adsSlug = slug(req.body.adTitle, { lower: true });
                    return [4 /*yield*/, (0, ads_service_1.getAdByQuery)({
                            slug: adsSlug
                        })];
                case 5:
                    getAdsInfo = _j.sent();
                    if (getAdsInfo) {
                        adsSlug = adsSlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    // add input with previous input
                    input = __assign({ user: userId, adTitle: req.body.adTitle, slug: adsSlug, category: req.body.category, location: req.body.location, tags: JSON.parse(req.body.tags), itemCondition: req.body.itemCondition, itemWarranty: req.body.itemWarranty, adType: req.body.adType, specifications: JSON.parse(req.body.specifications), description: req.body.description, priceDetails: JSON.parse(req.body.priceDetails), personalInfo: JSON.parse(req.body.personalInfo), specialNote: req.body.specialNote }, input);
                    return [4 /*yield*/, (0, ads_service_1.createAd)(input, inputFiles)];
                case 6:
                    ad = _j.sent();
                    console.log('ad', ad);
                    return [2 /*return*/, res.status(201).send({
                            message: 'New Ad Created'
                        })];
                case 7:
                    e_1 = _j.sent();
                    console.log('error', e_1);
                    res.status(400).json({
                        message: 'Invalid request',
                        error: e_1.message
                    });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createAdHandler = createAdHandler;
// get an ad controller by id
function getAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adID, ad, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adID = req.params.adId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.getAd)(adID)];
                case 2:
                    ad = _a.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found',
                                data: ad
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Found',
                            data: ad
                        })];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAdHandler = getAdHandler;
// get an ad by slug public controller
function getAdBySlugHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adSlug, ad, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adSlug = req.params.slug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.getAdBySlug)(adSlug)];
                case 2:
                    ad = _a.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found',
                                data: ad
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Found',
                            data: ad
                        })];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAdBySlugHandler = getAdBySlugHandler;
// find all private ads controller
function findPrivateAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, adminRole, superAdminRole, input, adsData_1, data_1, adsData, data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = res.locals.user._id;
                    adminRole = res.locals.user.role.isAdmin;
                    superAdminRole = res.locals.user.role.isSuperAdmin;
                    input = __assign({}, req.query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!(adminRole === true || superAdminRole === true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, ads_service_1.findAdminAds)(input)];
                case 2:
                    adsData_1 = _a.sent();
                    data_1 = {
                        ads: adsData_1 === null || adsData_1 === void 0 ? void 0 : adsData_1.ads,
                        adsCount: adsData_1 === null || adsData_1 === void 0 ? void 0 : adsData_1.totalAds
                    };
                    return [2 /*return*/, res.status(200).send({
                            message: 'Jobs Found',
                            data: data_1
                        })];
                case 3: return [4 /*yield*/, (0, ads_service_1.findPrivateAds)(userID, input)];
                case 4:
                    adsData = _a.sent();
                    data = {
                        ads: adsData === null || adsData === void 0 ? void 0 : adsData.ads,
                        adsCount: adsData === null || adsData === void 0 ? void 0 : adsData.totalAds
                    };
                    res.status(200).send({
                        message: 'Successfully found ads',
                        data: data
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_4.message
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.findPrivateAdsHandler = findPrivateAdsHandler;
// find all ads public controller
function findAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ads, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, ads_service_1.findAds)()];
                case 1:
                    ads = _a.sent();
                    if (ads.length === 0) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'No Ads Found',
                                data: ads
                            })];
                    }
                    res.status(200).send({
                        message: 'Successfully find all ads',
                        data: ads
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdsHandler = findAdsHandler;
//find latest ads public controller
function findLatestAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ads, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, ads_service_1.findLatestAds)()];
                case 1:
                    ads = _a.sent();
                    if (ads.length === 0) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'No Ads Found',
                                data: ads
                            })];
                    }
                    res.status(200).send({
                        message: 'Successfully find all latest ads',
                        data: ads
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findLatestAdsHandler = findLatestAdsHandler;
// update an ad controller
function updateAdHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var userId, adID, requestFiles, adGallery, adCoverImage, adVideo, inputFiles, adsSlug, getAdsInfo, input, ad, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.user._id;
                    adID = req.params.adId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    requestFiles = req.files;
                    adGallery = [];
                    if (requestFiles.adGallery) {
                        adGallery = lodash_1["default"].map(requestFiles.adGallery, 'path');
                    }
                    adCoverImage = '';
                    if (requestFiles.adCoverImage) {
                        adCoverImage = requestFiles.adCoverImage[0].path;
                    }
                    adVideo = '';
                    if (requestFiles.adVideo) {
                        adVideo = requestFiles.adVideo[0].path;
                    }
                    inputFiles = {
                        adGallery: adGallery,
                        adCoverImage: adCoverImage,
                        adVideo: adVideo,
                        oldGallery: req.body.oldGallery
                            ? JSON.parse(req.body.oldGallery)
                            : [],
                        oldAdCoverImage: req.body.oldAdCoverImage
                            ? req.body.oldAdCoverImage
                            : '',
                        oldAdVideo: req.body.oldAdVideo ? req.body.oldAdVideo : ''
                    };
                    adsSlug = slug(req.body.slug, { lower: true });
                    return [4 /*yield*/, (0, ads_service_1.getAdByQuery)({
                            slug: adsSlug
                        })];
                case 2:
                    getAdsInfo = _b.sent();
                    if (getAdsInfo) {
                        if (((_a = getAdsInfo === null || getAdsInfo === void 0 ? void 0 : getAdsInfo._id) === null || _a === void 0 ? void 0 : _a.toString()) == adID) {
                            adsSlug = slug(req.body.slug, { lower: true });
                        }
                        else {
                            adsSlug = adsSlug + '-' + Math.floor(100 + Math.random() * 900);
                        }
                    }
                    input = {
                        adTitle: req.body.adTitle,
                        slug: adsSlug,
                        category: req.body.category,
                        location: req.body.location,
                        tags: JSON.parse(req.body.tags),
                        itemCondition: req.body.itemCondition,
                        itemWarranty: req.body.itemWarranty,
                        adType: req.body.adType,
                        specifications: JSON.parse(req.body.specifications),
                        description: req.body.description,
                        priceDetails: JSON.parse(req.body.priceDetails),
                        personalInfo: JSON.parse(req.body.personalInfo),
                        specialNote: req.body.specialNote
                    };
                    return [4 /*yield*/, (0, ads_service_1.updateAd)(adID, input, inputFiles)];
                case 3:
                    ad = _b.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(201).send({
                            message: 'Ad Updated'
                        })];
                case 4:
                    e_7 = _b.sent();
                    console.log('error', e_7);
                    res.status(500).json({
                        message: 'Invalid request',
                        error: e_7.message
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateAdHandler = updateAdHandler;
//search and filter ads controller
function searchAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var input, adsResult, data, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = __assign({}, req.query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.searchAds)(input)];
                case 2:
                    adsResult = _a.sent();
                    data = {
                        ads: adsResult.ads,
                        totalAdsCount: adsResult.adsCount
                    };
                    res.status(200).send({
                        message: 'Successfully find all ads',
                        data: data
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.searchAdsHandler = searchAdsHandler;
//total count for ads, seller, user controller
function findTotalCountHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var totalCount, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, ads_service_1.findTotalCount)()];
                case 1:
                    totalCount = _a.sent();
                    res.status(200).send({
                        message: 'Successfully fetched total count',
                        data: totalCount
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_9 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_9.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findTotalCountHandler = findTotalCountHandler;
// delete an ad controller
function deleteAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adID, userID, ad, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adID = req.params.adId;
                    userID = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.deleteAd)(adID)];
                case 2:
                    ad = _a.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Deleted'
                        })];
                case 3:
                    e_10 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAdHandler = deleteAdHandler;
//delete ads by multiple ids controller
function deleteMultipleAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adIDs, inputAdIds, userID, ads, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adIDs = req.body.adIDs;
                    inputAdIds = adIDs.split(',');
                    userID = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.deleteMultipleAds)(inputAdIds)];
                case 2:
                    ads = _a.sent();
                    if (!ads) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Deleted'
                        })];
                case 3:
                    e_11 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleAdHandler = deleteMultipleAdHandler;
// report an ad controller
function reportAdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adID, userID, input, ad, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adID = req.params.adId;
                    userID = res.locals.user._id;
                    input = {
                        user: userID,
                        reason: req.body.reason
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.reportAd)(adID, input)];
                case 2:
                    ad = _a.sent();
                    if (!ad) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Reported'
                        })];
                case 3:
                    e_12 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.reportAdHandler = reportAdHandler;
// find reports of an ad controller
function findAdReportsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var adID, reports, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adID = req.params.adId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, ads_service_1.findAdReports)(adID)];
                case 2:
                    reports = _a.sent();
                    if (!reports) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Ad Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Reports Found',
                            data: reports
                        })];
                case 3:
                    e_13 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findAdReportsHandler = findAdReportsHandler;
