import mongoose from 'mongoose';
import { UserDocument } from './user.model';
export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const SessionModel: mongoose.Model<SessionDocument, {}, {}, {}>;
export default SessionModel;
//# sourceMappingURL=session.model.d.ts.map