import mongoose from 'mongoose';
import { UserDocument } from './user.model';
export interface AdsDocument extends mongoose.Document {
    user: UserDocument['_id'];
    status: {
        isApproved: boolean;
        isPublished: boolean;
        isFeatured: boolean;
        isActive: boolean;
    };
    adTitle: string;
    slug: string;
    category: string;
    location: string;
    tags: [string];
    itemCondition: string;
    itemWarranty: string;
    adType: string;
    description: string;
    specifications: [string];
    priceDetails: {
        currency: string;
        priceType: string;
        price: number;
    };
    adGallery: [
        {
            url: string;
            public_id: string;
        }
    ];
    adCoverImage: string;
    adVideo: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
    };
    specialNote: string;
    adsReport: [
        {
            user: UserDocument['_id'];
            reason: string;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
    expireAt: Date;
}
declare const AdsModel: mongoose.Model<AdsDocument, {}, {}, {}>;
export default AdsModel;
//# sourceMappingURL=ads.model.d.ts.map