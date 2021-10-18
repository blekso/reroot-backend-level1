"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var db_1 = require("./db");
var express_query_parser_1 = require("express-query-parser");
var app = (0, express_1.default)();
var routes_1 = require("./routes");
app.use(express_1.default.json());
app.use((0, express_query_parser_1.queryParser)({
    parseNull: true,
    parseBoolean: true,
    parseNumber: true
}));
app.use("/api", routes_1.router);
db_1.sequelize.sync().catch(function (err) {
    console.log(err);
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});
