"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const userAuth_1 = require("./userAuth");
const checkIdMongo_1 = require("./checkIdMongo");
const requestLogger_1 = require("./requestLogger");
const notFound_1 = require("./notFound");
const errorRequest_1 = require("./errorRequest");
const validation_1 = require("./validation");
exports.middleware = {
    userAuth: userAuth_1.userAuth,
    checkObjectId: checkIdMongo_1.checkObjectId,
    requestLogger: requestLogger_1.requestLogger,
    notFound: notFound_1.notFound,
    errorRequest: errorRequest_1.errorRequest,
    validation: validation_1.validation,
};
//# sourceMappingURL=index.js.map