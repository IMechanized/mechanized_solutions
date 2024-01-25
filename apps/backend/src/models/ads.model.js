"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var adsSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        isApproved: {
            type: Boolean,
            "default": false
        },
        isPublished: {
            type: Boolean,
            "default": true
        },
        isFeatured: {
            type: Boolean,
            "default": false
        },
        isActive: {
            type: Boolean,
            "default": true
        }
    },
    adTitle: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        },
    ],
    itemCondition: {
        type: String
    },
    itemWarranty: {
        type: String
    },
    adType: {
        type: String
    },
    description: {
        type: String
    },
    specifications: [
        {
            type: String
        },
    ],
    priceDetails: {
        currency: {
            type: String
        },
        priceType: {
            type: String
        },
        price: {
            type: Number,
            required: true
        }
    },
    adGallery: [
        {
            url: {
                type: String
            },
            public_id: {
                type: String
            }
        },
    ],
    adCoverImage: {
        type: String
    },
    adVideo: {
        type: String
    },
    personalInfo: {
        fullName: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        location: {
            type: String
        }
    },
    specialNote: {
        type: String
    },
    adsReport: [
        {
            user: {
                type: mongoose_1["default"].Schema.Types.ObjectId,
                ref: 'User'
            },
            reason: {
                type: String
            }
        },
    ],
    expireAt: {
        type: Date
    }
}, {
    timestamps: true
});
var AdsModel = mongoose_1["default"].model('Ads', adsSchema);
exports["default"] = AdsModel;
