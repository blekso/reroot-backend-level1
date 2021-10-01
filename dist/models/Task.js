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
/*class Task {
  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.completed = 0;
  }

  save() {
    let sql = `
    INSERT INTO tasks(
      title,
      dueDate,
      completed
    )
    VALUES(
      '${this.title}',
      '${this.dueDate}',
      '${this.completed}'
    )
    `;

    return db.execute(sql);
  }

  static findAllFiltered(filterQuery) {
    let sql = `SELECT * FROM tasks WHERE completed = ${filterQuery.completed}`;

    const currentDate = getConvertedDate();

    if (filterQuery.expired) {
      sql += ` AND dueDate <= '${currentDate}'`;
    } else {
      sql += ` AND dueDate >= '${currentDate}'`;
    }

    if (filterQuery.sort_by_date === "asc") {
      sql += ` ORDER BY dueDate ASC;`;
    } else {
      sql += ` ORDER BY dueDate DESC;`;
    }

    return db.execute(sql);
  }

  static findAll(id) {
    let sql = "SELECT * FROM tasks;";

    return db.execute(sql);
  }

  static UpdateById(data) {
    let sql = "UPDATE tasks SET";

    data.title ? (sql += ` title = '${data.title}'`) : "";
    data.dueDate ? (sql += ` dueDate = '${data.dueDate}'`) : "";
    data.completed ? (sql += ` completed = '${data.completed}'`) : "";

    sql += ` WHERE id = '${data.id}';`;

    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM tasks WHERE id = ${id};`;

    return db.execute(sql);
  }
}

function getConvertedDate() {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  return `${yyyy}-${mm}-${dd}`;
}*/
