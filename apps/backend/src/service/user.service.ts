import { FilterQuery } from "mongoose";
import config from 'config'
import bcrypt from 'bcrypt'
import cloudinary from "../utils/cloudinary";
import UserModel, { UserDocument } from "../models/user.model"
import AdsModel from "../models/ads.model";
import { findBookmarks } from "./bookmark.service";

// Create user service
export async function createUser(input: UserDocument) {
    try {
        const user = await UserModel.create(input)
        return user
    } catch (e: any) {
        throw e
    }
}

// Confirmation email link service
export async function confirmEmail(userId: string) {
    try {
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { isConfirmed: true },
            {
                new: true,
            }
        )
        return user
    } catch (e: any) {
        throw e
    }
}

// validate user passowrd service
export async function validatePassword({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }
    // compare passowrd
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    return user.toJSON()
}

// get user service
export async function getUser(query: FilterQuery<UserDocument>) {
    try {
        const user = await UserModel.findOne(query).lean(true).select('-password')
        return user
    } catch (e) {
        throw e
    }
}

// Get user with package service
export async function getUserWithPackage(userId: FilterQuery<UserDocument>) {
    const query = {
        _id: userId,
    }
    try {
        // populates package
        const user = await UserModel.findOne(
            query,
            // only retrive package
            { packageDetails: 1 }
        )
            .populate('packageDetails.packageId', ['validity', 'totalAds', 'featuredAds'])
            .lean(true)
        return user
    } catch (e) {
        throw e
    }
}

// update user service
export async function updateUser(userId: string, update: object, imageData: string | undefined) {
    try {
        let userUpdate = null
        if (imageData) {
            const userPreviousData = await UserModel.findOne({ _id: userId }) as UserDocument
            if (userPreviousData.cloudinary_id) {
                await cloudinary.uploader.destroy(userPreviousData.cloudinary_id)
            }
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(imageData)
            const imageInput = {
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
            }
            userUpdate = {
                ...update,
                ...imageInput,
            }
        } else {
            userUpdate = {
                ...update,
            }
        }

        const user = await UserModel.findByIdAndUpdate(userId, userUpdate, {
            new: true,
        })
        return user
    } catch (e: any) {
        throw e
    }
}

// find User if exist
export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}

// reset password service
export async function updatePassword(userId: string, input: { currentPassword?: string; newPassword: string }) {
    const inputPassword = input.newPassword
    try {
        const SALT_NUMBER = config.get<number>('saltWorkFactor')
        const salt = await bcrypt.genSalt(SALT_NUMBER)
        const hash = await bcrypt.hashSync(inputPassword, salt)
        const userPassword = await UserModel.findByIdAndUpdate(
            { _id: userId },
            { password: hash },
            { new: true }
        )
        return userPassword
    } catch (e: any) {
        throw e
    }
}

// update reset password token service
export async function updateResetLink(userId: string, update: { resetLink: string }) {
    try {
        const user = await UserModel.findByIdAndUpdate({ _id: userId }, update, {
            new: true,
        })
        return user
    } catch (e) {
        throw e
    }
}

// Update the user package service
export async function updateUserPackage(userId: string, update: object) {
    try {
        const user = await UserModel.findByIdAndUpdate({ _id: userId }, update, {
            new: true,
        })
        return user
    } catch (e) {
        throw e
    }
}

// get user dashboard statistics services
export async function getDashboardStat(query: any) {
    try {
        //total Published ads count for admin
        const totalPublishedAdsCount = await AdsModel.countDocuments({
            'status.isPublished': true,
        })

        // Ads count for Seller
        const adsCount = await AdsModel.countDocuments({
            ...query,
        })

        //Inactive ads count for Seller
        const inactiveAdsCount = await AdsModel.countDocuments({
            ...query,
            'status.isActive': true,
        })

        //total Featured ads count for admin
        const totalFeaturedAdsCount = await AdsModel.countDocuments({
            'status.isFeatured': true,
        })

        //Featured ads count for Seller
        const featuredAdCount = await AdsModel.countDocuments({
            ...query,
            'status.isFeatured': true,
        })

        //total Seller count for admin
        const totalSellerCount = await UserModel.countDocuments({
            'role.isSeller': true,
        })

        //total Buyer count for admin
        const totalBuyerCount = await UserModel.countDocuments({
            'role.isBuyer': true,
        })

        //favourite ads count for an user
        const userId = query?.user
        const favouriteAdsData = await findBookmarks(userId)
        const favouriteAdsCount = favouriteAdsData?.length

        //total Rating of an user
        const reviewsData = await UserModel.find({
            _id: userId,
        }, {
            sellerReviews: 1,
        }).populate('sellerReviews.user')

        const reviews = reviewsData[0].sellerReviews
        const totalRatingCount = reviews?.length

        return {
            adsCount,
            inactiveAdsCount,
            totalPublishedAdsCount,
            totalFeaturedAdsCount,
            featuredAdCount,
            totalSellerCount,
            totalBuyerCount,
            favouriteAdsCount,
            totalRatingCount
        }
    } catch (e) {
        throw e
    }
}