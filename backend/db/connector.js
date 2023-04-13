import { Sequelize } from "sequelize";
import config from "../config";

const { db } = config;

const dbConnector = new Sequelize(
  `postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`,
  {
    logging: false,
  }
);

export default dbConnector;
