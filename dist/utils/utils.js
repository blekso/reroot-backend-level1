"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
function getDate() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    return yyyy + "-" + mm + "-" + dd;
}
exports.getDate = getDate;
