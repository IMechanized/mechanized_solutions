/// <reference types="mongoose/types/PipelineStage" />
import { FilterQuery } from "mongoose";
import { EmailDocument } from '../../models/admin/email.model';
export declare function createEmail(input: any): Promise<EmailDocument & {
    _id: any;
}>;
export declare function getEmail(emailID: string): Promise<import("mongoose").LeanDocument<EmailDocument & {
    _id: any;
}> | null>;
export declare function findEmails(): Promise<import("mongoose").LeanDocument<EmailDocument & {
    _id: any;
}>[]>;
export declare function updateEmail(emailQuery: FilterQuery<EmailDocument>, input: object): Promise<(EmailDocument & {
    _id: any;
}) | null>;
export declare function findEmailByEmailType(emailType: string): Promise<import("mongoose").LeanDocument<EmailDocument & {
    _id: any;
}>[]>;
//# sourceMappingURL=email.service.d.ts.map