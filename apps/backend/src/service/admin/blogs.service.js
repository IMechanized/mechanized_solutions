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
exports.deleteMultipleBlogs = exports.deleteBlog = exports.changeBlogStatus = exports.updateBlog = exports.findAdminBlogs = exports.findBlogs = exports.getBlogBySlug = exports.getBlog = exports.createBlog = void 0;
var blogs_model_1 = __importDefault(require("../../models/admin/blogs.model"));
var cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
// create a blog service
function createBlog(blogData, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var blogInput, imageData, blog, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    blogInput = void 0;
                    if (!imagePath) return [3 /*break*/, 2];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imagePath)];
                case 1:
                    imageData = _a.sent();
                    blogInput = __assign(__assign({}, blogData), { avatar: imageData.secure_url, iconUrl: imageData.public_id });
                    return [3 /*break*/, 3];
                case 2:
                    blogInput = __assign({}, blogData);
                    _a.label = 3;
                case 3: return [4 /*yield*/, blogs_model_1["default"].create(blogInput)];
                case 4:
                    blog = _a.sent();
                    return [2 /*return*/, blog];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw e_1.code;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createBlog = createBlog;
// get a blog by id service
function getBlog(blogID) {
    return __awaiter(this, void 0, void 0, function () {
        var blog, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, blogs_model_1["default"].findById(blogID).lean(true)];
                case 1:
                    blog = _a.sent();
                    //find latest blog
                    // const latestBlog = await BlogModel.find({}).sort({
                    //     createdAt: -1
                    // }).limit(1);
                    // const result = {
                    //     blog,
                    //     latestBlog,
                    // };
                    return [2 /*return*/, blog];
                case 2:
                    e_2 = _a.sent();
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBlog = getBlog;
// get a blog by slug service
function getBlogBySlug(blogSlug) {
    return __awaiter(this, void 0, void 0, function () {
        var blog, latestBlog, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, blogs_model_1["default"].findOne({
                            slug: blogSlug
                        }).lean(true)];
                case 1:
                    blog = _a.sent();
                    return [4 /*yield*/, blogs_model_1["default"].find({ 'status.isActive': true })
                            .sort({
                            createdAt: -1
                        })
                            .limit(4)];
                case 2:
                    latestBlog = _a.sent();
                    result = {
                        blog: blog,
                        latestBlog: latestBlog
                    };
                    return [2 /*return*/, result];
                case 3:
                    e_3 = _a.sent();
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getBlogBySlug = getBlogBySlug;
// find all blogs public service
function findBlogs() {
    return __awaiter(this, void 0, void 0, function () {
        var blogyQuery, blogs, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    blogyQuery = {
                        'status.isActive': true
                    };
                    return [4 /*yield*/, blogs_model_1["default"].find(blogyQuery).lean(true)];
                case 1:
                    blogs = _a.sent();
                    return [2 /*return*/, blogs];
                case 2:
                    e_4 = _a.sent();
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findBlogs = findBlogs;
// find all blogs admin private  service
function findAdminBlogs() {
    return __awaiter(this, void 0, void 0, function () {
        var blogs, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, blogs_model_1["default"].find().lean(true)];
                case 1:
                    blogs = _a.sent();
                    return [2 /*return*/, blogs];
                case 2:
                    e_5 = _a.sent();
                    throw e_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminBlogs = findAdminBlogs;
// update a blog service
function updateBlog(blogID, update, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var blogUpdate, blogPrevData, iconData, iconInput, blog, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    blogUpdate = null;
                    if (!imagePath) return [3 /*break*/, 5];
                    return [4 /*yield*/, blogs_model_1["default"].findById(blogID)];
                case 1:
                    blogPrevData = (_a.sent());
                    if (!blogPrevData.iconUrl) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(blogPrevData.iconUrl)];
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
                    blogUpdate = __assign(__assign({}, update), iconInput);
                    return [3 /*break*/, 6];
                case 5:
                    blogUpdate = __assign({}, update);
                    _a.label = 6;
                case 6: return [4 /*yield*/, blogs_model_1["default"].findByIdAndUpdate(blogID, blogUpdate, {
                        "new": true
                    })];
                case 7:
                    blog = _a.sent();
                    return [2 /*return*/, blog];
                case 8:
                    e_6 = _a.sent();
                    throw e_6;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.updateBlog = updateBlog;
// change a blog status service
function changeBlogStatus(blogID) {
    return __awaiter(this, void 0, void 0, function () {
        var blog, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, blogs_model_1["default"].findById(blogID)];
                case 1:
                    blog = _a.sent();
                    return [2 /*return*/, blog];
                case 2:
                    e_7 = _a.sent();
                    throw e_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.changeBlogStatus = changeBlogStatus;
// delete a blog service
function deleteBlog(blogID) {
    return __awaiter(this, void 0, void 0, function () {
        var blogIDPrevData, blog, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, blogs_model_1["default"].findById(blogID)];
                case 1:
                    blogIDPrevData = (_a.sent());
                    if (!(blogIDPrevData === null || blogIDPrevData === void 0 ? void 0 : blogIDPrevData.iconUrl)) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(blogIDPrevData.iconUrl)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, blogs_model_1["default"].findByIdAndDelete(blogID)];
                case 4:
                    blog = _a.sent();
                    return [2 /*return*/, blog];
                case 5:
                    e_8 = _a.sent();
                    throw e_8;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBlog = deleteBlog;
// delete multiple blog service
function deleteMultipleBlogs(blogIDs) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, blogIDs_1, blogID, blogPrevData, blogs, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, blogIDs_1 = blogIDs;
                    _a.label = 1;
                case 1:
                    if (!(_i < blogIDs_1.length)) return [3 /*break*/, 5];
                    blogID = blogIDs_1[_i];
                    return [4 /*yield*/, blogs_model_1["default"].findById(blogID)];
                case 2:
                    blogPrevData = (_a.sent());
                    if (!(blogPrevData === null || blogPrevData === void 0 ? void 0 : blogPrevData.iconUrl)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(blogPrevData.iconUrl)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, blogs_model_1["default"].deleteMany({ _id: { $in: blogIDs } })];
                case 6:
                    blogs = _a.sent();
                    return [2 /*return*/, blogs];
                case 7:
                    e_9 = _a.sent();
                    throw e_9;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleBlogs = deleteMultipleBlogs;
