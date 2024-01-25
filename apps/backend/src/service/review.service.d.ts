/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
export declare function createReview(input: any): Promise<import("../models/review.model").ReviewDocument & {
    _id: any;
}>;
export declare function getReview(id: string): Promise<import("mongoose").LeanDocument<import("../models/review.model").ReviewDocument & {
    _id: any;
}> | null>;
export declare function findReviews(adId: any): Promise<{
    reviews: (import("../models/review.model").ReviewDocument & {
        _id: any;
    })[];
    averageRating: string;
    reviewCount: number;
}>;
export declare function updateReview(reviewID: string, update: any): Promise<import("mongoose").LeanDocument<import("../models/review.model").ReviewDocument & {
    _id: any;
}> | null>;
export declare function deleteReview(reviewID: string): Promise<(import("../models/review.model").ReviewDocument & {
    _id: any;
}) | null>;
//# sourceMappingURL=review.service.d.ts.map