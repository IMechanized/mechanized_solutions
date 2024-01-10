import { FilterQuery } from "mongoose";
import EmailModel, { EmailDocument } from '../../models/admin/email.model'

// create a email services for admin seetings
// export async function createEmail(input: EmailDocument) {
export async function createEmail(input: any) {
    try {
        const email = await EmailModel.create(input)
        return email
    } catch (e: any) {
        throw e
    }
}

// get a email by id ( neew to check whether used or not)
export async function getEmail(emailID: string) {
    try {
        const email = await EmailModel.findById(emailID).lean(true)
        if (!email) {
            return null
        }
        return email
    } catch (e: any) {
        throw e
    }
}
// find all emails
export async function findEmails() {
    try {
        const emails = await EmailModel.find().lean(true)
        return emails
    } catch (e: any) {
        throw e
    }
}

// update a email by id
export async function updateEmail(emailQuery: FilterQuery<EmailDocument>, input: object) {
    try {
        const email = await EmailModel.findOneAndUpdate(emailQuery, input, {
            new: true,
        })
        return email
    } catch (e: any) {
        throw e
    }
}

// find  email by emailType
export async function findEmailByEmailType(emailType: string) {
    try {
        const email = await EmailModel.find({ emailType: emailType }).lean(true)
        return email
    } catch (e: any) {
        throw e
    }
}
