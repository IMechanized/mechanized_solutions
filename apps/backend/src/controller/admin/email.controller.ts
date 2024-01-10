import { Request, Response } from 'express'
import { createEmail, findEmailByEmailType, findEmails, updateEmail } from "../../service/admin/email.service"
import { sendSingleEmail } from '../../utils/nodeMailerSingle'

// create email template handller
export async function createEmailHandler(req: Request, res: Response) {
    const input = {
        ...req.body,
    }
    try {
        const email = await createEmail(input)
        return res.status(200).send({
            message: 'Email template successfully created',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// get a email by emailType
export async function getEmailHandler(req: Request, res: Response) {
    const emailType = req.params.emailType
    try {
        const email = await findEmailByEmailType(emailType)
        if (!email) {
            return res.status(404).send({
                message: 'Email Template Not Found',
            })
        }
        return res.status(200).send({
            message: 'Email Template found successfully',
            data: email,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all emails
export async function findEmailsHandler(req: Request, res: Response) {
    try {
        const emails = await findEmails()
        res.status(200).send({
            message: 'Successfully find all emails',
            data: emails,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// update a email by emailType
export async function updateEmailHandler(req: Request, res: Response) {
    const emailQuery = {
        emailType: req.params.emailType,
    }
    const input = {
        ...req.body,
    }
    try {
        const email = await updateEmail(emailQuery, input)
        if (!email) {
            return res.status(404).send({
                message: 'Email Not Found',
            })
        }
        return res.status(200).send({
            message: 'Email updated successfully',
            data: email,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}


// create contact us email handller
export async function createContactEmailHandler(req: Request, res: Response) {
    const input = {
        name: req.body?.name,
        email: req.body?.email,
        mobile: req.body?.mobile,
        subject: req.body?.subject,
        message: req.body?.message,
    }
    try {
        const email = await sendSingleEmail(input)
        return res.status(200).send({
            message: 'Thank you for giving us an email',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

