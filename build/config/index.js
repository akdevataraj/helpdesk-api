"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODES = exports.config = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGODB_URI = process.env.ONGODB_URI || 'mongodb://localhost:27017/MyDb';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}
exports.config = {
    port: process.env.PORT || 5000,
    dbUrl: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        // Used by winston logger
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    emails: {
        // SENDGRID email credentials
        apiKey: process.env.SENDGRID_API_KEY,
        sender: process.env.SENDGRID_SENDER,
    },
};
var MODES;
(function (MODES) {
    MODES["TEST"] = "test";
    MODES["LOCAL"] = "local";
    MODES["DEV"] = "development";
    MODES["PROD"] = "production";
})(MODES = exports.MODES || (exports.MODES = {}));
//# sourceMappingURL=index.js.map