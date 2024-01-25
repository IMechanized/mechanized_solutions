import mongoose from 'mongoose';
export interface PackageDocument extends mongoose.Document {
    packageName: string;
    packageColor: string;
    pricing: number;
    currency: string;
    frequency: string;
    validity: number;
    totalAds: number;
    featuredAds: number;
    services: [
        {
            name: string;
            details: string;
            active: boolean;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}
declare const PackageModel: mongoose.Model<PackageDocument, {}, {}, {}>;
export default PackageModel;
//# sourceMappingURL=package.model.d.ts.map