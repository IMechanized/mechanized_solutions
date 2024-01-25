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
exports.__esModule = true;
exports.findSellerReviewsHandler = exports.createSellerReviewHandller = exports.getSellerHandler = exports.searchSellerHandler = void 0;
var seller_service_1 = require("../service/seller.service");
// Search, filter and sort seller controller
var searchSellerHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sellers, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, seller_service_1.searchSeller)(req.query)];
            case 1:
                sellers = _a.sent();
                res.status(200).json({
                    message: 'Successfully found sellers',
                    data: sellers
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).send({
                    message: 'Server error',
                    error: e_1.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchSellerHandler = searchSellerHandler;
// get an seller by slug public controller
function getSellerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userName, sellerResult, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userName = req.params.userName;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, seller_service_1.getSeller)(userName)];
                case 2:
                    sellerResult = _a.sent();
                    if (!sellerResult.seller) {
                        return [2 /*return*/, res.status(201).send({
                                message: 'Seller Not Found'
                            })];
                    }
                    data = {
                        seller: sellerResult.seller,
                        sellerAds: sellerResult.sellerAds
                    };
                    return [2 /*return*/, res.status(200).send({
                            message: 'Seller Found',
                            data: data
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
exports.getSellerHandler = getSellerHandler;
// create a seller review controller
function createSellerReviewHandller(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, sellerID, updateInput, review, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = res.locals.user._id;
                    sellerID = req.body.sellerId;
                    updateInput = {
                        ratingNumber: req.body.ratingNumber,
                        review: req.body.review,
                        user: userID
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, seller_service_1.createSellerReview)(updateInput, sellerID)];
                case 2:
                    review = _a.sent();
                    return [2 /*return*/, res.status(201).send({
                            message: 'Review Created',
                            review: review
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
exports.createSellerReviewHandller = createSellerReviewHandller;
// find all reviews for a seller controller
function findSellerReviewsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var sellerID, reviews, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerID = req.params.sellerId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, seller_service_1.findSellerReviews)(sellerID)];
                case 2:
                    reviews = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all the reviews for this seller',
                        data: reviews
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findSellerReviewsHandler = findSellerReviewsHandler;
