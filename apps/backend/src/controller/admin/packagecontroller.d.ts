import { Request, Response } from 'express';
export declare function createPackageHandler(req: Request, res: Response): Promise<void>;
export declare function getPackageHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findPackageHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updatePackageHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deletePackageHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=packagecontroller.d.ts.map