"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Task_1 = require("../models/Task");
var joi_1 = __importDefault(require("joi"));
var sequelize_1 = require("sequelize");
var router = express_1.default.Router();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schama, error, filterQuery, tasks, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schama = joi_1.default.object({
                    completed: joi_1.default.boolean(),
                    sort_by_date: joi_1.default.string().max(4).required(),
                    page: joi_1.default.number().required(),
                    filter_by_title: joi_1.default.string().empty("").default("default value"),
                });
                error = schama.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                filterQuery = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Task_1.Task.findAll({
                        offset: filterQuery.page * 5,
                        limit: 5,
                        where: {
                            title: (_a = {},
                                _a[sequelize_1.Op.like] = "%" + filterQuery.filter_by_title + "%",
                                _a),
                            completed: filterQuery.completed,
                        },
                        order: [["dueDate", filterQuery.sort_by_date.toUpperCase()]],
                    })];
            case 2:
                tasks = _b.sent();
                res.status(200).json(tasks);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schama, error, task, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schama = joi_1.default.object({
                    title: joi_1.default.string().min(3).max(255).required(),
                    dueDate: joi_1.default.string().max(10).required(),
                    completed: joi_1.default.boolean().required(),
                });
                error = schama.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Task_1.Task.create({
                        title: req.body.title,
                        dueDate: req.body.dueDate,
                        completed: req.body.completed,
                    })];
            case 2:
                task = _a.sent();
                res.status(200).json(task);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schama, error;
    return __generator(this, function (_a) {
        schama = joi_1.default.object({
            id: joi_1.default.number().required(),
            title: joi_1.default.string().min(3).max(255),
            dueDate: joi_1.default.string().max(10),
            completed: joi_1.default.boolean(),
        });
        error = schama.validate(req.body).error;
        if (error)
            return [2 /*return*/, res.status(400).send(error.details[0].message)];
        try {
            Task_1.Task.findAll({
                where: { id: req.body.id },
            })
                .then(function (task) {
                console.log(task[0].dataValues);
                Task_1.Task.update({
                    title: req.body.title ? req.body.title : task[0].dataValues.title,
                    dueDate: req.body.dueDate
                        ? req.body.dueDate
                        : task[0].dataValues.dueDate,
                    completed: req.body.completed
                        ? req.body.completed
                        : task[0].dataValues.completed,
                }, {
                    where: {
                        id: req.body.id,
                    },
                })
                    .then(function (result) {
                    res.status(200).json("Task with id " + req.body.id + " is updated");
                })
                    .catch(function (err) {
                    res.send(err);
                });
            })
                .catch(function (err) {
                res.send(err);
            });
        }
        catch (err) {
            res.send(err);
        }
        return [2 /*return*/];
    });
}); });
router.delete("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schama, error;
    return __generator(this, function (_a) {
        schama = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
        error = schama.validate(req.body).error;
        if (error)
            return [2 /*return*/, res.status(400).send(error.details[0].message)];
        try {
            Task_1.Task.destroy({
                where: {
                    id: req.body.id,
                },
            })
                .then(function (result) {
                res.status(200).json("Task with id " + req.body.id + " is deleted");
            })
                .catch(function (err) {
                res.send(err);
            });
        }
        catch (err) {
            res.send(err);
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
