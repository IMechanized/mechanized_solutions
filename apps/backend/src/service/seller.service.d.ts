/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
export declare function searchSeller(query: any): Promise<{
    seller: any[];
    sellerCount: number;
}>;
export declare function getSeller(userName: string): Promise<{
    seller: import("mongoose").LeanDocument<import("../models/user.model").UserDocument & {
        _id: any;
    }> | null;
    sellerAds: (import("../models/ads.model").AdsDocument & {
        _id: any;
    })[];
}>;
export declare function createSellerReview(updateInput: any, sellerID: string): Promise<(import("../models/user.model").UserDocument & {
    _id: any;
}) | null>;
export declare function findSellerReviews(sellerId: any): Promise<{
    reviews: [{
        user: any;
        ratingNumber: number;
        review: string;
        isApproved: boolean;
    }];
    averageRating: string;
    reviewCount: 1;
}>;
//# sourceMappingURL=seller.service.d.ts.map