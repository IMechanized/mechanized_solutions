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
exports.deleteMultipleCategory = exports.deleteCategory = exports.changeCategoryStatus = exports.updateCategory = exports.findAdminCategory = exports.findCategory = exports.getCategoryBySlug = exports.getCategory = exports.createCategory = void 0;
var lodash_1 = __importDefault(require("lodash"));
var category_model_1 = __importDefault(require("../../models/admin/category.model"));
var ads_model_1 = __importDefault(require("../../models/ads.model"));
var cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
// create a category service
function createCategory(categoryData, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryInput, imageData, category, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    categoryInput = void 0;
                    if (!imagePath) return [3 /*break*/, 2];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imagePath)];
                case 1:
                    imageData = _a.sent();
                    categoryInput = __assign(__assign({}, categoryData), { avatar: imageData.secure_url, iconUrl: imageData.public_id });
                    return [3 /*break*/, 3];
                case 2:
                    categoryInput = __assign({}, categoryData);
                    _a.label = 3;
                case 3: return [4 /*yield*/, category_model_1["default"].create(categoryInput)];
                case 4:
                    category = _a.sent();
                    return [2 /*return*/, category];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw e_1.code;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createCategory = createCategory;
// get a category by id service
function getCategory(categoryID) {
    return __awaiter(this, void 0, void 0, function () {
        var category, adsCount, totalAds, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, category_model_1["default"].findById(categoryID).lean(true)];
                case 1:
                    category = _a.sent();
                    adsCount = lodash_1["default"].pick(category, ['categoryTitle']);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            category: adsCount.categoryTitle
                        }).count()];
                case 2:
                    totalAds = _a.sent();
                    result = __assign(__assign({}, category), { count: totalAds });
                    // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
                    return [2 /*return*/, result];
                case 3:
                    e_2 = _a.sent();
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getCategory = getCategory;
// get an category by slug service
function getCategoryBySlug(categorySlug) {
    return __awaiter(this, void 0, void 0, function () {
        var category, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_model_1["default"].findOne({
                            slug: categorySlug
                        }).lean(true)];
                case 1:
                    category = _a.sent();
                    result = {
                    // ...category,
                    // count: totalAds,
                    };
                    // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
                    // return result
                    return [2 /*return*/, category];
                case 2:
                    e_3 = _a.sent();
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCategoryBySlug = getCategoryBySlug;
// export async function getAdBySlug(slug: string) {
//     try {
//         const ad = await AdsModel.findOne({ slug }).lean(true)
//         return ad
//     } catch (e) {
//         throw e
//     }
// }
// find all categories public service
function findCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var categoryQuery, categories, categoryTitle, count_1, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    categoryQuery = {
                        'status.isActive': true
                    };
                    return [4 /*yield*/, category_model_1["default"].find(categoryQuery).lean(true)];
                case 1:
                    categories = _a.sent();
                    categoryTitle = lodash_1["default"].map(categories, 'categoryTitle');
                    return [4 /*yield*/, ads_model_1["default"].aggregate([
                            {
                                $group: {
                                    _id: '$category',
                                    count: { $sum: 1 }
                                }
                            },
                        ])];
                case 2:
                    count_1 = _a.sent();
                    result = categories.map(function (category) {
                        var categoryCount = count_1.find(function (count) { return count._id === category.categoryTitle; });
                        return __assign(__assign({}, category), { count: categoryCount ? categoryCount.count : 0 });
                    });
                    return [2 /*return*/, result];
                case 3:
                    e_4 = _a.sent();
                    throw e_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findCategory = findCategory;
// find all categories admin private  service
function findAdminCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, categoryTitle, count_2, result, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, category_model_1["default"].find().lean(true)];
                case 1:
                    categories = _a.sent();
                    categoryTitle = lodash_1["default"].map(categories, 'categoryTitle');
                    return [4 /*yield*/, ads_model_1["default"].aggregate([
                            {
                                $group: {
                                    _id: '$category',
                                    count: { $sum: 1 }
                                }
                            },
                        ])];
                case 2:
                    count_2 = _a.sent();
                    result = categories.map(function (category) {
                        var categoryCount = count_2.find(function (count) { return count._id === category.categoryTitle; });
                        return __assign(__assign({}, category), { count: categoryCount ? categoryCount.count : 0 });
                    });
                    return [2 /*return*/, result];
                case 3:
                    e_5 = _a.sent();
                    throw e_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminCategory = findAdminCategory;
// update a category service
function updateCategory(categoryID, update, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryUpdate, categoryPrevData, iconData, iconInput, category, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    categoryUpdate = null;
                    if (!imagePath) return [3 /*break*/, 5];
                    return [4 /*yield*/, category_model_1["default"].findById(categoryID)];
                case 1:
                    categoryPrevData = (_a.sent());
                    if (!categoryPrevData.iconUrl) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(categoryPrevData.iconUrl)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imagePath)];
                case 4:
                    iconData = _a.sent();
                    iconInput = {
                        avatar: iconData === null || iconData === void 0 ? void 0 : iconData.secure_url,
                        iconUrl: iconData === null || iconData === void 0 ? void 0 : iconData.public_id
                    };
                    categoryUpdate = __assign(__assign({}, update), iconInput);
                    return [3 /*break*/, 6];
                case 5:
                    categoryUpdate = __assign({}, update);
                    _a.label = 6;
                case 6: return [4 /*yield*/, category_model_1["default"].findByIdAndUpdate(categoryID, categoryUpdate, {
                        "new": true
                    })];
                case 7:
                    category = _a.sent();
                    return [2 /*return*/, category];
                case 8:
                    e_6 = _a.sent();
                    throw e_6;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.updateCategory = updateCategory;
// change a category status service
function changeCategoryStatus(categoryID) {
    return __awaiter(this, void 0, void 0, function () {
        var category, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, category_model_1["default"].findById(categoryID)];
                case 1:
                    category = _a.sent();
                    return [2 /*return*/, category];
                case 2:
                    e_7 = _a.sent();
                    throw e_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.changeCategoryStatus = changeCategoryStatus;
// delete a category service
function deleteCategory(categoryID) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryPrevData, category, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, category_model_1["default"].findById(categoryID)];
                case 1:
                    categoryPrevData = (_a.sent());
                    if (!(categoryPrevData === null || categoryPrevData === void 0 ? void 0 : categoryPrevData.iconUrl)) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(categoryPrevData.iconUrl)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, category_model_1["default"].findByIdAndDelete(categoryID)];
                case 4:
                    category = _a.sent();
                    return [2 /*return*/, category];
                case 5:
                    e_8 = _a.sent();
                    throw e_8;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCategory = deleteCategory;
// delete multiple category service
function deleteMultipleCategory(categoryIDs) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, categoryIDs_1, categoryID, categoryPrevData, category, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, categoryIDs_1 = categoryIDs;
                    _a.label = 1;
                case 1:
                    if (!(_i < categoryIDs_1.length)) return [3 /*break*/, 5];
                    categoryID = categoryIDs_1[_i];
                    return [4 /*yield*/, category_model_1["default"].findById(categoryID)];
                case 2:
                    categoryPrevData = (_a.sent());
                    if (!(categoryPrevData === null || categoryPrevData === void 0 ? void 0 : categoryPrevData.iconUrl)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(categoryPrevData.iconUrl)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, category_model_1["default"].deleteMany({
                        _id: { $in: categoryIDs }
                    })];
                case 6:
                    category = _a.sent();
                    return [2 /*return*/, category];
                case 7:
                    e_9 = _a.sent();
                    throw e_9;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleCategory = deleteMultipleCategory;
