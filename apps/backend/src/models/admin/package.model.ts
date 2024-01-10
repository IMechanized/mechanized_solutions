import mongoose from 'mongoose'

export interface PackageDocument extends mongoose.Document {
    packageName: string
    // subtitle: string
    // subTitleStatus: boolean
    // shortDesc: string
    packageColor: string
    pricing: number
    currency: string
    frequency: string
    // buttonText: string
    validity: number
    totalAds: number
    featuredAds: number
    services: [
        {
            name: string
            details: string
            active: boolean
        }
    ]
    createdAt: Date
    updatedAt: Date
}

const packageSchema = new mongoose.Schema(
    {
        packageName: {
            type: String,
            required: true,
            unique: true,
        },
        // subtitle: {
        //     type: String,
        // },
        // subTitleStatus: {
        //     type: Boolean,
        //     default: true,
        // },
        // shortDesc: {
        //     type: String,
        // },
        packageColor: {
            type: String,
        },
        pricing: {
            type: Number,
            required: true,
            unique: true,
        },
        currency: {
            type: String,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        // buttonText: {
        //     type: String,
        //     required: true,
        // },
        validity: {
            type: Number,
            required: true,
        },
        totalAds: {
            type: Number,
            required: true,
        },
        featuredAds: {
            type: Number,
            required: true,
        },
        services: {
            type: [
                {
                    name: String,
                    details: String,
                    active: Boolean,
                },
            ],
        },
    },
    {
        timestamps: true,
    }
)

const PackageModel = mongoose.model<PackageDocument>('Package', packageSchema)

export default PackageModel
