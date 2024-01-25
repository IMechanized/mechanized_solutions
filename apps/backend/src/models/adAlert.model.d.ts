import mongoose from 'mongoose';
import { UserDocument } from './user.model';
export interface AdAlertDocument extends mongoose.Document {
    user: UserDocument['_id'];
    name: string;
    active: boolean;
    keyword: string;
    category: string;
    location: string;
    tags: [string];
    emailFrequency: string;
}
declare const AdAlertModel: mongoose.Model<AdAlertDocument, {}, {}, {}>;
export default AdAlertModel;
//# sourceMappingURL=adAlert.model.d.ts.map