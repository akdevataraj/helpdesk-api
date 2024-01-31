"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseLoader = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const mongooseLoader = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const db = config_1.config.dbUrl;
    try {
        const mongoConnection = yield mongoose_1.default.connect(db, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        logger_1.loggerDev.info('MongoDB has been connected');
        return mongoConnection.connection.db;
    }
    catch (err) {
        logger_1.loggerDev.error(err.message);
        process.exit(1);
    }
});
exports.mongooseLoader = mongooseLoader;
//# sourceMappingURL=mongoose.js.map