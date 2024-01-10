import { Express } from "express";
import {
  changeCategoryStatusHandler,
  createCategoryHandler,
  deleteCategoryHandler,
  deleteMultipleCategoryHandler,
  disableMultipleCategoryHandler,
  findAdminCategoryHandler,
  findCategoryHandler,
  getCategoryBySlugHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "../../controller/admin/category.controller";
import { requireAdmin } from "../../middlewares/requireUser";
import upload from "../../utils/multer";

function categoryRoute(app: Express) {
  // create a category
  app.post(
    "/api/v1/ads/category",
    requireAdmin,
    upload.single("categoryIcon"),
    createCategoryHandler
  );

  // get a category by id
  app.get("/api/v1/ads/category/byId/:categoryId", getCategoryHandler);

  // get a category by slug
  app.get("/api/v1/ads/category/:categorySlug", getCategoryBySlugHandler);

  // find all categories public
  app.get("/api/v1/ads/category", findCategoryHandler);

  // find all categories admin private
  app.get("/api/v1/ads/admin/category", requireAdmin, findAdminCategoryHandler);

  // update a category
  app.put(
    "/api/v1/ads/category/:categoryId",
    requireAdmin,
    upload.single("categoryIcon"),
    updateCategoryHandler
  );

  // change a category status by id
  app.put(
    "/api/v1/ads/category/status/:categoryId",
    requireAdmin,
    changeCategoryStatusHandler
  );

  // disable multiple category status by ids
  app.put(
    "/api/v1/ads/multiselect/category/status",
    requireAdmin,
    disableMultipleCategoryHandler
  );

  // delete a category
  app.delete(
    "/api/v1/ads/category/:categoryId",
    requireAdmin,
    deleteCategoryHandler
  );

  // delete multiple category
  app.delete(
    "/api/v1/ads/multiselect/category",
    requireAdmin,
    deleteMultipleCategoryHandler
  );
}

export default categoryRoute;
