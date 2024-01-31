"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = require("../routes");
const config_1 = require("../config");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const middleware_1 = require("../middleware");
const expressLoader = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/', (req, res) => {
        res.send('Hi there!');
    });
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    /* Middleware*/
    app.use(middleware_1.middleware.requestLogger);
    app.use(cors_1.default({ origin: true }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(helmet_1.default());
    /*  Proxy rules */
    app.set('trust proxy', true);
    /*  Routes  */
    app.use(config_1.config.api.prefix, routes_1.appRouter);
    /*  404 middleware  */
    app.use(middleware_1.middleware.notFound);
    /*  Error middleware  */
    app.use(middleware_1.middleware.errorRequest);
});
exports.expressLoader = expressLoader;
//# sourceMappingURL=express.js.map