/** Checks if the request body contains the required fields, and that
 * none of them are blank (missing, null, or an empty/whitespace-only string) */
export default function requireBody(fields) {
  return (req, res, next) => {
    if (!req.body) return res.status(400).send("Request body is required.");

    const missing = fields.filter((field) => {
      if (!(field in req.body)) return true;
      const value = req.body[field];
      if (value === null || value === undefined) return true;
      if (typeof value === "string" && value.trim() === "") return true;
      return false;
    });

    if (missing.length > 0)
      return res.status(400).send(`Missing fields: ${missing.join(", ")}`);

    next();
  };
}
