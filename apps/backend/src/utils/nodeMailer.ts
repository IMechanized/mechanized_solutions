import {
    ConfirmMailTemplate,
    DefaultMailTemplate,
} from './mail-templates';
import config from 'config';
import { sendNotification } from '../service/notification.service';

const nodemailer = require('nodemailer');

const endpoint = config.get('endpoint');
const endPointFrontend = config.get('endPointFrontend');

export async function sendNotificationEmail(input: any) {
    try {
        const confirmUrl = `${endPointFrontend}/verify-email/${input?.accessToken}`;
        // const confirmUrl = `${endpoint}/api/v1/user/confirmation/${input?.accessToken}`
        const forgetPass = `${endPointFrontend}/lost-password/${input?.forgetPassToken}`;

        const DateFormate = new Date();
        const date = DateFormate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        let transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: process.env.NODEMAILER_SECURE === 'true',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
            connectionTimeout: 10000,
            debug: true,
        });
        console.log('Nodemailer input', input);

        switch (input.emailData.emailType) {
            case 'CONFIRMATION_EMAIL':
                const mailOptions1 = {
                    from: `${input.emailData.senderAddress} <${process.env.NODEMAILER_EMAIL}>`,
                    to: input.userEmail,
                    subject: input.emailData.subject,
                    html: ConfirmMailTemplate(
                        input.emailData?.message,
                        confirmUrl,
                    ),
                };
                const info1 = await transporter
                    .sendMail(mailOptions1)
                    .then((info: any) => {
                        const userId = input?.userId;
                        const notificationInput = {
                            user: input?.userId,
                            notification: [
                                {
                                    message: `${input.emailData.subject}`,
                                    timestamp: new Date().toISOString(),
                                    event: input?.emailType,
                                    status: 'UNREAD',
                                },
                            ],
                        };
                        if (input.userId && input.emailType) {
                            sendNotification(userId, notificationInput);
                        }
                    });
                break;
            case 'FORGET_PASSWORD':
                const mailOptions2 = {
                    from: `${input.emailData.senderAddress} <${process.env.NODEMAILER_EMAIL}>`,
                    to: input.userEmail,
                    subject: input.emailData.subject,
                    html: ConfirmMailTemplate(
                        input.emailData?.message,
                        forgetPass,
                    ),
                };
                const info2 = await transporter
                    .sendMail(mailOptions2)
                    .then((info: any) => {
                        const userId = input?.userId;
                        const notificationInput = {
                            user: input?.userId,
                            notification: [
                                {
                                    message: `${input.emailData.subject}`,
                                    timestamp: new Date().toISOString(),
                                    event: input?.emailType,
                                    status: 'UNREAD',
                                },
                            ],
                        };
                        if (input.userId && input.emailType) {
                            sendNotification(userId, notificationInput);
                        }
                    });
                break;
            default:
                const mailOptions = {
                    from: `${input.emailData.senderAddress} <${process.env.NODEMAILER_EMAIL}>`,
                    to: input.userEmail,
                    subject: input.emailData.subject,
                    html: DefaultMailTemplate(input.emailData?.message),
                };
                const info = await transporter
                    .sendMail(mailOptions)
                    .then((info: any) => {
                        const userId = input?.userId;
                        const notificationInput = {
                            user: input?.userId,
                            notification: [
                                {
                                    message: `${input.emailData.subject}`,
                                    timestamp: new Date().toISOString(),
                                    event: input?.emailType,
                                    status: 'UNREAD',
                                },
                            ],
                        };
                        if (input.userId && input.emailType) {
                            sendNotification(userId, notificationInput);
                        }
                    });
        }
    } catch (e) {
        console.error("Error sending email: ", e)
        throw e;
    }
}
