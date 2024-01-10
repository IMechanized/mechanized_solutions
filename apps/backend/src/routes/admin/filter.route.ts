import { Express } from "express";
import {
  createFilterHandler,
  findFiltersHandler,
} from "../../controller/admin/filter.controller";
import { validateFilter } from "../../middlewares/admin/filter.validate";
import { requireAdmin } from "../../middlewares/requireUser";

function filterRoute(app: Express) {
  // create a filter
  app.post(
    "/api/v1/admin/filters",
    requireAdmin,
    validateFilter,
    createFilterHandler
  );

  // find all filters
  app.get("/api/v1/admin/filters", findFiltersHandler);
}

export default filterRoute;
