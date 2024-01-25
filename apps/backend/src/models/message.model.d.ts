import mongoose from 'mongoose';
import { AdsDocument } from './ads.model';
import { UserDocument } from './user.model';
export interface MessageDocument extends mongoose.Document {
    ads: AdsDocument['_id'];
    time: string;
    members: {
        buyer: UserDocument['_id'];
        seller: UserDocument['_id'];
    };
    messages: [
        {
            sender: UserDocument['_id'];
            reciver: UserDocument['_id'];
            message: string;
            timestamp: string;
        }
    ];
}
declare const MessageModel: mongoose.Model<MessageDocument, {}, {}, {}>;
export default MessageModel;
//# sourceMappingURL=message.model.d.ts.map