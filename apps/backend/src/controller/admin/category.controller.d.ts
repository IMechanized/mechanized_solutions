import { Request, Response } from 'express';
export declare function createCategoryHandler(req: Request, res: Response): Promise<void>;
export declare function getCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getCategoryBySlugHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findAdminCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function changeCategoryStatusHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function disableMultipleCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteMultipleCategoryHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=category.controller.d.ts.map