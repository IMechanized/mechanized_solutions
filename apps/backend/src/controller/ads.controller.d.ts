import { Request, Response } from 'express';
export declare function createAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getAdBySlugHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findPrivateAdsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findAdsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findLatestAdsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function searchAdsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findTotalCountHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteMultipleAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function reportAdHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findAdReportsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ads.controller.d.ts.map