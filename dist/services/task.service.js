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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
var task_model_1 = require("../models/task.model");
var task_schema_1 = require("../schemas/task.schema");
var sequelize_1 = require("sequelize");
var TaskService = /** @class */ (function () {
    function TaskService() {
        var _this = this;
        this.validateGet = function (req) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, task_schema_1.getSchema.validate(req)];
            });
        }); };
        this.validatePost = function (req) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, task_schema_1.postSchema.validate(req)];
            });
        }); };
        this.validatePut = function (req) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, task_schema_1.putSchema.validate(req)];
            });
        }); };
        this.get = function (filterQuery) { return __awaiter(_this, void 0, void 0, function () {
            var tasks;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, task_model_1.Task.findAll({
                            raw: true,
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
                    case 1:
                        tasks = _b.sent();
                        return [2 /*return*/, tasks];
                }
            });
        }); };
        this.post = function (newTask) { return __awaiter(_this, void 0, void 0, function () {
            var task, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task_model_1.Task.create({
                                title: newTask.title,
                                dueDate: newTask.dueDate,
                                completed: newTask.completed,
                            })];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.put = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var task, err_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, task_model_1.Task.findOne({
                                raw: true,
                                where: { id: req.params.id },
                            })];
                    case 1:
                        task = _d.sent();
                        return [4 /*yield*/, task_model_1.Task.update({
                                title: (_a = req.body.title) !== null && _a !== void 0 ? _a : task.title,
                                dueDate: (_b = req.body.dueDate) !== null && _b !== void 0 ? _b : task.dueDate,
                                completed: (_c = req.body.completed) !== null && _c !== void 0 ? _c : task.completed,
                            }, {
                                where: {
                                    id: req.params.id,
                                },
                            })];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, "Task with id " + req.params.id + " is updated"];
                    case 3:
                        err_2 = _d.sent();
                        return [2 /*return*/, err_2];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task_model_1.Task.destroy({
                                where: {
                                    id: req.params.id,
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Task with id " + req.params.id + " is deleted"];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, err_3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return TaskService;
}());
exports.TaskService = TaskService;