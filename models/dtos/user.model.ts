import { Sequelize } from "sequelize";

const { Model } = require("sequelize");
const { userSchema } = require("../entities/user.schema");

class User extends Model {
  get fullname() {
    return [this.firstname, this.lastname].join(" ");
  }
}

const createUserModel = (sequelize: Sequelize) => {
  User.init(userSchema, {
    sequelize,
    modelName: "User",
    tableName: "users",
  });

  return User;
};

export {
  createUserModel,
};
