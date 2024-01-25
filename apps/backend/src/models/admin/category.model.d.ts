import mongoose from 'mongoose';
export interface CategoryDocument extends mongoose.Document {
    status: {
        isFeatured: boolean;
        isActive: boolean;
    };
    categoryTitle: string;
    slug: string;
    avatar: string;
    iconUrl: string;
}
declare const CategoryModel: mongoose.Model<CategoryDocument, {}, {}, {}>;
export default CategoryModel;
//# sourceMappingURL=category.model.d.ts.map