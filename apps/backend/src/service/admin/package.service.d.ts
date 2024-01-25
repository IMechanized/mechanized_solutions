/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
import { PackageDocument } from '../../models/admin/package.model';
export declare function createPackage(packageData: PackageDocument): Promise<PackageDocument & {
    _id: any;
}>;
export declare function getPackage(packageID: string): Promise<import("mongoose").LeanDocument<PackageDocument & {
    _id: any;
}> | null>;
export declare function findPackage(): Promise<import("mongoose").LeanDocument<PackageDocument & {
    _id: any;
}>[]>;
export declare function updatePackage(packageID: string, update: object): Promise<(PackageDocument & {
    _id: any;
}) | null>;
export declare function deletePackage(packageID: string): Promise<(PackageDocument & {
    _id: any;
}) | null>;
//# sourceMappingURL=package.service.d.ts.map