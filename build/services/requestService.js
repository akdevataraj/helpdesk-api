"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
// import { IUser, IUserInput, IUserService } from '../types/user';
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const winston_1 = require("winston");
/* User service */
let RequestService = class RequestService {
    constructor(requestModel, logger) {
        this.requestModel = requestModel;
        this.logger = logger;
    }
    /* Get request from id*/
    getRequestyId(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield this.requestModel.findById(id);
                return request;
            }
            catch (error) {
                throw http_errors_1.default(http_status_codes_1.default.NOT_FOUND, `Request ${id} doesn't exist`);
            }
        });
    }
    getRequests(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const requests = yield this.requestModel.find(filter);
                return requests;
            }
            catch (error) {
                throw http_errors_1.default(http_status_codes_1.default.NOT_FOUND, ``);
            }
        });
    }
    /* Register request */
    saveRequest(requestInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const requestRecord = yield this.requestModel.create(requestInput);
                this.logger.info('Request created successfully');
                return requestRecord;
            }
            catch (error) {
                console.log(error);
                this.logger.error(`Error create request: ${error}`);
                throw http_errors_1.default(http_status_codes_1.default.BAD_REQUEST, `CreateRequest: Error`);
            }
        });
    }
};
RequestService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typedi_1.Inject('requestModel')),
    tslib_1.__param(1, typedi_1.Inject('logger')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.default.Model, winston_1.Logger])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=requestService.js.map