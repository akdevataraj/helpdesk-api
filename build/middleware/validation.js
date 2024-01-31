"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const express_async_handler_1 = tslib_1.__importDefault(require("express-async-handler"));
/**
 * Validate the request body
 * Data Transfer Object: DTO
 * @param type The DTO object, defining the shape of the body
 * @throws 400 - Bad request | If at least one constraint is not respected
 *
 * @example
 * import validate from 'middlewares/validationMiddleware'
 *
 * class UserSignupDto {
 *  @IsEmail()
 *  email!: string;
 *
 *  @IsString()
 *  @IsOptional()
 *  name!: string;
 *
 *  @IsString()
 *  @MinLength(8)
 *  @MaxLength(64)
 *  password!: string;
 * }
 * router.post('/users/signup', validate(UserSignupDto), ...);
 */
function validation(type) {
    return express_async_handler_1.default((req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const parsedBody = class_transformer_1.plainToClass(type, req.body);
        const errors = yield class_validator_1.validate(parsedBody);
        if (errors.length !== 0) {
            const message = errors.join('').trimEnd();
            next(http_errors_1.default(http_status_codes_1.default.BAD_REQUEST, message));
        }
        else {
            req.body = parsedBody;
            next();
        }
    }));
}
exports.validation = validation;
exports.default = validation;
//# sourceMappingURL=validation.js.map