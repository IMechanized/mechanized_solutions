/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
export declare function createMessageRoom(input: any): Promise<import("../models/message.model").MessageDocument & {
    _id: any;
}>;
export declare function findMessageRoom(userId: string): Promise<import("mongoose").LeanDocument<import("../models/message.model").MessageDocument & {
    _id: any;
}>[]>;
export declare function getMessageRoom(roomId: string): Promise<import("mongoose").LeanDocument<import("../models/message.model").MessageDocument & {
    _id: any;
}> | null>;
export declare function updateMessageRoom(roomId: string, input: any): Promise<(import("../models/message.model").MessageDocument & {
    _id: any;
}) | null>;
//# sourceMappingURL=message.service.d.ts.map