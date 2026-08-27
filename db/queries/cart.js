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

export async function removeCartItem(id) {
  const sql = `
    DELETE FROM cart_items
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}

export async function getCartItemsByUserId(userId) {
  const sql = `
    SELECT cart_items.id, cart_items.quantity, 
    products.id AS product_id, products.name, products.price,
    products.description, products.image_url
    FROM cart_items
    JOIN cart ON cart_items.cart_id = cart.id
    JOIN products on cart_items.product_id = products.id
    WHERE cart.user_id = $1
    ORDER BY cart_items.id
  `;
  const { rows: items } = await db.query(sql, [userId]);
  return items;
}

export async function getCartItemWithOwner(id) {
  const sql = `
    SELECT cart_items.*, cart.user_id
    FROM cart_items
    JOIN cart ON cart_items.cart_id = cart.id
    WHERE cart_items.id = $1
  `;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}
