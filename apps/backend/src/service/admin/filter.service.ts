import FilterModel from "../../models/admin/filter.model"

// create filter service
export async function createFilter(input: any) {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }
    try {
        const filter = await FilterModel.findOneAndUpdate({}, input, options)
        return filter
    } catch (e) {
        throw e
    }
}

// find all filters service
export async function findFilters() {
    try {
        const filter = await FilterModel.find().lean(true)
        return filter[0]
    } catch (e) {
        throw e
    }
}