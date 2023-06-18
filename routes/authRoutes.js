import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateprofilecontroller,
  getOrdersController,
  getAllOrdersController,
  orderstatuscontroller,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object

const router = express.Router();

//routing
//register || method post

router.post("/register", registerController);

///login || post

router.post("/login", loginController);

// forgot password
router.post("/forgotpassword", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateprofilecontroller);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderstatuscontroller
);
export default router;
