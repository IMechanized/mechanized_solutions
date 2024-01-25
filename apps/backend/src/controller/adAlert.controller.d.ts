import { Request, Response } from 'express';
export declare function createAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function showAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateAdAlertStatusHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function disableMultipleAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteAdAlertHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteMultipleAdAlertsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=adAlert.controller.d.ts.map