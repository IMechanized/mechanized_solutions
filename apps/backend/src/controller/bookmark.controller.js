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
exports.__esModule = true;
exports.deleteBookmarkHandler = exports.findBookmarksHandler = exports.getBookmarkByAdsHandler = exports.createBookmarkHandller = void 0;
var bookmark_service_1 = require("../service/bookmark.service");
// create a bookmark controller
function createBookmarkHandller(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, input, bookmark, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = res.locals.user._id;
                    input = {
                        user: userID,
                        bookmarks: __assign({}, req.body)
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, bookmark_service_1.createBookmark)(input)];
                case 2:
                    bookmark = _a.sent();
                    return [2 /*return*/, res.status(201).send({
                            message: 'Bookmark Saved Successfully'
                        })];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createBookmarkHandller = createBookmarkHandller;
// get a bookmark by ads id controller
function getBookmarkByAdsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookmarkID, userID, query, bookmark, bookmarkData_1, bookmarkData, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookmarkID = req.params.bookmarkId;
                    userID = res.locals.user._id;
                    query = {
                        user: userID,
                        bookmarkID: bookmarkID
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, bookmark_service_1.getBookmarkByAds)(query)];
                case 2:
                    bookmark = _a.sent();
                    if (bookmark.length == 0) {
                        bookmarkData_1 = {
                            isBookmark: false
                        };
                        return [2 /*return*/, res.status(200).send({
                                message: 'Bookmark not found',
                                data: bookmarkData_1
                            })];
                    }
                    bookmarkData = {
                        isBookmark: true
                    };
                    return [2 /*return*/, res.status(200).send({
                            message: 'Bookmark status found',
                            data: bookmarkData
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
exports.getBookmarkByAdsHandler = getBookmarkByAdsHandler;
// find all bookmarks controller
function findBookmarksHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, bookmarks, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, bookmark_service_1.findBookmarks)(userID)];
                case 2:
                    bookmarks = _a.sent();
                    if (bookmarks.length == 0) {
                        return [2 /*return*/, res.status(200).send({
                                message: 'Bookmark not found',
                                data: bookmarks
                            })];
                    }
                    res.status(200).send({
                        message: 'Successfully find all bookmarks',
                        data: bookmarks[0].bookmarks
                    });
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
exports.findBookmarksHandler = findBookmarksHandler;
// delete a bookmark controller
function deleteBookmarkHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookmarID, userId, query, bookmark, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookmarID = req.params.bookmarkId;
                    userId = res.locals.user._id;
                    query = {
                        user: userId,
                        bookmarkId: bookmarID
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, bookmark_service_1.deleteBookmark)(query)];
                case 2:
                    bookmark = _a.sent();
                    if (!bookmark) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Bookmark Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Bookmark Deleted'
                        })];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_4.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteBookmarkHandler = deleteBookmarkHandler;
