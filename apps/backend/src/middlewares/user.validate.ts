import { Request, Response, NextFunction } from 'express'
import { userSchema } from '../schema/user.schema'
import { findUser } from '../service/user.service'

//validate user before signup
export const validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validationResult = await userSchema.validateAsync(req.body)
        next()
    } catch (e: any) {
        res.status(400).send({
            message: 'Invalid request',
            error: e.message,
        })
    }
}

//check if user exist before signup
export const userExistValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body
    // Get user by email
    const user = await findUser({ email })
    //   if user exist
    if (user)
        return res.status(400).send({
            message: 'User already exist',
        })
    next()
}

