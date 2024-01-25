export declare function createNotification(input: any): Promise<import("../models/notification.model").NotificationDocument & {
    _id: any;
}>;
export declare function getNotification(query: any): Promise<(import("../models/notification.model").NotificationDocument & {
    _id: any;
}) | null>;
export declare function sendNotification(query: string, input: any): Promise<(import("../models/notification.model").NotificationDocument & {
    _id: any;
}) | null>;
export declare function updateNotification(userId: string, notificationId: string, notificationStatus: string): Promise<(import("../models/notification.model").NotificationDocument & {
    _id: any;
}) | null>;
//# sourceMappingURL=notification.service.d.ts.map