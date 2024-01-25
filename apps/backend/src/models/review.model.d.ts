import mongoose from 'mongoose';
import { AdsDocument } from './ads.model';
import { UserDocument } from './user.model';
export interface ReviewDocument extends mongoose.Document {
    user: UserDocument['_id'];
    status: {
        isApproved: boolean;
    };
    ratingNumber: number;
    review: string;
    sellerId: AdsDocument['_id'];
}
declare const ReviewModel: mongoose.Model<ReviewDocument, {}, {}, {}>;
export default ReviewModel;
//# sourceMappingURL=review.model.d.ts.map