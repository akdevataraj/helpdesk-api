"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectId = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const checkObjectId = (id) => (req, res, next) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params[id])) {
        res.status(400).json({ msg: 'Invalid id' });
    }
    next();
};
exports.checkObjectId = checkObjectId;
//# sourceMappingURL=checkIdMongo.js.map