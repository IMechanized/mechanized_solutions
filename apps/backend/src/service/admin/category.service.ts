import _ from 'lodash';
import CategoryModel from '../../models/admin/category.model';
import AdsModel from '../../models/ads.model';
import cloudinary from '../../utils/cloudinary';

// create a category service
export async function createCategory(categoryData: any, imagePath: any) {
    try {
        let categoryInput;
        if (imagePath) {
            // Upload image to cloudinary
            const imageData = await cloudinary.uploader.upload(imagePath);
            categoryInput = {
                ...categoryData,
                avatar: imageData.secure_url,
                iconUrl: imageData.public_id,
            };
        } else {
            categoryInput = {
                ...categoryData,
            };
        }

        const category = await CategoryModel.create(categoryInput);
        return category;
    } catch (e: any) {
        console.log(e);
        throw e.code;
    }
}

// get a category by id service
export async function getCategory(categoryID: string) {
    try {
        const category = await CategoryModel.findById(categoryID).lean(true);

        const adsCount = _.pick(category, ['categoryTitle']);

        const totalAds = await AdsModel.find({
            category: adsCount.categoryTitle,
        }).count();

        const result = {
            ...category,
            count: totalAds,
        };

        // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
        return result;
    } catch (e) {
        throw e;
    }
}

// get an category by slug service
export async function getCategoryBySlug(categorySlug: string) {
    try {
        const category = await CategoryModel.findOne({
            slug: categorySlug,
        }).lean(true);
        // const adsCount = _.pick(category, ['categoryTitle'])

        // console.log('Ads Count', adsCount)
        // const totalAds = await AdsModel.find({
        //     category: adsCount.categoryTitle,
        // }).count()

        const result = {
            // ...category,
            // count: totalAds,
        };

        // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
        // return result
        return category;
    } catch (e) {
        throw e;
    }
}
// export async function getAdBySlug(slug: string) {
//     try {
//         const ad = await AdsModel.findOne({ slug }).lean(true)
//         return ad
//     } catch (e) {
//         throw e
//     }
// }

// find all categories public service
export async function findCategory() {
    try {
        const categoryQuery = {
            'status.isActive': true,
        };
        const categories = await CategoryModel.find(categoryQuery).lean(true);

        const categoryTitle = _.map(categories, 'categoryTitle');
        const count = await AdsModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        const result = categories.map((category: any) => {
            const categoryCount = count.find(
                (count: any) => count._id === category.categoryTitle,
            );
            return {
                ...category,
                count: categoryCount ? categoryCount.count : 0,
            };
        });
        return result;
    } catch (e) {
        throw e;
    }
}

// find all categories admin private  service
export async function findAdminCategory() {
    try {
        const categories = await CategoryModel.find().lean(true);

        const categoryTitle = _.map(categories, 'categoryTitle');
        const count = await AdsModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        const result = categories.map((category: any) => {
            const categoryCount = count.find(
                (count: any) => count._id === category.categoryTitle,
            );
            return {
                ...category,
                count: categoryCount ? categoryCount.count : 0,
            };
        });
        return result;
    } catch (e) {
        throw e;
    }
}

// update a category service
export async function updateCategory(
    categoryID: string,
    update: any,
    imagePath: any,
) {
    try {
        let categoryUpdate = null;
        if (imagePath) {
            const categoryPrevData = (await CategoryModel.findById(
                categoryID,
            )) as any;
            if (categoryPrevData.iconUrl) {
                await cloudinary.uploader.destroy(categoryPrevData.iconUrl);
            }
            const iconData = await cloudinary.uploader.upload(imagePath);
            const iconInput = {
                avatar: iconData?.secure_url,
                iconUrl: iconData?.public_id,
            };
            categoryUpdate = {
                ...update,
                ...iconInput,
            };
        } else {
            categoryUpdate = {
                ...update,
            };
        }
        const category = await CategoryModel.findByIdAndUpdate(
            categoryID,
            categoryUpdate,
            {
                new: true,
            },
        );
        return category;
    } catch (e) {
        throw e;
    }
}

// change a category status service
export async function changeCategoryStatus(categoryID: string) {
    try {
        const category = await CategoryModel.findById(categoryID);
        return category;
    } catch (e) {
        throw e;
    }
}

// delete a category service
export async function deleteCategory(categoryID: string) {
    try {
        // Delete image from cloudinary
        const categoryPrevData = (await CategoryModel.findById(
            categoryID,
        )) as any;
        if (categoryPrevData?.iconUrl) {
            await cloudinary.uploader.destroy(categoryPrevData.iconUrl);
        }

        const category = await CategoryModel.findByIdAndDelete(categoryID);
        return category;
    } catch (e) {
        throw e;
    }
}

// delete multiple category service
export async function deleteMultipleCategory(categoryIDs: string[]) {
    try {
        for (const categoryID of categoryIDs) {
            // Delete image from cloudinary
            const categoryPrevData = (await CategoryModel.findById(
                categoryID,
            )) as any;

            if (categoryPrevData?.iconUrl) {
                await cloudinary.uploader.destroy(categoryPrevData.iconUrl);
            }
        }

        const category = await CategoryModel.deleteMany({
            _id: { $in: categoryIDs },
        });
        return category;
    } catch (e) {
        throw e;
    }
}
