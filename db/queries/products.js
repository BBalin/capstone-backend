import db from "#db/client";

export async function createProducts(name, price, description, image_url) {
  const sql = `
        INSERT INTO products
        (name, price, description, image_url)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
    `;
  const {
    rows: [product],
  } = await db.query(sql, [name, price, description, image_url]);
  return product;
}

export async function getAllProducts() {
  const sql = `
        SELECT * 
        FROM products
    `;
  const { rows: products } = await db.query(sql);
  return products;
}
