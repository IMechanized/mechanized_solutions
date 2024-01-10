import BookmarkModel from "../models/bookmark.model"

// create a bookmark service
export async function createBookmark(input: any) {
    try {
        // const bookmark = await BookmarkModel.create(input)
        // find bookmark by user id
        const bookmark = await BookmarkModel.findOne({
            user: input.user,
        })

        if (bookmark) {
            // update bookmarks by user id
            const bookmarkData = await BookmarkModel.findOneAndUpdate(
                {
                    user: input.user,
                },
                {
                    $push: {
                        bookmarks: input.bookmarks,
                    },
                },
                {
                    new: true,
                }
            )
            return bookmarkData
        } else {
            // create a new bookmark
            const bookmarkData = await BookmarkModel.create(input)
            return bookmarkData
        }
    } catch (e) {
        throw e
    }
}

// get a bookmark service
export async function getBookmarkByAds(query: any) {
    try {
        const bookmark = await BookmarkModel.find({
            user: query.user,
            $or: [
                {
                    'bookmarks.ads': query.bookmarkID,
                },
            ],
        })
        return bookmark
    } catch (e) {
        throw e
    }
}

// find all bookmarks service
export async function findBookmarks(query: any) {
    try {
        const bookmarks = await BookmarkModel.find({
            user: query,
        })
            .populate({
                path: 'bookmarks',
                populate: {
                    path: 'ads',
                    select: ['adTitle', 'slug', 'category', 'location', 'priceDetails', 'adGallery', 'status'],
                },
            })
        return bookmarks
    } catch (e) {
        throw e
    }
}

// delete a bookmark service
export async function deleteBookmark(query: any) {
    try {
        const bookmark = await BookmarkModel.updateMany({
            $pull: {
                bookmarks: {
                    $or: [
                        {
                            ads: query.bookmarkId,
                        },
                    ],
                },
            },
        })

        return bookmark
    } catch (e) {
        throw e
    }
}
