"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typedi_2 = require("typedi");
const config_1 = require("../config");
let MailerService = class MailerService {
    constructor(emailClient) {
        this.emailClient = emailClient;
        this.Logger = typedi_2.Container.get('logger');
    }
    SendWelcomeEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Add example for sending mail from sendgrid
            const msg = {
                from: config_1.config.emails.sender,
                to: email,
                subject: 'Welcome to our page',
                text: 'Sending with SENDGRID is fun!',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            };
            this.emailClient
                .send(msg)
                .then(() => {
                this.Logger.info(`An email has been send to ${email}`);
            })
                .catch(error => {
                this.Logger.error(`Sendgrid: ${error}`);
            });
            return { delivered: 1, status: 'ok' };
        });
    }
    StartEmailSequence(sequence, user) {
        if (!user.email) {
            throw new Error('No email provided');
        }
        // @TODO Add example of an email sequence implementation
        // Something like
        // 1 - Send first email of the sequence
        // 2 - Save the step of the sequence in database
        // 3 - Schedule job for second email in 1-3 days or whatever
        // Every sequence can have its own behavior so maybe
        // the pattern Chain of Responsibility can help here.
        return { delivered: 1, status: 'ok' };
    }
};
MailerService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typedi_1.Inject('emailClient')),
    tslib_1.__metadata("design:paramtypes", [Object])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.js.map