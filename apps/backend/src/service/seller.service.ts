import AdsModel from '../models/ads.model';
import UserModel from '../models/user.model';
const { ObjectID } = require('mongodb');

// Search, filter and sort seller service
export async function searchSeller(query: any) {
    const page = query.page;
    // const page = 0
    const limit = 9;
    // sortby
    const sortBy = query.sortby;
    const sellerQuery = {
        'role.isSeller': true,
    };
    let sortValue: any;
    if (query.sortBy === 'asc') {
        sortValue = -1;
    } else if (query.sortBy === 'des') {
        sortValue = 1;
    } else {
        sortValue = -1;
    }
    try {
        let qSellerTitle = null;
        let qSellerType = null;
        let qSellerRating = null;
        if (query.sellerTitle) {
            qSellerTitle = {
                $or: [
                    {
                        'fullName.firstName': {
                            $regex: query.sellerTitle,
                            $options: 'i',
                        },
                    },
                    {
                        'fullName.lastName': {
                            $regex: query.sellerTitle,
                            $options: 'i',
                        },
                    },
                ],
            };
        }
        if (query.sellerType === 'verified') {
            qSellerType = {
                isConfirmed: true,
            };
        }
        if (query.sellerType === 'non-verified') {
            qSellerType = {
                isConfirmed: false,
            };
        }
        //query if ratingDetails.averageRating  is less than sellerRating query.sellerRating
        if (query.sellerRating) {
            const ratingNumber = parseInt(query.sellerRating);
            qSellerRating = {
                'ratingDetails.averageRating': {
                    $gte: ratingNumber,
                },
            };
        }

        if (qSellerTitle || qSellerType || true) {
            let filterQuery: any = {
                ...sellerQuery,
                ...qSellerTitle,
                ...qSellerType,
                ...qSellerRating,
            };

            const seller = await UserModel.aggregate([
                {
                    $match: filterQuery,
                },
                {
                    $lookup: {
                        from: 'ads',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'ads',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        fullName: 1,
                        userName: 1,
                        avatar: 1,
                        email: 1,
                        phone: 1,
                        profileImage: 1,
                        isConfirmed: 1,
                        role: 1,
                        adsCount: {
                            $size: '$ads',
                        },
                        averageRating: {
                            $avg: '$sellerReviews.ratingNumber',
                        },
                    },
                },
                {
                    $sort: {
                        'ratingDetails.reviewCount': sortValue,
                    },
                },
                {
                    $skip: page * limit,
                },
                {
                    $limit: limit,
                },
            ]);

            const sellerCount = await UserModel.countDocuments(filterQuery);

            return { seller, sellerCount };
        } else {
        }
    } catch (e) {
        throw e;
    }
}

// get a seller by slug public public service
export async function getSeller(userName: string) {
    try {
        // const seller = await UserModel.findById(sellerID).lean(true)
        //get seller by username
        const seller = await UserModel.findOne({ userName: userName }).lean(
            true,
        );

        // const userQuery = { user: sellerID }
        const userQuery = { user: seller?._id };
        const adValidityQuery = {
            'status.isApproved': true,
            'status.isPublished': true,
            'status.isActive': true,
        };
        let filterQuery: any = {
            ...userQuery,
            ...adValidityQuery,
        };
        const sellerAds = await AdsModel.find(filterQuery);
        return { seller, sellerAds };
    } catch (e) {
        throw e;
    }
}

// create a seller review service
export async function createSellerReview(updateInput: any, sellerID: string) {
    try {
        // const review = await UserModel.findByIdAndUpdate(sellerID, updateInput, {
        //     new: true,
        // })
        // push the updateInput into sellerReviews in UserModel
        const review = await UserModel.findByIdAndUpdate(
            sellerID,
            {
                $push: {
                    sellerReviews: updateInput,
                },
            },
            {
                new: true,
            },
        );

        //update seller review details in UserModel
        const reviewsData = await UserModel.find(
            {
                _id: sellerID,
            },
            {
                sellerReviews: 1,
            },
        );
        const reviews = reviewsData[0].sellerReviews;

        //  find aveage ratingNumber
        const averageRatingCalc =
            reviews.reduce((acc, curr) => {
                return acc + curr.ratingNumber;
            }, 0) / reviews.length;
        const averageRating = averageRatingCalc.toFixed(1);

        //  reviews count
        const reviewCount = reviews.length;
        const updateRating = {
            ratingDetails: {
                averageRating: averageRating,
                reviewCount: reviewCount,
            },
        };
        const user = await UserModel.findByIdAndUpdate(
            { _id: sellerID },
            updateRating,
            {
                new: true,
            },
        );
        // { reviews, averageRating, reviewCount }

        return review;
    } catch (e) {
        throw e;
    }
}

// find all reviews service
export async function findSellerReviews(sellerId: any) {
    try {
        const reviewsData = await UserModel.find(
            {
                _id: sellerId,
            },
            {
                sellerReviews: 1,
            },
        ).populate('sellerReviews.user', 'fullName avatar');

        const reviews = reviewsData[0].sellerReviews;

        //  find aveage ratingNumber
        const averageRatingCalc =
            reviews.reduce((acc, curr) => {
                return acc + curr.ratingNumber;
            }, 0) / reviews.length;
        const averageRating = averageRatingCalc.toFixed(1);

        //  reviews count
        const reviewCount = reviews?.length;

        // return { reviews, averageRating, reviewCount }
        return { reviews, averageRating, reviewCount };
    } catch (e) {
        throw e;
    }
}
