"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const event_dispatch_1 = require("event-dispatch");
const event_1 = require("./event");
let UserSubscriber = class UserSubscriber {
    /**
     * A example
     * save the last time a user signin, your boss will be pleased.
     *
     * Altough it works in this tiny toy API, please don't do this for a production product
     * just spamming insert/update to mongo will kill it eventualy
     *
     * Use another approach like emit events to a queue (rabbitmq/aws sqs),
     * then save the latest in Redis/Memcache or something similar
     */
    onUserSignIn({ id, username }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Logger = typedi_1.Container.get('logger');
            try {
                const UserModel = typedi_1.Container.get('userModel');
                UserModel.update({ id }, { $set: { lastLogin: new Date() } });
                Logger.info(`======> User '${username}' has been connected`);
            }
            catch (e) {
                Logger.error(`🔥 Error on event ${event_1.AppEvents.user.signIn}: %o`, e);
                // Throw the error so the process die (check src/app.ts)
                throw e;
            }
        });
    }
    onUserSignUp({ username, email }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Logger = typedi_1.Container.get('logger');
            try {
                /**
                 * @TODO implement this
                 */
                // Call the tracker tool so your investor knows that there is a new signup
                // and leave you alone for another hour.
                // TrackerService.track('user.signup', { email, _id })
                // Start your email sequence or whatever
                // MailService.startSequence('user.welcome', { email, name })
                Logger.info(`======> New user has been registered: ${username} - ${email}`);
            }
            catch (e) {
                Logger.error(`🔥 Error on event ${event_1.AppEvents.user.signUp}: %o`, e);
                // Throw the error so the process dies (check src/app.ts)
                throw e;
            }
        });
    }
};
tslib_1.__decorate([
    event_dispatch_1.On(event_1.AppEvents.user.signIn),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSubscriber.prototype, "onUserSignIn", null);
tslib_1.__decorate([
    event_dispatch_1.On(event_1.AppEvents.user.signUp),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSubscriber.prototype, "onUserSignUp", null);
UserSubscriber = tslib_1.__decorate([
    event_dispatch_1.EventSubscriber()
], UserSubscriber);
exports.default = UserSubscriber;
//# sourceMappingURL=user.js.map