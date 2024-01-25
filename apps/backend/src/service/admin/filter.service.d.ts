/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
export declare function createFilter(input: any): Promise<(import("../../models/admin/filter.model").FilterDocument & {
    _id: any;
}) | null>;
export declare function findFilters(): Promise<import("mongoose").LeanDocument<import("../../models/admin/filter.model").FilterDocument & {
    _id: any;
}>>;
//# sourceMappingURL=filter.service.d.ts.map