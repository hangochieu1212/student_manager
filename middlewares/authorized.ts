import { NextFunction, Request, Response } from "express";

require("dotenv")
  .config();
const { generateResponseJson } = require("../utils/response");
const appConstant = require("../constants/constant");
const { statusCodes } = require("../constants/api");
const userService = require("../services/user.services");
const authService = require("../services/authent.services");

// @ts-ignore
const authorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userKey = req.header("Authorization");

    if (!userKey) {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.INVALID_ACCESS_TOKEN.code, appConstant.INVALID_ACCESS_TOKEN.message, null));
    }

    const bearerData = userKey.split(" ");

    if (!Array.isArray(bearerData) || bearerData.length !== 2) {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.INVALID_ACCESS_TOKEN.code, appConstant.INVALID_ACCESS_TOKEN.message, null));
    }

    const [bearerString, bearerToken] = bearerData;

    if (!bearerToken || bearerString !== "Bearer") {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.INVALID_ACCESS_TOKEN.code, appConstant.INVALID_ACCESS_TOKEN.message, null));
    }

    const tokenSecret = process.env.AUTH_TOKEN_SECRET;
    const decoded = authService.decodeAuthToken(bearerToken, tokenSecret);

    if (!decoded) {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.INVALID_ACCESS_TOKEN.code, appConstant.INVALID_ACCESS_TOKEN.message, null));
    }

    const {
      userId,
    } = decoded;

    const userExists = await userService.findById(userId);

    if (!userExists) {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.INVALID_ACCESS_TOKEN.code, appConstant.INVALID_ACCESS_TOKEN.message, null));
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(statusCodes.UNAUTHORIZED)
        .json(generateResponseJson(appConstant.ACCESS_TOKEN_IS_EXPIRED.code, appConstant.ACCESS_TOKEN_IS_EXPIRED.message, null));
    }

    next(err);
  }
};
export {
  authorized,
};
