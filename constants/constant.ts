const SUCCESS = {
  code: 200,
  message: "Success",
};

const CREATE_USER_ERROR = {
  code: 201,
  message: "Create user fail",
};

const UPDATE_USER_ERROR = {
  code: 202,
  message: "Update user error",
};

const EMAIL_IS_EXIST = {
  code: 203,
  message: "Email address is not available",
};

const USER_NAME_IS_EXIST = {
  code: 204,
  message: "Username is not available",
};

const USER_NOT_EXIST = {
  code: 205,
  message: "User not exist",
};

const LOGIN_ERROR = {
  code: 206,
  message: "Username and password is invalid",
};

const USER_ID_INVALID = {
  code: 207,
  message: "User id is invalid",
};

const INVALID_ACCESS_TOKEN = {
  code: 208,
  message: "Invalid access token!",
};

const ACCESS_TOKEN_IS_EXPIRED = {
  code: 209,
  message: "Access token is expired",
};
export {
  SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_ERROR,
  EMAIL_IS_EXIST,
  USER_NAME_IS_EXIST,
  USER_NOT_EXIST,
  LOGIN_ERROR,
  USER_ID_INVALID,
  INVALID_ACCESS_TOKEN,
  ACCESS_TOKEN_IS_EXPIRED,
};
