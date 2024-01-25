import { Request, Response } from "express";
export declare function createUserByAdminHandler(req: Request<{}, {}, any>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function findUserByRoleHandler(req: Request, res: Response): Promise<void>;
export declare function getUserByIDHandler(req: Request, res: Response): Promise<void>;
export declare function updateUserByAdminHandler(req: Request, res: Response): Promise<void>;
export declare function deleteUserByAdminHandler(req: Request, res: Response): Promise<void>;
export declare function deleteMultipleUserByAdminHandler(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=userManage.controller.d.ts.map