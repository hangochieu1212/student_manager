import { Request, Response } from "express";
import { statusCodes } from "../constants/api";
import { generateResponseJson } from "../utils/response";

const userService = require("../services/user.services");
const authService = require("../services/authent.services");
const appConstant = require("../constants/constant");

const login = async (req: Request, res: Response) => {
  const {
    username,
    password,
  } = req.body;
  const userData = await userService.findByUsername(username);

  if (!userData) {
    res.status(statusCodes.NOT_FOUND)
      .json(generateResponseJson(appConstant.USER_NOT_EXIST.code, appConstant.USER_NOT_EXIST.message, null));
    return;
  }

  if (!(await authService.checkPassword(password, userData.password))) {
    res.status(statusCodes.NOT_FOUND)
      .json(generateResponseJson(appConstant.LOGIN_ERROR.code, appConstant.LOGIN_ERROR.message, null));
    return;
  }

  const tokenSecret = process.env.AUTH_TOKEN_SECRET;
  const tokenExpiry = process.env.AUTH_TOKEN_EXPIRY;
  if (tokenSecret && tokenExpiry) {
    const {
      token,
      // eslint-disable-next-line no-eval
    } = authService.generateAuthToken(userData.id, userData.email, tokenSecret, `${eval(tokenExpiry)}s`);

    res.status(statusCodes.OK)
      .json(generateResponseJson(appConstant.SUCCESS.code, appConstant.SUCCESS.message, {
        user: userData,
        token: `Bearer ${token}`,
      }));
  }
};

export {
  login,
};
