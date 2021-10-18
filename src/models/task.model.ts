import { sequelize } from '../db'
import { DataTypes, Model, Optional } from "sequelize";

interface TaskAttributes {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}
export interface TaskInput extends Optional<TaskAttributes, 'id'> {}

export class Task extends Model<TaskAttributes, TaskInput> implements TaskAttributes {
  public id!: number
  public title!: string
  public dueDate!: string
  public completed!: boolean
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize
})