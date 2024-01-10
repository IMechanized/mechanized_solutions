import { Request, Response } from 'express';
import CategoryModel from '../../models/admin/category.model';
import {
    changeCategoryStatus,
    createCategory,
    deleteCategory,
    deleteMultipleCategory,
    findAdminCategory,
    findCategory,
    getCategory,
    getCategoryBySlug,
    updateCategory,
} from '../../service/admin/category.service';
var slug = require('slug');

// create category handller
export async function createCategoryHandler(req: Request, res: Response) {
    try {
        //Category slug
        let categorySlug = slug(req.body.categoryTitle, { lower: true });
        const getCategoryInfo = await getCategoryBySlug(categorySlug);
        if (getCategoryInfo) {
            categorySlug =
                categorySlug + '-' + Math.floor(100 + Math.random() * 900);
        }

        const categoryData = {
            categoryTitle: req.body.categoryTitle,
            slug: categorySlug,
        };
        const imagePath = req.file?.path;
        const category = await createCategory(categoryData, imagePath);
        res.status(200).json({
            message: `Category ${category.categoryTitle} created successfully`,
        });
    } catch (e: any) {
        console.log(e);
        e === 11000
            ? res.status(400).json({
                  message: 'category already exist',
                  error: e,
              })
            : res.status(500).send({
                  message: 'something went wrong',
                  error: e,
              });
    }
}

// get category handller by id
export async function getCategoryHandler(req: Request, res: Response) {
    const categoryID = req.params.categoryId;

    // get a category
    try {
        const category = await getCategory(categoryID);

        if (!category) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }
        return res.status(200).send({
            message: 'Category Found',
            data: category,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// get category handller by slug
export async function getCategoryBySlugHandler(req: Request, res: Response) {
    const categorySlug = req.params.categorySlug;
    // get a category
    try {
        const category = await getCategoryBySlug(categorySlug);

        if (!category) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }
        return res.status(200).send({
            message: 'Category Found',
            data: category,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all categories public handller
export async function findCategoryHandler(req: Request, res: Response) {
    try {
        const categories = await findCategory();
        res.status(200).send({
            message: 'Successfully find all Categories',
            data: categories,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// find all categories admin private handller
export async function findAdminCategoryHandler(req: Request, res: Response) {
    try {
        const categories = await findAdminCategory();
        res.status(200).send({
            message: 'Successfully find all Categories',
            data: categories,
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// update category handller
export async function updateCategoryHandler(req: Request, res: Response) {
    const categoryID = req.params.categoryId;
    try {
        //Category slug
        let categorySlug = slug(req.body.categoryTitle, { lower: true });
        const getCategoryInfo = await getCategoryBySlug(categorySlug);
        if (getCategoryInfo) {
            categorySlug =
                categorySlug + '-' + Math.floor(100 + Math.random() * 900);
        }

        const imagePath = req.file?.path as any;
        const categoryData = {
            categoryTitle: req.body.categoryTitle,
            slug: categorySlug,
        };
        const category = await updateCategory(
            categoryID,
            categoryData,
            imagePath,
        );

        if (!category) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }
        return res.status(200).send({
            message: 'Category Updated',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  change a category status handller
export async function changeCategoryStatusHandler(req: Request, res: Response) {
    const categoryID = req.params.categoryId;
    const categoryStatus = req.body.status;

    try {
        const category = (await changeCategoryStatus(categoryID)) as any;

        switch (categoryStatus) {
            case 'enbable':
                category.status.isActive = true;
                category.save();
                return res.status(200).send({
                    message: 'Category is activated successfully',
                });

            case 'disable':
                category.status.isActive = false;
                category.save();
                return res.status(200).send({
                    message: 'Category is deactivated successfully',
                });

            default:
                return res.status(400).send({
                    message: 'Invalid status',
                });
        }
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

//  disable multiple category status handller
export async function disableMultipleCategoryHandler(
    req: Request,
    res: Response,
) {
    const categoryIDs = req.body.categoryIds;
    const inputCategoryIds = categoryIDs?.split(',');

    try {
        const categories = await CategoryModel.find({
            _id: {
                $in: inputCategoryIds,
            },
        });
        if (!categories) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }

        categories.forEach(async (category: any) => {
            category.status.isActive = false;
            category.save();
        });

        return res.status(200).send({
            message: 'Categories are disabled successfully',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete category handller
export async function deleteCategoryHandler(req: Request, res: Response) {
    const categoryID = req.params.categoryId;
    // delete a category
    try {
        const category = await deleteCategory(categoryID);

        if (!category) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }
        return res.status(200).send({
            message: 'Category Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}

// delete multiple  category handller
export async function deleteMultipleCategoryHandler(
    req: Request,
    res: Response,
) {
    const categoryIDs = req.body.categoryIds;
    const inputCategoryIds = categoryIDs?.split(',');

    try {
        const category = await deleteMultipleCategory(inputCategoryIds);

        if (!category) {
            return res.status(404).send({
                message: 'Category Not Found',
            });
        }
        return res.status(200).send({
            message: 'Category Deleted',
        });
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
}
