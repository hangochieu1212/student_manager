import { Request, Response } from "express";
import { statusCodes } from "../constants/api";
import { generateResponseJson } from "../utils/response";

const userService = require("../services/user.services");
const authService = require("../services/authent.services");
const appConstant = require("../constants/constant");

const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.status(statusCodes.OK)
    .json(generateResponseJson(appConstant.SUCCESS.code, appConstant.SUCCESS.message, users));
};

const getUser = async (req: Request, res: Response) => {
  if (!req.params.userId) {
    res.status(statusCodes.BAD_REQUEST)
      .json(generateResponseJson(appConstant.USER_ID_INVALID.code, appConstant.USER_ID_INVALID.message, null));
    return;
  }

  const userId = parseInt(req.params.userId, 10);
  const userData = await userService.findById(userId);

  res.status(statusCodes.OK)
    .json(generateResponseJson(appConstant.SUCCESS.code, appConstant.SUCCESS.message, userData));
};

const createUser = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
  } = req.body;

  if (await userService.findByEmail(email)) {
    res.status(statusCodes.CONFLICT)
      .json(generateResponseJson(appConstant.EMAIL_IS_EXIST.code, appConstant.EMAIL_IS_EXIST.message, null));
    return;
  }

  if (await userService.findByUsername(username)) {
    res.status(statusCodes.CONFLICT)
      .json(generateResponseJson(appConstant.USER_NAME_IS_EXIST.code, appConstant.USER_NAME_IS_EXIST.message, null));
    return;
  }

  const hashedPassword = await authService.hashPassword(password);
  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
  });

  res.status(statusCodes.OK)
    .json(generateResponseJson(appConstant.SUCCESS.code, appConstant.SUCCESS.message, user));
};

/* Update user */
const updateUser = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    username,
    email,
  } = req.body;

  if (!req.params.userId) {
    res.status(statusCodes.BAD_REQUEST)
      .json(generateResponseJson(appConstant.USER_ID_INVALID.code, appConstant.USER_ID_INVALID.message, null));
    return;
  }

  const userId = parseInt(req.params.userId, 10);
  const userData = await userService.findById(userId);

  if (!userData) {
    res.status(statusCodes.NOT_FOUND)
      .json(generateResponseJson(appConstant.USER_NOT_EXIST.code, appConstant.USER_NOT_EXIST.message, null));
    return;
  }

  await userService.updateUser(userId, {
    firstname,
    lastname,
    email,
    username,
  });

  const updatedUser = await userService.findById(userId);

  res.status(statusCodes.OK)
    .json(generateResponseJson(appConstant.SUCCESS.code, appConstant.SUCCESS.message, updatedUser));
};

const deleteUser = async (req: Request, res: Response) => {
  if (!req.params.userId) {
    res.status(statusCodes.BAD_REQUEST)
      .json(generateResponseJson(appConstant.USER_ID_INVALID.code, appConstant.USER_ID_INVALID.message, null));
    return;
  }

  const userId = parseInt(req.params.userId, 10);
  const userData = await userService.findById(userId);

  if (!userData) {
    const responseData = {
      errors: [{
        msg: "User not found!",
      }],
    };

    res.status(statusCodes.NOT_FOUND)
      .json(responseData);
    return;
  }

  await userService.deleteUser(userId);

  res.status(statusCodes.OK)
    .json({});
};

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
