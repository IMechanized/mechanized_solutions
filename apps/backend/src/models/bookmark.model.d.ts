import mongoose from 'mongoose';
import { AdsDocument } from './ads.model';
import { UserDocument } from './user.model';
export interface BookmarkDocument extends mongoose.Document {
    user: UserDocument['_id'];
    bookmarks: [
        {
            ads: AdsDocument['_id'];
            note: string;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}
declare const BookmarkModel: mongoose.Model<BookmarkDocument, {}, {}, {}>;
export default BookmarkModel;
//# sourceMappingURL=bookmark.model.d.ts.map