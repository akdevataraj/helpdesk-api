"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerDev = exports.logger = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
//-------------------------------------------------//
//              LOGGER PROD                        //
//-------------------------------------------------//
const customFormat = winston_1.default.format.printf(args => {
    const { timestamp, level, message } = args;
    const more = args[Symbol.for('splat')];
    const moreMsg = more
        ? more.map(msg => msg instanceof Object ? JSON.stringify(msg, null, 2) : msg.toString())
        : [];
    return `${timestamp} | ${level}: ${message} ${moreMsg.join(' ')}`;
});
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), customFormat),
    transports: [
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'logs/all.log' }),
    ],
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console());
}
//-------------------------------------------------//
//              LOGGER DEV                         //
//-------------------------------------------------//
const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston_1.default.transports.Console());
}
else {
    transports.push(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat()),
    }));
}
const loggerDev = winston_1.default.createLogger({
    level: 'debug',
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    transports,
});
exports.loggerDev = loggerDev;
exports.default = logger;
//# sourceMappingURL=logger.js.map