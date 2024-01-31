"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
/**
 * Middleware always throwing a 404 error
 * Need to be injected into express middlewares AFTER the router,
 * so as every requests not handled by the router are trapped here
 *
 * @throws 404 - Not found
 */
const notFound = (req, res, next) => next(http_errors_1.default(http_status_codes_1.default.NOT_FOUND, `${req.url} not found`));
exports.notFound = notFound;
exports.default = notFound;
//# sourceMappingURL=notFound.js.map