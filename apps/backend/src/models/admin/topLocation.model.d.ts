import mongoose from 'mongoose';
export interface TopLocationDocument extends mongoose.Document {
    location: string;
    status: {
        isActive: boolean;
    };
    slug: string;
    avatar: string;
    avatarCloudinaryId: string;
}
declare const TopLocationModel: mongoose.Model<TopLocationDocument, {}, {}, {}>;
export default TopLocationModel;
//# sourceMappingURL=topLocation.model.d.ts.map