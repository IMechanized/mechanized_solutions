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
exports.deleteMultipleBlogHandler = exports.deleteBlogHandler = exports.disableMultipleBlogHandler = exports.changeBlogStatusHandler = exports.updateBlogHandler = exports.findAdminBlogsHandler = exports.findBlogHandler = exports.getBlogBySlugHandler = exports.getBlogHandler = exports.createBlogHandler = void 0;
var blogs_model_1 = __importDefault(require("../../models/admin/blogs.model"));
var blogs_service_1 = require("../../service/admin/blogs.service");
var slug = require('slug');
// create blog handller
function createBlogHandler(req, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var blogSlug, getBlogInfo, blogData, imagePath, blog, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    blogSlug = slug(req.body.blogTitle, { lower: true });
                    return [4 /*yield*/, (0, blogs_service_1.getBlogBySlug)(blogSlug)];
                case 1:
                    getBlogInfo = _e.sent();
                    if (getBlogInfo) {
                        blogSlug = blogSlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    blogData = {
                        blogTitle: (_a = req.body) === null || _a === void 0 ? void 0 : _a.blogTitle,
                        slug: blogSlug,
                        description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.description,
                        tags: JSON.parse((_c = req.body) === null || _c === void 0 ? void 0 : _c.tags)
                    };
                    imagePath = (_d = req.file) === null || _d === void 0 ? void 0 : _d.path;
                    return [4 /*yield*/, (0, blogs_service_1.createBlog)(blogData, imagePath)];
                case 2:
                    blog = _e.sent();
                    res.status(200).json({
                        message: "New Blog Created Successfully"
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _e.sent();
                    console.log(e_1);
                    e_1 === 11000
                        ? res.status(400).json({
                            message: 'Blog already exist',
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
exports.createBlogHandler = createBlogHandler;
// get blog handller by id
function getBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogID, blog, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogID = req.params.blogId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, blogs_service_1.getBlog)(blogID)];
                case 2:
                    blog = _a.sent();
                    if (!blog) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog Found',
                            data: blog
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
exports.getBlogHandler = getBlogHandler;
// get blog handller by slug
function getBlogBySlugHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogSlug, blog, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogSlug = req.params.blogSlug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, blogs_service_1.getBlogBySlug)(blogSlug)];
                case 2:
                    blog = _a.sent();
                    if (!blog) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog Found',
                            data: blog
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
exports.getBlogBySlugHandler = getBlogBySlugHandler;
// find all blogs public handller
function findBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogs, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, blogs_service_1.findBlogs)()];
                case 1:
                    blogs = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all Blogs',
                        data: blogs
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
exports.findBlogHandler = findBlogHandler;
// find all blogs admin private handller
function findAdminBlogsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogs, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, blogs_service_1.findAdminBlogs)()];
                case 1:
                    blogs = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all Blogs',
                        data: blogs
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
exports.findAdminBlogsHandler = findAdminBlogsHandler;
// update blog handller
function updateBlogHandler(req, res) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var blogID, blogSlug, getBlogInfo, imagePath, blogData, blog, e_6;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    blogID = req.params.blogId;
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 4, , 5]);
                    blogSlug = slug(req.body.blogTitle, { lower: true });
                    return [4 /*yield*/, (0, blogs_service_1.getBlogBySlug)(blogSlug)];
                case 2:
                    getBlogInfo = (_f.sent());
                    if (getBlogInfo) {
                        if (((_a = getBlogInfo === null || getBlogInfo === void 0 ? void 0 : getBlogInfo._id) === null || _a === void 0 ? void 0 : _a.toString()) == blogID) {
                            blogSlug = slug(req.body.blogTitle, { lower: true });
                        }
                        else {
                            blogSlug =
                                blogSlug + '-' + Math.floor(100 + Math.random() * 900);
                        }
                    }
                    imagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                    blogData = {
                        blogTitle: (_c = req.body) === null || _c === void 0 ? void 0 : _c.blogTitle,
                        slug: blogSlug,
                        description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                        tags: JSON.parse((_e = req.body) === null || _e === void 0 ? void 0 : _e.tags)
                    };
                    return [4 /*yield*/, (0, blogs_service_1.updateBlog)(blogID, blogData, imagePath)];
                case 3:
                    blog = _f.sent();
                    if (!blog) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog Updated'
                        })];
                case 4:
                    e_6 = _f.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_6.message
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateBlogHandler = updateBlogHandler;
//  change a blog status handller
function changeBlogStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogID, blogStatus, blog, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogID = req.params.blogId;
                    blogStatus = req.body.status;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, blogs_service_1.changeBlogStatus)(blogID)];
                case 2:
                    blog = (_a.sent());
                    switch (blogStatus) {
                        case 'enbable':
                            blog.status.isActive = true;
                            blog.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Blog is activated successfully'
                                })];
                        case 'disable':
                            blog.status.isActive = false;
                            blog.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Blog is deactivated successfully'
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
exports.changeBlogStatusHandler = changeBlogStatusHandler;
//  disable multiple blogs status handller
function disableMultipleBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogIDs, inputblogIDs, blogs, e_8;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogIDs = req.body.blogIds;
                    inputblogIDs = blogIDs === null || blogIDs === void 0 ? void 0 : blogIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blogs_model_1["default"].find({
                            _id: {
                                $in: inputblogIDs
                            }
                        })];
                case 2:
                    blogs = _a.sent();
                    if (!blogs) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    blogs.forEach(function (blog) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            blog.status.isActive = false;
                            blog.save();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog are disabled successfully'
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
exports.disableMultipleBlogHandler = disableMultipleBlogHandler;
// delete blog handller
function deleteBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogID, blog, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogID = req.params.blogId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, blogs_service_1.deleteBlog)(blogID)];
                case 2:
                    blog = _a.sent();
                    if (!blog) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog Deleted'
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
exports.deleteBlogHandler = deleteBlogHandler;
// delete multiple  blogs handller
function deleteMultipleBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogIDs, inputBlogIds, blog, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogIDs = req.body.blogIds;
                    inputBlogIds = blogIDs === null || blogIDs === void 0 ? void 0 : blogIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, blogs_service_1.deleteMultipleBlogs)(inputBlogIds)];
                case 2:
                    blog = _a.sent();
                    if (!blog) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Blog Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Blog Deleted'
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
exports.deleteMultipleBlogHandler = deleteMultipleBlogHandler;
