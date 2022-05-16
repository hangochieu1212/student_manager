import { Sequelize } from "sequelize";

require("dotenv")
  .config();

const connect = () => {
  let sequelize = null;

  const host = process.env.DB_HOST;
  let port = 3306;
  if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT, 10);
  }
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DBNAME;

  if (database && username && password) {
    sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect: "mysql",
    });
    // @ts-ignore
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }
  return sequelize;
};

const disconnect = async (db: Sequelize) => {
  await db.close();
};

export {
  connect,
  disconnect,
};
