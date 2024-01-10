import mongoose from "mongoose";

export interface FilterDocument extends mongoose.Document {
  adType: [string];
  itemWarranty: [string];
  itemCondition: [string];
  priceType: [string];
  tags: [string];
}

const filterSchema = new mongoose.Schema({
  adType: {
    type: [String],
  },
  itemWarranty: {
    type: [String],
  },
  itemCondition: {
    type: [String],
  },
  priceType: {
    type: [String],
  },
  tags: {
    type: [String],
  },
});

const FilterModel = mongoose.model<FilterDocument>("Filter", filterSchema);

export default FilterModel;
