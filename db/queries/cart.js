import db from "#db/client";

export async function getCartByUserId(userId) {
  const sql = `
    SELECT *
    FROM cart
    WHERE user_id = $1
  `;
  const {
    rows: [cart],
  } = await db.query(sql, [userId]);
  return cart;
}

export async function createCart(userId) {
  const sql = `
    INSERT INTO cart
      (user_id, created, updated)
    VALUES
      ($1, now(), now())
    RETURNING *
  `;
  const {
    rows: [cart],
  } = await db.query(sql, [userId]);
  return cart;
}

export async function getCartItem(cartId, productId) {
  const sql = `
    SELECT *
    FROM cart_items
    WHERE cart_id = $1 AND product_id = $2
  `;
  const {
    rows: [item],
  } = await db.query(sql, [cartId, productId]);
  return item;
}

export async function addCartItem(cartId, productId, quantity) {
  const sql = `
    INSERT INTO cart_items
      (cart_id, product_id, quantity)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [cartId, productId, quantity]);
  return item;
}

export async function updateCartItemQuantity(id, quantity) {
  const sql = `
    UPDATE cart_items
    SET quantity = $2
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [id, quantity]);
  return item;
}
