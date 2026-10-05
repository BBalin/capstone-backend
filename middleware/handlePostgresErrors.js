const ERRORS = {
  INVALID_TYPE: "22P02",
  UNIQUE_VIOLATION: "23505",
  FOREIGN_KEY_VIOLATION: "23503",
};

const UNIQUE_MESSAGES = {
  users_username_key: "That username is already taken.",
  users_email_key: "An account with that email already exists.",
};

export default function handlePostgresErrors(err, req, res, next) {
  switch (err.code) {
    case ERRORS.INVALID_TYPE:
      return res.status(400).send(err.message);
    case ERRORS.FOREIGN_KEY_VIOLATION:
    case ERRORS.UNIQUE_VIOLATION:
      return res
        .status(400)
        .send(UNIQUE_MESSAGES[err.constraint] ?? "That already exists.");
    default:
      next(err);
  }
}
