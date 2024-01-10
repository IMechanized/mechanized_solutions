import { Express } from "express";
import { changeBlogStatusHandler, createBlogHandler, deleteBlogHandler, deleteMultipleBlogHandler, disableMultipleBlogHandler, findAdminBlogsHandler, findBlogHandler, getBlogBySlugHandler, getBlogHandler, updateBlogHandler } from "../../controller/admin/blogs.controller";
import { requireAdmin } from "../../middlewares/requireUser";
import upload from "../../utils/multer";

function blogsRoute(app: Express) {
    // create a blog
    app.post(
        "/api/v1/ads/blog",
        requireAdmin,
        upload.single("blogImage"),
        createBlogHandler
    );

    // get a blog by id
    app.get("/api/v1/ads/blog/byId/:blogId", getBlogHandler);

    // get a blog by slug
    app.get("/api/v1/ads/blog/:blogSlug", getBlogBySlugHandler);

    // find all blog public
    app.get("/api/v1/ads/blog", findBlogHandler);

    // find all blog admin private
    app.get("/api/v1/ads/admin/blog", requireAdmin, findAdminBlogsHandler);

    // update a blog
    app.put(
        "/api/v1/ads/blog/:blogId",
        requireAdmin,
        upload.single("blogImage"),
        updateBlogHandler
    );

    // change a blog status by id
    app.put(
        "/api/v1/ads/blog/status/:blogId",
        requireAdmin,
        changeBlogStatusHandler
    );

    // disable multiple blogs status by ids
    app.put(
        "/api/v1/ads/multiselect/blog/status",
        requireAdmin,
        disableMultipleBlogHandler
    );

    // delete a blog
    app.delete(
        "/api/v1/ads/blog/:blogId",
        requireAdmin,
        deleteBlogHandler
    );

    // delete multiple blogs
    app.delete(
        "/api/v1/ads/multiselect/blog",
        requireAdmin,
        deleteMultipleBlogHandler
    );
}

export default blogsRoute;
