import jwt from "jsonwebtoken";
import config from "config";

// const PROVATE_KEY = config.get<string>("privateKey")
// const PUBLIC_KEY = config.get<string>("publicKey")

const PROVATE_KEY = Buffer.from(
    config.get<string>('privateKey'),
    'base64'
).toString('ascii')

const PUBLIC_KEY = Buffer.from(
    config.get<string>('publicKey'),
    'base64'
).toString('ascii')

export function signJwt(
    object: object,
    options?: jwt.SignOptions
) {
    return jwt.sign(object, PROVATE_KEY, {
        ...(options && options),
        algorithm: "RS256",
    });
}


export function verifyJwt(
    token: string,
) {
    try {
        const decoded = jwt.verify(token, PUBLIC_KEY);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
