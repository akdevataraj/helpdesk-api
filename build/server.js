"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const config_1 = require("../src/config");
const logger_1 = require("../src/utils/logger");
const loaders_1 = require("../src/loaders");
const startServer = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    yield loaders_1.loaders(app);
    logger_1.loggerDev.debug(`MODE ENV ${process.env.NODE_ENV}`);
    app
        .listen(config_1.config.port, () => {
        logger_1.loggerDev.info(`Server listening on port: ${config_1.config.port}`);
    })
        .on('error', err => {
        logger_1.loggerDev.error(err);
        process.exit(1);
    });
});
startServer();
//# sourceMappingURL=server.js.map