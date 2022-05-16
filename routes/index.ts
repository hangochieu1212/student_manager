import { login } from "../controllers/authent.controller";
import validate from "../utils/validate";

const express = require("express");

const router = express.Router();

const { apiPaths } = require("../constants/api");

const { validated } = require("../middlewares");

/* POST login. */
router.post(
  apiPaths.login,
  validated(validate("username", "password")),
  login,
);

module.exports = router;
