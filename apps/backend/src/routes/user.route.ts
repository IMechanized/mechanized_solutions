import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler } from "../controller/session.controller";
import { checkUserNameExistHandler, confirmEmailhandler, createUserHandler, forgetPassResetHandler, forgetPasswordHandler, getDashboardStatHandler, getUserHandler, resendConfirmEmailhandler, resetPasswordHandler, updateUserHandler, updateUserPackageHandler } from "../controller/user.controller";
import requireUser from "../middlewares/requireUser";
import { validateSession } from "../middlewares/session.validate";
import { userExistValidate, validateUser } from "../middlewares/user.validate";
import upload from "../utils/multer";

function userRoute(app: Express) {
    // health check
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('OK')
    })

    // signup user
    app.post('/api/v1/user/signup',
        validateUser,
        userExistValidate,
        createUserHandler
    )

    //Check user-name exist
    app.get('/api/v1/user/check/username',
        checkUserNameExistHandler
    )

    // Resend confirmation email
    app.post(
        '/api/v1/user/resend/confirmation',
        requireUser,
        resendConfirmEmailhandler
    )

    // Email confirmation
    app.post('/api/v1/user/confirmation/:token', confirmEmailhandler)

    // user login api
    app.post('/api/v1/user/session', validateSession, createUserSessionHandler)

    // get user self
    app.get('/api/v1/user/self', requireUser, getUserHandler)

    // update user self profile
    app.put('/api/v1/user/self',
        requireUser,
        upload.single('profileImage'),
        updateUserHandler
    )

    // reset password
    app.put('/api/v1/user/reset', requireUser, resetPasswordHandler)

    // forget password email
    app.put('/api/v1/user/account/forget-password', forgetPasswordHandler)

    // forget password reset
    app.put('/api/v1/user/account/reset-password', forgetPassResetHandler)

    // update user package 
    app.put('/api/v1/user/package', requireUser, updateUserPackageHandler)

    // user logout
    app.delete('/api/v1/user/session', deleteSessionHandler)

    // create user dashboard statistics route
    app.get(
        '/api/v1/user/dashboard/statistics',
        requireUser,
        getDashboardStatHandler
    )

}

export default userRoute;