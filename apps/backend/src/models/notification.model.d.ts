import mongoose from 'mongoose';
import { UserDocument } from './user.model';
export interface NotificationDocument extends mongoose.Document {
    user: UserDocument['_id'];
    notification: [
        {
            message: string;
            timestamp: string;
            event: string;
            status: string;
        }
    ];
}
declare const NotificationModel: mongoose.Model<NotificationDocument, {}, {}, {}>;
export default NotificationModel;
//# sourceMappingURL=notification.model.d.ts.map