"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const userService_1 = require("../../services/userService");
const typedi_1 = require("typedi");
const express_async_handler_1 = tslib_1.__importDefault(require("express-async-handler"));
const middleware_1 = require("../../middleware");
const user_1 = require("../../types/user");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
const { validation } = middleware_1.middleware;
// @GET '/auth'
// @DEST Get user authenticated
userRouter.get('/', 
//middleware.userAuth,
//middleware.checkObjectId,
express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // user.req always get from middleware
    const userService = typedi_1.Container.get(userService_1.UserService);
    const user = yield userService.getUser(req.user.id);
    res.json(user);
})));
userRouter.get('/me', middleware_1.middleware.userAuth, express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log('inside route');
    return res.status(200).json({ user: req.user, msg: 'hellow world' });
})));
// @POST '/auth'
// @DES Login user
userRouter.post('/login', validation(user_1.UserSigninDto), express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userService = typedi_1.Container.get(userService_1.UserService);
    const token = yield userService.loginUser(req.body);
    res.json({ token });
})));
// @POST '/auth/users'
// @DES Register user
userRouter.post('/', validation(user_1.UserSignupDto), express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userService = typedi_1.Container.get(userService_1.UserService);
    const token = yield userService.registerUser(req.body);
    res.json({ token });
})));
exports.default = userRouter;
//# sourceMappingURL=user.js.map