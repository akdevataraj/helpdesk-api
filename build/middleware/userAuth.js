"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const express_async_handler_1 = tslib_1.__importDefault(require("express-async-handler"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const userAuth = express_async_handler_1.default((req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-auth-token');
    if (!token) {
        next(http_errors_1.default(http_status_codes_1.default.BAD_REQUEST, 'No token, authorization denied'));
    }
    const jwtSecret = config_1.config.jwtSecret;
    jsonwebtoken_1.default.verify(token, jwtSecret, function (err, decoded) {
        if (err) {
            next(http_errors_1.default(http_status_codes_1.default.BAD_REQUEST, 'Token not valid'));
            return;
        }
        req.user = decoded.user;
        next();
    });
}));
exports.userAuth = userAuth;
//# sourceMappingURL=userAuth.js.map