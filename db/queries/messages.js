import db from "#db/client";

export async function createMessage(userId, message) {
  const sql = `
    INSERT INTO messages
      (user_id, message)
    VALUES
      ($1, $2)
    RETURNING *
  `;
  const {
    rows: [created],
  } = await db.query(sql, [userId, message]);
  return created;
}
