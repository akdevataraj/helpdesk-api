"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please enter an email'],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
}, { timestamps: true });
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.UserModel = UserModel;
exports.default = UserModel;
//# sourceMappingURL=users.js.map