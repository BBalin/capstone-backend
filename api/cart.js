import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  getCartByUserId,
  createCart,
  getCartItem,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  getCartItemsByUserId,
  getCartItemWithOwner,
} from "#db/queries/cart";

const router = express.Router();
export default router;

router.get("/", requireUser, async (req, res) => {
  const items = await getCartItemsByUserId(req.user.id);
  res.send(items);
});

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

router.patch(
  "/items/:id",
  requireUser,
  requireBody(["quantity"]),
  async (req, res) => {
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).send("Quantity must be a positive whole number.");
    }

    const existingItem = await getCartItemWithOwner(req.params.id);
    if (!existingItem) {
      return res.status(404).send("Cart item not found.");
    }
    if (existingItem.user_id !== req.user.id) {
      return res.status(403).send("That item isn't in your cart.");
    }

    const item = await updateCartItemQuantity(req.params.id, quantity);
    res.send(item);
  },
);

router.delete("/items/:id", requireUser, async (req, res) => {
  const existingItem = await getCartItemWithOwner(req.params.id);
  if (!existingItem) {
    return res.status(404).send("Cart item not found.");
  }
  if (existingItem.user_id !== req.user.id) {
    return res.status(403).send("That item isn't in your cart.");
  }
  const item = await removeCartItem(req.params.id);
  res.send(item);
});
