import { Request, Response } from 'express';
export declare const searchSellerHandler: (req: Request, res: Response) => Promise<void>;
export declare function getSellerHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createSellerReviewHandller(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findSellerReviewsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=seller.controller.d.ts.map