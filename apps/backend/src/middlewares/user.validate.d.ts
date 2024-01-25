import { Request, Response, NextFunction } from 'express';
export declare const validateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const userExistValidate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.validate.d.ts.map