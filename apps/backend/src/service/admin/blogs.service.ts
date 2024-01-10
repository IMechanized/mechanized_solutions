import BlogModel from '../../models/admin/blogs.model';
import cloudinary from '../../utils/cloudinary';

// create a blog service
export async function createBlog(blogData: any, imagePath: any) {
    try {
        let blogInput;
        if (imagePath) {
            // Upload image to cloudinary
            const imageData = await cloudinary.uploader.upload(imagePath);
            blogInput = {
                ...blogData,
                avatar: imageData.secure_url,
                iconUrl: imageData.public_id,
            };
        } else {
            blogInput = {
                ...blogData,
            };
        }

        const blog = await BlogModel.create(blogInput);
        return blog;
    } catch (e: any) {
        console.log(e);
        throw e.code;
    }
}

// get a blog by id service
export async function getBlog(blogID: string) {
    try {
        const blog = await BlogModel.findById(blogID).lean(true);

        //find latest blog
        // const latestBlog = await BlogModel.find({}).sort({
        //     createdAt: -1
        // }).limit(1);

        // const result = {
        //     blog,
        //     latestBlog,
        // };

        return blog;
    } catch (e) {
        throw e;
    }
}

// get a blog by slug service
export async function getBlogBySlug(blogSlug: string) {
    try {
        const blog = await BlogModel.findOne({
            slug: blogSlug,
        }).lean(true);

        //find latest blog
        const latestBlog = await BlogModel.find({ 'status.isActive': true })
            .sort({
                createdAt: -1,
            })
            .limit(4);

        const result = {
            blog,
            latestBlog,
        };

        return result;
    } catch (e) {
        throw e;
    }
}

// find all blogs public service
export async function findBlogs() {
    try {
        const blogyQuery = {
            'status.isActive': true,
        };
        const blogs = await BlogModel.find(blogyQuery).lean(true);
        return blogs;
    } catch (e) {
        throw e;
    }
}

// find all blogs admin private  service
export async function findAdminBlogs() {
    try {
        const blogs = await BlogModel.find().lean(true);
        return blogs;
    } catch (e) {
        throw e;
    }
}

// update a blog service
export async function updateBlog(blogID: string, update: any, imagePath: any) {
    try {
        let blogUpdate = null;
        if (imagePath) {
            const blogPrevData = (await BlogModel.findById(blogID)) as any;
            if (blogPrevData.iconUrl) {
                await cloudinary.uploader.destroy(blogPrevData.iconUrl);
            }
            const iconData = await cloudinary.uploader.upload(imagePath);
            const iconInput = {
                avatar: iconData?.secure_url,
                iconUrl: iconData?.public_id,
            };
            blogUpdate = {
                ...update,
                ...iconInput,
            };
        } else {
            blogUpdate = {
                ...update,
            };
        }
        const blog = await BlogModel.findByIdAndUpdate(blogID, blogUpdate, {
            new: true,
        });
        return blog;
    } catch (e) {
        throw e;
    }
}

// change a blog status service
export async function changeBlogStatus(blogID: string) {
    try {
        const blog = await BlogModel.findById(blogID);
        return blog;
    } catch (e) {
        throw e;
    }
}

// delete a blog service
export async function deleteBlog(blogID: string) {
    try {
        // Delete image from cloudinary
        const blogIDPrevData = (await BlogModel.findById(blogID)) as any;
        if (blogIDPrevData?.iconUrl) {
            await cloudinary.uploader.destroy(blogIDPrevData.iconUrl);
        }

        const blog = await BlogModel.findByIdAndDelete(blogID);
        return blog;
    } catch (e) {
        throw e;
    }
}

// delete multiple blog service
export async function deleteMultipleBlogs(blogIDs: string[]) {
    try {
        for (const blogID of blogIDs) {
            // Delete image from cloudinary
            const blogPrevData = (await BlogModel.findById(blogID)) as any;

            if (blogPrevData?.iconUrl) {
                await cloudinary.uploader.destroy(blogPrevData.iconUrl);
            }
        }

        const blogs = await BlogModel.deleteMany({ _id: { $in: blogIDs } });
        return blogs;
    } catch (e) {
        throw e;
    }
}
