"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const requestService_1 = require("../../services/requestService");
const typedi_1 = require("typedi");
const express_async_handler_1 = tslib_1.__importDefault(require("express-async-handler"));
//import { middleware } from '../../middleware';
// import { requestSigninDto, requestSignupDto } from '../../types/request';
const requestRouter = express_1.Router();
exports.requestRouter = requestRouter;
//const { validation } = middleware;
// @GET '/auth'
// @DEST Get request authenticated
requestRouter.get('/', 
//middleware.requestAuth,
//middleware.checkObjectId,
express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // request.req always get from middleware
    const requestService = typedi_1.Container.get(requestService_1.RequestService);
    console.log("request parameter.............. ", req.params);
    const request = yield requestService.getRequests(req.params);
    res.json(request);
})));
requestRouter.get('/:id', 
//middleware.requestAuth,
express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const requestService = typedi_1.Container.get(requestService_1.RequestService);
    const requests = yield requestService.getRequests(req.request.id);
    return res.status(200).json(requests);
})));
requestRouter.post('/', express_async_handler_1.default((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const requestService = typedi_1.Container.get(requestService_1.RequestService);
    const token = yield requestService.saveRequest(req.body);
    res.json({ token });
})));
exports.default = requestRouter;
//# sourceMappingURL=request.js.map