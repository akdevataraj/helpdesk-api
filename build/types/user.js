"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninDto = exports.UserSignupDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/* Data transfer object */
class UserSignupDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSignupDto.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], UserSignupDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    tslib_1.__metadata("design:type", String)
], UserSignupDto.prototype, "password", void 0);
exports.UserSignupDto = UserSignupDto;
class UserSigninDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSigninDto.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSigninDto.prototype, "password", void 0);
exports.UserSigninDto = UserSigninDto;
//# sourceMappingURL=user.js.map