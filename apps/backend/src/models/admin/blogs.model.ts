import mongoose from 'mongoose'

export interface BlogDocument extends mongoose.Document {
    status: {
        isFeatured: boolean
        isActive: boolean
    }
    blogTitle: string
    description: string
    tags: [string]
    slug: string
    avatar: string
    iconUrl: string
}

const blogSchema = new mongoose.Schema({
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
    blogTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    avatar: {
        type: String,
    },
    iconUrl: {
        type: String,
    },
})

const BlogModel = mongoose.model<BlogDocument>(
    'Blog',
    blogSchema
)

export default BlogModel
