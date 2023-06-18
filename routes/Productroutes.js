import app from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreepaymentcontroller,
  braintreetokencontroller,
  createproductcontroller,
  deleteproductcontroller,
  getproductscontroller,
  getsingleproductcontroller,
  productcountcontroller,
  productfiltercontroller,
  productlistcontroller,
  productphotocontroller,
  searchpagecontroller,
  updateeproductcontroller,
} from "../controllers/productcontroller.js";
import formidable from "express-formidable";

const router = app.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createproductcontroller
);
//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateeproductcontroller
);
//get products
router.get("/get-product", getproductscontroller);

//single product
router.get("/get-product/:slug", getsingleproductcontroller);

// photo-product
router.get("/product-photo/:pid", productphotocontroller);

//delete products
router.delete("/delete-product/:pid", deleteproductcontroller);

// filter product
router.post("/product-filters", productfiltercontroller);

// product-count
router.get("/product-count", productcountcontroller);

// product per page
router.get("/product-list/:page", productlistcontroller);

//search product
router.get("/search/:keyword", searchpagecontroller);

// payment routes
// token
router.get("/braintree/token", braintreetokencontroller);

//payments
router.post("/braintree/payment", requireSignIn, braintreepaymentcontroller);

export default router;
