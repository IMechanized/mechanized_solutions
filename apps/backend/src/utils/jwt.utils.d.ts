import jwt from "jsonwebtoken";
export declare function signJwt(object: object, options?: jwt.SignOptions): string;
export declare function verifyJwt(token: string): {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
} | {
    valid: boolean;
    expired: boolean;
    decoded: null;
};
//# sourceMappingURL=jwt.utils.d.ts.map