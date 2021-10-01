"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var db_1 = require("../config/db");
exports.Task = db_1.sequelize.define("task", {
    id: {
        type: db_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: db_1.Sequelize.STRING,
        allowNull: false,
    },
    dueDate: {
        type: db_1.Sequelize.DATE,
        allowNull: false,
    },
    completed: {
        type: db_1.Sequelize.BOOLEAN,
        allowNull: false,
    },
});
