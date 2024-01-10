import { Request, Response } from 'express'
import { createBookmark, deleteBookmark, findBookmarks, getBookmarkByAds } from '../service/bookmark.service'

// create a bookmark controller
export async function createBookmarkHandller(req: Request, res: Response) {
    const userID = res.locals.user._id
    const input = {
        user: userID,
        bookmarks: {
            ...req.body,
        },
    }
    try {
        const bookmark = await createBookmark(input)
        return res.status(201).send({
            message: 'Bookmark Saved Successfully',
        })
    } catch (e) {
        return res.status(500).send({
            message: 'Server Error',
        })
    }
}

// get a bookmark by ads id controller
export async function getBookmarkByAdsHandler(req: Request, res: Response) {
    const bookmarkID = req.params.bookmarkId
    const userID = res.locals.user._id
    const query = {
        user: userID,
        bookmarkID,
    }

    try {
        const bookmark = await getBookmarkByAds(query)
        if (bookmark.length == 0) {
            const bookmarkData = {
                isBookmark: false,
            }
            return res.status(200).send({
                message: 'Bookmark not found',
                data: bookmarkData,
            })
        }
        const bookmarkData = {
            isBookmark: true,
        }
        return res.status(200).send({
            message: 'Bookmark status found',
            data: bookmarkData,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all bookmarks controller
export async function findBookmarksHandler(req: Request, res: Response) {
    const userID = res.locals.user._id
    try {
        const bookmarks = await findBookmarks(userID)
        if (bookmarks.length == 0) {
            return res.status(200).send({
                message: 'Bookmark not found',
                data: bookmarks,
            })
        }
        res.status(200).send({
            message: 'Successfully find all bookmarks',
            data: bookmarks[0].bookmarks,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// delete a bookmark controller
export async function deleteBookmarkHandler(req: Request, res: Response) {
    const bookmarID = req.params.bookmarkId
    const userId = res.locals.user._id

    const query = {
        user: userId,
        bookmarkId: bookmarID,
    }
    try {
        const bookmark = await deleteBookmark(query)
        if (!bookmark) {
            return res.status(404).send({
                message: 'Bookmark Not Found',
            })
        }
        return res.status(200).send({
            message: 'Bookmark Deleted',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

