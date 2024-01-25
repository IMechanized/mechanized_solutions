import { Request, Response } from "express";
export declare function createUserHandler(req: Request<{}, {}, any>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function checkUserNameExistHandler(req: Request<{}, {}, any>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function resendConfirmEmailhandler(req: Request, res: Response): Promise<void>;
export declare function confirmEmailhandler(req: Request, res: Response): Promise<false | undefined>;
export declare function getUserHandler(req: Request, res: Response): Promise<void>;
export declare function updateUserHandler(req: Request, res: Response): Promise<void>;
export declare function resetPasswordHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function forgetPasswordHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function forgetPassResetHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateUserPackageHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getDashboardStatHandler(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map