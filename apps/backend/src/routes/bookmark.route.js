"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bookmark_controller_1 = require("../controller/bookmark.controller");
var bookmark_validate_1 = require("../middlewares/bookmark.validate");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
function bookmarkRoute(app) {
    // create a bookmark
    app.post('/api/v1/user/bookmark', requireUser_1["default"], bookmark_validate_1.validateBookmark, bookmark_controller_1.createBookmarkHandller);
    // get a bookmark by ads id
    app.get('/api/v1/user/bookmark/:bookmarkId', requireUser_1["default"], bookmark_controller_1.getBookmarkByAdsHandler);
    // find all bookmarks
    app.get('/api/v1/user/bookmarks', requireUser_1["default"], bookmark_controller_1.findBookmarksHandler);
    // delete a bookmark by id
    app["delete"]('/api/v1/user/bookmark/:bookmarkId', requireUser_1["default"], bookmark_controller_1.deleteBookmarkHandler);
}
exports["default"] = bookmarkRoute;
