import mongoose from 'mongoose';
export interface EmailDocument extends mongoose.Document {
    senderAddress: string;
    senderEmail: string;
    subject: string;
    message: string;
    emailType: string;
}
declare const EmailModel: mongoose.Model<EmailDocument, {}, {}, {}>;
export default EmailModel;
//# sourceMappingURL=email.model.d.ts.map