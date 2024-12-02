"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
exports.hashPassword = hashPassword;
async function comparePassword(password, hashPassword) {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=hash.bcrypt.js.map