import { query, Request, Response } from "express";
import _ from "lodash";
import { createEmail, findEmailByEmailType } from "../../service/admin/email.service";
import { createUserByAdmin, deleteMultipleUserByAdmin, deleteUserByAdmin, findUserByRole, updateUserByAdmin } from "../../service/admin/userManage.service";
import { getUser } from "../../service/user.service";
import { signJwt } from "../../utils/jwt.utils";
import { sendNotificationEmail } from "../../utils/nodeMailer";

// Add user by seper-admin controller
export async function createUserByAdminHandler(
    req: Request<{}, {}, any>,
    res: Response
) {
    //check userName exist
    const userNameExist = await getUser({ userName: req.body.userName })
    if (userNameExist) {
        return res.status(400).send({
            message: "User Name already exist",
        });
    }

    let role = {}
    if (req.body.roleAssigned === 'buyer' || req.body.roleAssigned === '') {
        role = {
            isBuyer: true
        }
    }
    if (req.body.roleAssigned === 'seller') {
        role = {
            isBuyer: false,
            isSeller: true
        }
    }
    if (req.body.roleAssigned === 'admin') {
        role = {
            isBuyer: false,
            isAdmin: true
        }
    }
    if (req.body.roleAssigned === 'superAdmin') {
        role = {
            isBuyer: false,
            isSuperAdmin: true
        }
    }
    const input = {
        ...req.body,
        role
    }
    try {
        const user = await createUserByAdmin(input)

        const userId = user._id
        const accessToken = await signJwt(
            {
                userId,
            },
            { expiresIn: '20d' }
        )

        // const emailType = 'CONFIRMATION_EMAIL'
        // let emails
        // emails = await findEmailByEmailType(emailType)
        // if (emails.length === 0) {
        //     const templateInput = {
        //         senderAddress: 'Meta-Ads',
        //         subject: 'Confirmation email',
        //         message: 'Please click this link to confirm your email:',
        //         emailType: 'CONFIRMATION_EMAIL',
        //     }
        //     await createEmail(templateInput)
        //     emails = await findEmailByEmailType('CONFIRMATION_EMAIL')
        // }
        // const emailData = emails[0]
        // const inputEmailData = {
        //     accessToken,
        //     userEmail: req.body?.email,
        //     emailData,
        //     userId,
        //     emailType,
        // }
        // sendNotificationEmail(inputEmailData)

        res.status(201).json({
            message: 'Successfully created user',
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}

// Find users according to role controller
export async function findUserByRoleHandler(
    req: Request,
    res: Response
) {
    const query = req.query
    try {
        const usersData = await findUserByRole(query)
        const data = {
            users: usersData.users,
            userCount: usersData.count
        }
        res.status(200).json({
            message: 'Successfully found users',
            data: data,
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}

// get an user by id controller
export async function getUserByIDHandler(
    req: Request,
    res: Response
) {
    const userID = req.params.userId
    try {
        const user = await getUser({ _id: userID })
        res.status(200).json({
            message: 'Successfully found users',
            data: user,
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}

//Update user by seper-admin controller
export async function updateUserByAdminHandler(
    req: Request,
    res: Response
) {
    const userId = req.params.userId
    let role = {}
    if (req.body.roleAssigned === 'buyer' || req.body.roleAssigned === '') {
        role = {
            isBuyer: true,
            isSeller: false,
            isAdmin: false,
            isSuperAdmin: false
        }
    }
    if (req.body.roleAssigned === 'seller') {
        role = {
            isBuyer: false,
            isSeller: true,
            isAdmin: false,
            isSuperAdmin: false
        }
    }
    if (req.body.roleAssigned === 'admin') {
        role = {
            isBuyer: false,
            isSeller: false,
            isAdmin: true,
            isSuperAdmin: false
        }
    }
    if (req.body.roleAssigned === 'superAdmin') {
        role = {
            isBuyer: false,
            isSeller: false,
            isAdmin: false,
            isSuperAdmin: true
        }
    }
    const input = {
        ...req.body,
        role,
    }
    try {
        await updateUserByAdmin(userId, input)
        // const user = await createUserByAdmin(input)
        res.status(200).json({
            message: 'Successfully updated user',
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}

// Delete user by seper-admin controller
export async function deleteUserByAdminHandler(
    req: Request,
    res: Response
) {
    const userId = req.params.id
    try {
        await deleteUserByAdmin(userId)
        res.status(200).json({
            message: 'Successfully deleted user'
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}

// Delete user by multiple ids controller
export async function deleteMultipleUserByAdminHandler(
    req: Request,
    res: Response
) {
    const userIds = req.body.userIDs
    const userIdInput = userIds.split(',')
    try {
        await deleteMultipleUserByAdmin(userIdInput)
        res.status(200).json({
            message: 'Successfully deleted users'
        })
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        })
    }
}
