import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 3000;

await db.query("SELECT 1");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
