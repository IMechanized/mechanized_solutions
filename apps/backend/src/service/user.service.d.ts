/// <reference types="mongoose/types/PipelineStage" />
import { FilterQuery } from "mongoose";
import { UserDocument } from "../models/user.model";
export declare function createUser(input: UserDocument): Promise<UserDocument & {
    _id: any;
}>;
export declare function confirmEmail(userId: string): Promise<(UserDocument & {
    _id: any;
}) | null>;
export declare function validatePassword({ email, password, }: {
    email: string;
    password: string;
}): Promise<false | import("mongoose").FlattenMaps<import("mongoose").LeanDocument<UserDocument & {
    _id: any;
}>>>;
export declare function getUser(query: FilterQuery<UserDocument>): Promise<import("mongoose").LeanDocument<UserDocument & {
    _id: any;
}> | null>;
export declare function getUserWithPackage(userId: FilterQuery<UserDocument>): Promise<import("mongoose").LeanDocument<UserDocument & {
    _id: any;
}> | null>;
export declare function updateUser(userId: string, update: object, imageData: string | undefined): Promise<(UserDocument & {
    _id: any;
}) | null>;
export declare function findUser(query: FilterQuery<UserDocument>): Promise<import("mongoose").LeanDocument<UserDocument & {
    _id: any;
}> | null>;
export declare function updatePassword(userId: string, input: {
    currentPassword?: string;
    newPassword: string;
}): Promise<(UserDocument & {
    _id: any;
}) | null>;
export declare function updateResetLink(userId: string, update: {
    resetLink: string;
}): Promise<(UserDocument & {
    _id: any;
}) | null>;
export declare function updateUserPackage(userId: string, update: object): Promise<(UserDocument & {
    _id: any;
}) | null>;
export declare function getDashboardStat(query: any): Promise<{
    adsCount: number;
    inactiveAdsCount: number;
    totalPublishedAdsCount: number;
    totalFeaturedAdsCount: number;
    featuredAdCount: number;
    totalSellerCount: number;
    totalBuyerCount: number;
    favouriteAdsCount: number;
    totalRatingCount: 1;
}>;
//# sourceMappingURL=user.service.d.ts.map