"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencyInjector = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
const mail_1 = tslib_1.__importDefault(require("@sendgrid/mail"));
const dependencyInjector = ({ models, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        models.forEach(m => {
            typedi_1.Container.set(m.name, m.model);
        });
        mail_1.default.setApiKey(config_1.config.emails.apiKey);
        typedi_1.Container.set('logger', logger_1.loggerDev);
        typedi_1.Container.set('emailClient', mail_1.default);
    }
    catch (error) {
        logger_1.loggerDev.error(`Error on dependency injector loader: ${error}`);
        throw error;
    }
});
exports.dependencyInjector = dependencyInjector;
exports.default = dependencyInjector;
//# sourceMappingURL=dependencyInjector.js.map