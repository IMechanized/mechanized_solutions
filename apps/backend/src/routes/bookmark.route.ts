import { Express, Request, Response } from 'express'
import { createBookmarkHandller, deleteBookmarkHandler, findBookmarksHandler, getBookmarkByAdsHandler } from '../controller/bookmark.controller'
import { validateBookmark } from '../middlewares/bookmark.validate'
import requireUser from '../middlewares/requireUser'

function bookmarkRoute(app: Express) {
    // create a bookmark
    app.post('/api/v1/user/bookmark',
        requireUser,
        validateBookmark,
        createBookmarkHandller)

    // get a bookmark by ads id
    app.get('/api/v1/user/bookmark/:bookmarkId', requireUser, getBookmarkByAdsHandler)

    // find all bookmarks
    app.get('/api/v1/user/bookmarks', requireUser, findBookmarksHandler)

    // delete a bookmark by id
    app.delete(
        '/api/v1/user/bookmark/:bookmarkId',
        requireUser,
        deleteBookmarkHandler
    )
}

export default bookmarkRoute
