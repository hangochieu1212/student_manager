const statusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const apiPaths = {
  getUsers: "/",
  getUser: "/",
  login: "/login",
  createUser: "/",
  updateUser: "/",
  deleteUser: "/",
};

export {
  statusCodes,
  apiPaths,
};
