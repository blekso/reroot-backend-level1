"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express = __importStar(require("express"));
var ratio_controller_1 = require("../controllers/ratio.controller");
var task_controller_1 = require("../controllers/task.controller");
var tsyringe_1 = require("tsyringe");
var ratioController = tsyringe_1.container.resolve(ratio_controller_1.RatioController);
var taskController = tsyringe_1.container.resolve(task_controller_1.TaskController);
exports.router = express.Router();
exports.router.get('/ratios', ratioController.get);
exports.router.get('/tasks', taskController.get);
exports.router.post('/tasks', taskController.post);
exports.router.put('/tasks/:id', taskController.put);
exports.router.delete('/tasks/:id', taskController.delete);
