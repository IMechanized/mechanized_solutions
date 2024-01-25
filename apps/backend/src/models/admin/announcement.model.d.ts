import mongoose from 'mongoose';
export interface AnnouncementDocument extends mongoose.Document {
    announcement: string;
}
declare const AnnouncementModel: mongoose.Model<AnnouncementDocument, {}, {}, {}>;
export default AnnouncementModel;
//# sourceMappingURL=announcement.model.d.ts.map