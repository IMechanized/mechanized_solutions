import { Request, Response } from 'express';
import BlogModel from '../../models/admin/blogs.model';
import {
    changeBlogStatus,
    createBlog,
    deleteBlog,
    deleteMultipleBlogs,
    findAdminBlogs,
    findBlogs,
    getBlog,
    getBlogBySlug,
    updateBlog,
} from '../../service/admin/blogs.service';
var slug = require('slug');

// create blog handller
export async function createBlogHandler(req: Request, res: Response) {
    try {
        //blog slug
        let blogSlug = slug(req.body.blogTitle, { lower: true });
        const getBlogInfo = await getBlogBySlug(blogSlug);
        if (getBlogInfo) {
            blogSlug = blogSlug + '-' + Math.floor(100 + Math.random() * 900);
        }

        const blogData = {
            blogTitle: req.body?.blogTitle,
            slug: blogSlug,
            description: req.body?.description,
            tags: JSON.parse(req.body?.tags),
        };
        const imagePath = req.file?.path;

        const blog = await createBlog(blogData, imagePath);
        res.status(200).json({
            message: `New Blog Created Successfully`,
        });
    } catch (e: any) {
        console.log(e);
        e === 11000
            ? res.status(400).json({
                  message: 'Blog already exist',
                  error: e,
              })
            : res.status(500).send({
                  message: 'something went wrong',
                  error: e,
              });
    }
}

// get blog handller by id
export async function getBlogHandler(req: Request, res: Response) {
    const blogID = req.params.blogId;

    // get a blog
    try {
        const blog = await getBlog(blogID);

        if (!blog) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }
        return res.status(200).send({
            message: 'Blog Found',
            data: blog,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// get blog handller by slug
export async function getBlogBySlugHandler(req: Request, res: Response) {
    const blogSlug = req.params.blogSlug;
    // get a blog
    try {
        const blog = await getBlogBySlug(blogSlug);

        if (!blog) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }
        return res.status(200).send({
            message: 'Blog Found',
            data: blog,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all blogs public handller
export async function findBlogHandler(req: Request, res: Response) {
    try {
        const blogs = await findBlogs();
        res.status(200).send({
            message: 'Successfully find all Blogs',
            data: blogs,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all blogs admin private handller
export async function findAdminBlogsHandler(req: Request, res: Response) {
    try {
        const blogs = await findAdminBlogs();
        res.status(200).send({
            message: 'Successfully find all Blogs',
            data: blogs,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// update blog handller
export async function updateBlogHandler(req: Request, res: Response) {
    const blogID = req.params.blogId;
    try {
        //blog slug
        let blogSlug = slug(req.body.blogTitle, { lower: true });
        const getBlogInfo = (await getBlogBySlug(blogSlug)) as any;
        if (getBlogInfo) {
            if (getBlogInfo?._id?.toString() == blogID) {
                blogSlug = slug(req.body.blogTitle, { lower: true });
            } else {
                blogSlug =
                    blogSlug + '-' + Math.floor(100 + Math.random() * 900);
            }
        }

        const imagePath = req.file?.path as any;
        const blogData = {
            blogTitle: req.body?.blogTitle,
            slug: blogSlug,
            description: req.body?.description,
            tags: JSON.parse(req.body?.tags),
        };
        const blog = await updateBlog(blogID, blogData, imagePath);

        if (!blog) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }
        return res.status(200).send({
            message: 'Blog Updated',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  change a blog status handller
export async function changeBlogStatusHandler(req: Request, res: Response) {
    const blogID = req.params.blogId;
    const blogStatus = req.body.status;

    try {
        const blog = (await changeBlogStatus(blogID)) as any;

        switch (blogStatus) {
            case 'enbable':
                blog.status.isActive = true;
                blog.save();
                return res.status(200).send({
                    message: 'Blog is activated successfully',
                });

            case 'disable':
                blog.status.isActive = false;
                blog.save();
                return res.status(200).send({
                    message: 'Blog is deactivated successfully',
                });

            default:
                return res.status(400).send({
                    message: 'Invalid status',
                });
        }
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  disable multiple blogs status handller
export async function disableMultipleBlogHandler(req: Request, res: Response) {
    const blogIDs = req.body.blogIds;
    const inputblogIDs = blogIDs?.split(',');

    try {
        const blogs = await BlogModel.find({
            _id: {
                $in: inputblogIDs,
            },
        });
        if (!blogs) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }

        blogs.forEach(async (blog: any) => {
            blog.status.isActive = false;
            blog.save();
        });

        return res.status(200).send({
            message: 'Blog are disabled successfully',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete blog handller
export async function deleteBlogHandler(req: Request, res: Response) {
    const blogID = req.params.blogId;
    // delete a blog
    try {
        const blog = await deleteBlog(blogID);

        if (!blog) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }
        return res.status(200).send({
            message: 'Blog Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete multiple  blogs handller
export async function deleteMultipleBlogHandler(req: Request, res: Response) {
    const blogIDs = req.body.blogIds;
    const inputBlogIds = blogIDs?.split(',');

    try {
        const blog = await deleteMultipleBlogs(inputBlogIds);

        if (!blog) {
            return res.status(404).send({
                message: 'Blog Not Found',
            });
        }
        return res.status(200).send({
            message: 'Blog Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}
