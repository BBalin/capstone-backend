import express from "express";
import { getAllProducts } from "#db/queries/products";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});
