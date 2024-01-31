"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const logger_1 = require("../utils/logger");
/**
 * Middleware logging every API calls
 */
exports.requestLogger = morgan_1.default('tiny', {
    stream: {
        write(msg) {
            logger_1.logger.http(msg.trimEnd());
        },
    },
});
exports.default = exports.requestLogger;
//# sourceMappingURL=requestLogger.js.map