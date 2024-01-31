"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const event_1 = require("../subscribers/event");
const mailer_1 = require("../services/mailer");
const config_1 = require("../config");
const eventDispatcher_1 = require("../decorators/eventDispatcher");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const winston_1 = require("winston");
/* User service */
let UserService = class UserService {
    constructor(userModel, mailer, logger, eventDispatcher) {
        this.userModel = userModel;
        this.mailer = mailer;
        this.logger = logger;
        this.eventDispatcher = eventDispatcher;
    }
    /* Get user from id*/
    getUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findById(id).select('-password');
                return user;
            }
            catch (error) {
                throw http_errors_1.default(http_status_codes_1.default.NOT_FOUND, `User ${id} doesn't exist`);
            }
        });
    }
    /* Login user */
    loginUser(userInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // Get user from db
                const userCheck = (yield this.userModel.findOne({ username: userInput.username })) ||
                    (yield this.userModel.findOne({ email: userInput.email }));
                if (!userCheck) {
                    this.logger.debug('Warning loginUser: InValid credentials');
                    throw http_errors_1.default(http_status_codes_1.default.FORBIDDEN, `Invalid  credentials`);
                }
                // Check password
                const isMatch = yield bcrypt_1.default.compare(userInput.password, userCheck.password);
                if (!isMatch) {
                    this.logger.debug('Warning loginUser: InValid credentials');
                    throw http_errors_1.default(http_status_codes_1.default.FORBIDDEN, `Invalid  credentials`);
                }
                //Return jsonwebtoken
                const payload = {
                    user: {
                        id: userCheck.id,
                    },
                };
                const jwtSecret = config_1.config.jwtSecret;
                try {
                    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '2h' });
                    this.eventDispatcher.dispatch(event_1.AppEvents.user.signIn, userCheck);
                    return token;
                }
                catch (error) {
                    throw http_errors_1.default(http_status_codes_1.default.FORBIDDEN, `loginUser: Error jsonwebtoken`);
                }
            }
            catch (error) {
                this.logger.error(`Error loginUser: ${error.message}`);
                throw error;
            }
        });
    }
    /* Register user */
    registerUser(userInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = userInput;
            try {
                let user = yield this.userModel.findOne({ username });
                if (user) {
                    throw http_errors_1.default(http_status_codes_1.default.CONFLICT, `A user with username ${username} already exists`);
                }
                user = yield this.userModel.findOne({ email });
                if (user) {
                    throw http_errors_1.default(http_status_codes_1.default.CONFLICT, `A user with email ${email} already exists`);
                }
                // Encrypting password
                const salt = yield bcrypt_1.default.genSalt(10);
                const encryptPass = yield bcrypt_1.default.hash(password, salt);
                const userRecord = yield this.userModel.create({
                    username: username,
                    email: email,
                    password: encryptPass,
                });
                // Return password
                const payload = {
                    user: {
                        id: userRecord.id,
                    },
                };
                const jwtSecret = config_1.config.jwtSecret;
                try {
                    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '2h' });
                    yield this.mailer.SendWelcomeEmail(userRecord.email);
                    this.eventDispatcher.dispatch(event_1.AppEvents.user.signUp, userRecord);
                    this.logger.info('Success registerUser');
                    return token;
                }
                catch (error) {
                    console.log('..................', error);
                    this.logger.error(`Error registerUser: ${error.message}`);
                    throw http_errors_1.default(http_status_codes_1.default.FORBIDDEN, `RegisterUser: Error jsonwebtoken`);
                }
            }
            catch (error) {
                console.log('..................', error);
                this.logger.error(`Error registerUser: ${error.message}`);
                throw error;
            }
        });
    }
};
UserService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typedi_1.Inject('userModel')),
    tslib_1.__param(2, typedi_1.Inject('logger')),
    tslib_1.__param(3, eventDispatcher_1.EventDispatcher()),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.default.Model, mailer_1.MailerService,
        winston_1.Logger,
        eventDispatcher_1.EventDispatcherInterface])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map