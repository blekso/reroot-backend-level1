"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./config/db");
var app = (0, express_1.default)();
var tasks = require("./routes/tasks");
var ratios = require("./routes/ratios");
app.use(express_1.default.json());
app.use("/api/tasks", tasks);
app.use("/api/ratios", ratios);
db_1.sequelize.sync().catch(function (err) {
    console.log(err);
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});
