import mongoose from "mongoose";
import { PackageDocument } from "./admin/package.model";
export interface UserDocument extends mongoose.Document {
    fullName: {
        firstName: string;
        lastName: string;
    };
    userName: string;
    email: string;
    password: string;
    isConfirmed: boolean;
    packageDetails: {
        packageId: PackageDocument['_id'];
        packageName: string;
    };
    ratingDetails: {
        averageRating: number;
        reviewCount: number;
    };
    sellerReviews: [
        {
            user: UserDocument['_id'];
            ratingNumber: number;
            review: string;
            isApproved: boolean;
        }
    ];
    resetLink: string;
    phoneNumber: string;
    avatar: string;
    cloudinary_id: string;
    role: {
        isBuyer: boolean;
        isSeller: boolean;
        isAdmin: boolean;
        isSuperAdmin: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface UpdateUserDocument extends mongoose.Document {
    sellerType: string;
    location: {
        state: string;
        city: string;
        street: string;
        zipCode: string;
    };
    aboutMe: string;
    accountType: string;
    socialLink: {
        linkedin: string;
        facebook: string;
        twitter: string;
        instagram: string;
    };
}
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>;
declare const UserModel: mongoose.Model<UserDocument, {}, {}, {}>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map