import { Request, Response } from 'express';
export declare function createTopLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getLocationBySlugHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findTopLocatioHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findAdminLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function changeLoationStatusHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function disableMultipleLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteLocationHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteMultipleLocationsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=topLocation.controller.d.ts.map