"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const user_1 = require("./api/user");
const request_1 = require("./api/request");
const appRouter = express_1.Router();
exports.appRouter = appRouter;
appRouter.use('/user', user_1.userRouter);
appRouter.use('/request', request_1.requestRouter);
exports.default = appRouter;
//# sourceMappingURL=index.js.map