"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRo = void 0;
/**
 * Construct a basic error RO
 *
 * @param statusCode HTTP status code
 * @param message Error message
 * @constructor
 */
function ErrorRo(statusCode, message) {
    return {
        error: {
            statusCode,
            message,
        },
    };
}
exports.ErrorRo = ErrorRo;
//# sourceMappingURL=appRo.js.map