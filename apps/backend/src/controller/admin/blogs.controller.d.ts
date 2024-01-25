import { Request, Response } from 'express';
export declare function createBlogHandler(req: Request, res: Response): Promise<void>;
export declare function getBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getBlogBySlugHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findAdminBlogsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function changeBlogStatusHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function disableMultipleBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteMultipleBlogHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=blogs.controller.d.ts.map