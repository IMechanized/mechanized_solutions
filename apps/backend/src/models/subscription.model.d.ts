import mongoose from 'mongoose';
export interface SubscriptionDocument extends mongoose.Document {
    subscriptionEmail: string;
}
declare const SubscriptionModel: mongoose.Model<SubscriptionDocument, {}, {}, {}>;
export default SubscriptionModel;
//# sourceMappingURL=subscription.model.d.ts.map