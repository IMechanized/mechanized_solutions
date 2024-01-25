import mongoose from 'mongoose';
export interface BlogDocument extends mongoose.Document {
    status: {
        isFeatured: boolean;
        isActive: boolean;
    };
    blogTitle: string;
    description: string;
    tags: [string];
    slug: string;
    avatar: string;
    iconUrl: string;
}
declare const BlogModel: mongoose.Model<BlogDocument, {}, {}, {}>;
export default BlogModel;
//# sourceMappingURL=blogs.model.d.ts.map