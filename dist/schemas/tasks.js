"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putSchema = exports.getSchema = exports.postSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.postSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    dueDate: joi_1.default.string().max(10).required(),
    completed: joi_1.default.boolean().required(),
});
exports.getSchema = joi_1.default.object({
    completed: joi_1.default.boolean(),
    sort_by_date: joi_1.default.string().max(4).required(),
    page: joi_1.default.number().required(),
    filter_by_title: joi_1.default.string().empty("").default("default value"),
});
exports.putSchema = joi_1.default.object({
    title: joi_1.default.string().max(100),
    dueDate: joi_1.default.string().max(10),
    completed: joi_1.default.boolean(),
});
