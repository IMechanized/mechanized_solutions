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
        },
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
        },
    ];
    createdAt: Date;
    updatedAt: Date;
    expireAt: Date;
}

const adsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            isApproved: {
                type: Boolean,
                default: false,
            },
            isPublished: {
                type: Boolean,
                default: true,
            },
            isFeatured: {
                type: Boolean,
                default: false,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },

        adTitle: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        itemCondition: {
            type: String,
        },
        itemWarranty: {
            type: String,
        },
        adType: {
            type: String,
        },
        description: {
            type: String,
        },
        specifications: [
            {
                type: String,
            },
        ],
        priceDetails: {
            currency: {
                type: String,
            },
            priceType: {
                type: String,
            },
            price: {
                type: Number,
                required: true,
            },
        },
        adGallery: [
            {
                url: {
                    type: String,
                },
                public_id: {
                    type: String,
                },
            },
        ],
        adCoverImage: {
            type: String,
        },
        adVideo: {
            type: String,
        },
        personalInfo: {
            fullName: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            location: {
                type: String,
            },
        },
        specialNote: {
            type: String,
        },
        adsReport: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                reason: {
                    type: String,
                },
            },
        ],
        expireAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

const AdsModel = mongoose.model<AdsDocument>('Ads', adsSchema);

export default AdsModel;
