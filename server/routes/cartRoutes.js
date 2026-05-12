import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);

router.post("/", addToCart);

router.put("/:id", updateCartQuantity);

router.delete("/:id", deleteCartItem);

export default router;