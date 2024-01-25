import { Request, Response, NextFunction } from 'express';
declare const requireUser: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default requireUser;
export declare const requireBuyer: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireSeller: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireSuperAdmin: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=requireUser.d.ts.map