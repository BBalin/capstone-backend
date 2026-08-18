import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createMessage } from "#db/queries/messages";

const router = express.Router();
export default router;

router.post("/", requireUser, requireBody(["message"]), async (req, res) => {
  const { message } = req.body;
  const created = await createMessage(req.user.id, message);
  res.status(201).send(created);
});
