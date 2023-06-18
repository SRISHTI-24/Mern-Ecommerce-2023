import app from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categorycontroller,
  createcategorycontroller,
  deletecategorycontroller,
  singlecategorycontroller,
  updatecategorycontroller,
} from "../controllers/Categorycontroller.js";
const router = app.Router();

//router

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createcategorycontroller
);

// update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updatecategorycontroller
);
export default router;

//get all
router.get("/get-category", categorycontroller);

// single category
router.get("/single-category/:slug", singlecategorycontroller);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deletecategorycontroller
);
