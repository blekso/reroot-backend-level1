import { Sequelize, sequelize } from '../db'

export const Task = sequelize.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
