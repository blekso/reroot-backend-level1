"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.getSchema = joi_1.default.object({
    completed: joi_1.default.boolean().required(),
    expired: joi_1.default.boolean().required(),
    get_productivity_ratio: joi_1.default.boolean().required(),
});
