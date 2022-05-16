import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import validate from "../utils/validate";

const express = require("express");

const router = express.Router();
const { apiPaths } = require("../constants/api");

const {
  validated,
  authorized,
} = require("../middlewares");

/* GET users listing. */
router.get(
  apiPaths.getUsers,
  authorized,
  getUsers,
);
/* GET user info */
router.get(`${apiPaths.getUser}:userId`, getUser);
/* POST create user */
router.post(
  apiPaths.createUser,
  authorized,
  validated(validate("firstname", "lastname", "username", "email", "password", "confirmPassword")),
  createUser,
);
/* PUT update user */
router.put(
  `${apiPaths.updateUser}:userId`,
  authorized,
  validated(validate("id", "firstname", "lastname", "username", "email")),
  updateUser,
);
/* DELETE delete user */
router.delete(
  `${apiPaths.deleteUser}:userId`,
  authorized,
  deleteUser,
);

module.exports = router;
