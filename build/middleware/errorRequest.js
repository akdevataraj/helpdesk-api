"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRequest = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const logger_1 = require("../utils/logger");
const appRo_1 = require("../types/appRo");
/**
 * Error middleware
 * Every error thrown in a route ends up here to be sent to the user
 * They are formatted into a generic RO, to have uniform error replies
 *
 * Not wanted errors (for example, a crash in the route) are
 * converted into a 500 - Internal server errors
 */
const errorRequest = (err, req, res, _) => {
    var _a;
    logger_1.logger.error(err.message);
    // If the error is not an HTTP error, the whole object is printed through console.error
    if (!http_errors_1.default.isHttpError(err)) {
        logger_1.loggerDev.error(err);
    }
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    res.status(status).send(appRo_1.ErrorRo(status, err.message));
};
exports.errorRequest = errorRequest;
exports.default = errorRequest;
//# sourceMappingURL=errorRequest.js.map