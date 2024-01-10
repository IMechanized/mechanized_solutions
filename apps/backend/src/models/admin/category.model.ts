import mongoose from 'mongoose'

export interface CategoryDocument extends mongoose.Document {
    status: {
        isFeatured: boolean
        isActive: boolean
    }
    categoryTitle: string
    slug: string
    avatar: string
    iconUrl: string
}

const categorySchema = new mongoose.Schema({
    status: {
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    categoryTitle: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    iconUrl: {
        type: String,
    },
})

const CategoryModel = mongoose.model<CategoryDocument>(
    'Category',
    categorySchema
)

export default CategoryModel
