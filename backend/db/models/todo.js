import { DataTypes } from "sequelize";
import db from "../connector";

const Todo = db.define("todo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
  },
  userEmail: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  editedByAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Todo.sync();

export default Todo;
