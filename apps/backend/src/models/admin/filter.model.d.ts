import mongoose from "mongoose";
export interface FilterDocument extends mongoose.Document {
    adType: [string];
    itemWarranty: [string];
    itemCondition: [string];
    priceType: [string];
    tags: [string];
}
declare const FilterModel: mongoose.Model<FilterDocument, {}, {}, {}>;
export default FilterModel;
//# sourceMappingURL=filter.model.d.ts.map