import { Request, Response, NextFunction } from 'express'

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route',
        })
    }
    return next()
}
export default requireUser;

export const requireBuyer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route',
        })
    }
    if (user.role.isBuyer || user.role.isAdmin || user.role.isSuperAdmin) {
        return next()
    } else {
        return res.status(401).json({
            message: 'You must be an buyer to access this route',
        })
    }
}

export const requireSeller = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route',
        })
    }
    if (user.role.isSeller || user.role.isAdmin || user.role.isSuperAdmin) {
        return next()
    } else {
        return res.status(401).json({
            message: 'You must be a seller to access this route',
        })
    }
}

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route',
        })
    }
    if (user.role.isAdmin || user.role.isSuperAdmin) {
        return next()
    } else {
        return res.status(401).json({
            message: 'You must be an admin to access this route',
        })
    }
}

export const requireSuperAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route',
        })
    }
    if (user.role.isSuperAdmin) {
        return next()
    } else {
        return res.status(401).json({
            message: 'You must be an Super-admin to access this route',
        })
    }
}
