import { connect } from "../configs/database";

const sequelize = connect();

const User = require("./dtos/user.model")
  .createUserModel(sequelize);

// @ts-ignore
sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  });

export {
  User,
};
