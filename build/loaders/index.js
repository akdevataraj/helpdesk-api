"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaders = void 0;
const tslib_1 = require("tslib");
const logger_1 = require("../utils/logger");
const express_1 = require("../loaders/express");
const mongoose_1 = require("../loaders/mongoose");
const users_1 = require("../models/users");
const request_1 = require("../models/request");
const dependencyInjector_1 = require("./dependencyInjector");
require("./events");
const loaders = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    logger_1.loggerDev.info('Loaders running');
    yield mongoose_1.mongooseLoader();
    const userModel = {
        name: 'userModel',
        model: users_1.UserModel,
    };
    const requestModel = {
        name: 'requestModel',
        model: request_1.RequestModel,
    };
    yield dependencyInjector_1.dependencyInjector({
        models: [
            userModel,
            requestModel
        ],
    });
    logger_1.loggerDev.info('Dependency Injector loaded');
    logger_1.loggerDev.info('Jobs loaded');
    yield express_1.expressLoader(app);
});
exports.loaders = loaders;
//# sourceMappingURL=index.js.map