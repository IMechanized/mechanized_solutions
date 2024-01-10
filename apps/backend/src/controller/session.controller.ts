import { Request, Response } from "express";
import config from "config";
import {
    createUserSession, deleteSession,
    //   findSessions,
    //   updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import logger from "../utils/logger";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the user's password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send({
            message: "Invalid username or password"
        });
    }

    // create a session
    const session = await createUserSession(user._id, req.get("user-agent") || "");

    logger.info(`User ${user.email} logged in`)
    // create an access token
    const accessToken = signJwt(
        { ...user, sessionId: session._id },
        { expiresIn: config.get<number>("accessTokenExpireTime") }
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...user, sessionId: session._id },
        { expiresIn: config.get<number>("refreshTokenExpireTime") }
    );

    // set accessToken to cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 900000, //15 min
        domain: 'localhost',
        path: '/',
        secure: false,
    })

    // set refreshToken to cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 3.154e10, // 1 year
        domain: 'localhost',
        path: '/',
        secure: false,
    })

    // return access & refresh tokens
    return res.status(200).send({
        message: 'User Logged In',
        accessToken: accessToken,
        refreshToken: refreshToken,
    })

}


// delete deleteSessionHandler function
export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.sessionId

    try {
        const user = await deleteSession({ _id: sessionId }, { valid: false })
        res.status(200).json({
            message: 'Logout Succesfull',
            accessToken: null,
            refreshToken: null,
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e)
    }
}

