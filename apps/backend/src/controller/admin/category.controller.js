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
exports.deleteMultipleCategoryHandler = exports.deleteCategoryHandler = exports.disableMultipleCategoryHandler = exports.changeCategoryStatusHandler = exports.updateCategoryHandler = exports.findAdminCategoryHandler = exports.findCategoryHandler = exports.getCategoryBySlugHandler = exports.getCategoryHandler = exports.createCategoryHandler = void 0;
var category_model_1 = __importDefault(require("../../models/admin/category.model"));
var category_service_1 = require("../../service/admin/category.service");
var slug = require('slug');
// create category handller
function createCategoryHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var categorySlug, getCategoryInfo, categoryData, imagePath, category, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    categorySlug = slug(req.body.categoryTitle, { lower: true });
                    return [4 /*yield*/, (0, category_service_1.getCategoryBySlug)(categorySlug)];
                case 1:
                    getCategoryInfo = _b.sent();
                    if (getCategoryInfo) {
                        categorySlug =
                            categorySlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    categoryData = {
                        categoryTitle: req.body.categoryTitle,
                        slug: categorySlug
                    };
                    imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                    return [4 /*yield*/, (0, category_service_1.createCategory)(categoryData, imagePath)];
                case 2:
                    category = _b.sent();
                    res.status(200).json({
                        message: "Category ".concat(category.categoryTitle, " created successfully")
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.log(e_1);
                    e_1 === 11000
                        ? res.status(400).json({
                            message: 'category already exist',
                            error: e_1
                        })
                        : res.status(500).send({
                            message: 'something went wrong',
                            error: e_1
                        });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createCategoryHandler = createCategoryHandler;
// get category handller by id
function getCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryID, category, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryID = req.params.categoryId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, category_service_1.getCategory)(categoryID)];
                case 2:
                    category = _a.sent();
                    if (!category) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Category Found',
                            data: category
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
exports.getCategoryHandler = getCategoryHandler;
// get category handller by slug
function getCategoryBySlugHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categorySlug, category, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categorySlug = req.params.categorySlug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, category_service_1.getCategoryBySlug)(categorySlug)];
                case 2:
                    category = _a.sent();
                    if (!category) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Category Found',
                            data: category
                        })];
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
exports.getCategoryBySlugHandler = getCategoryBySlugHandler;
// find all categories public handller
function findCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categories, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, category_service_1.findCategory)()];
                case 1:
                    categories = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all Categories',
                        data: categories
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_4.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findCategoryHandler = findCategoryHandler;
// find all categories admin private handller
function findAdminCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categories, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, category_service_1.findAdminCategory)()];
                case 1:
                    categories = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all Categories',
                        data: categories
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_5.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminCategoryHandler = findAdminCategoryHandler;
// update category handller
function updateCategoryHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var categoryID, categorySlug, getCategoryInfo, imagePath, categoryData, category, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    categoryID = req.params.categoryId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    categorySlug = slug(req.body.categoryTitle, { lower: true });
                    return [4 /*yield*/, (0, category_service_1.getCategoryBySlug)(categorySlug)];
                case 2:
                    getCategoryInfo = _b.sent();
                    if (getCategoryInfo) {
                        categorySlug =
                            categorySlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                    categoryData = {
                        categoryTitle: req.body.categoryTitle,
                        slug: categorySlug
                    };
                    return [4 /*yield*/, (0, category_service_1.updateCategory)(categoryID, categoryData, imagePath)];
                case 3:
                    category = _b.sent();
                    if (!category) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Category Updated'
                        })];
                case 4:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_6.message
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateCategoryHandler = updateCategoryHandler;
//  change a category status handller
function changeCategoryStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryID, categoryStatus, category, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryID = req.params.categoryId;
                    categoryStatus = req.body.status;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, category_service_1.changeCategoryStatus)(categoryID)];
                case 2:
                    category = (_a.sent());
                    switch (categoryStatus) {
                        case 'enbable':
                            category.status.isActive = true;
                            category.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Category is activated successfully'
                                })];
                        case 'disable':
                            category.status.isActive = false;
                            category.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Category is deactivated successfully'
                                })];
                        default:
                            return [2 /*return*/, res.status(400).send({
                                    message: 'Invalid status'
                                })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_7.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.changeCategoryStatusHandler = changeCategoryStatusHandler;
//  disable multiple category status handller
function disableMultipleCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryIDs, inputCategoryIds, categories, e_8;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryIDs = req.body.categoryIds;
                    inputCategoryIds = categoryIDs === null || categoryIDs === void 0 ? void 0 : categoryIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, category_model_1["default"].find({
                            _id: {
                                $in: inputCategoryIds
                            }
                        })];
                case 2:
                    categories = _a.sent();
                    if (!categories) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    categories.forEach(function (category) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            category.status.isActive = false;
                            category.save();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({
                            message: 'Categories are disabled successfully'
                        })];
                case 3:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_8.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.disableMultipleCategoryHandler = disableMultipleCategoryHandler;
// delete category handller
function deleteCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryID, category, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryID = req.params.categoryId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, category_service_1.deleteCategory)(categoryID)];
                case 2:
                    category = _a.sent();
                    if (!category) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Category Deleted'
                        })];
                case 3:
                    e_9 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_9.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCategoryHandler = deleteCategoryHandler;
// delete multiple  category handller
function deleteMultipleCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryIDs, inputCategoryIds, category, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryIDs = req.body.categoryIds;
                    inputCategoryIds = categoryIDs === null || categoryIDs === void 0 ? void 0 : categoryIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, category_service_1.deleteMultipleCategory)(inputCategoryIds)];
                case 2:
                    category = _a.sent();
                    if (!category) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Category Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Category Deleted'
                        })];
                case 3:
                    e_10 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_10.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleCategoryHandler = deleteMultipleCategoryHandler;
