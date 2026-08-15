import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  getCartByUserId,
  createCart,
  getCartItem,
  addCartItem,
  updateCartItemQuantity,
} from "#db/queries/cart";

const router = express.Router();
export default router;

router.post(
  "/",
  requireUser,
  requireBody(["product_id", "quantity"]),
  async (req, res) => {
    const { product_id, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).send("Quantity must be a positive whole number.");
    }

    let cart = await getCartByUserId(req.user.id);
    if (!cart) cart = await createCart(req.user.id);

    const existingItem = await getCartItem(cart.id, product_id);

    const item = existingItem
      ? await updateCartItemQuantity(
          existingItem.id,
          existingItem.quantity + quantity,
        )
      : await addCartItem(cart.id, product_id, quantity);

    res.status(201).send(item);
  },
);
