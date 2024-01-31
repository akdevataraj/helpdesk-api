"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    requestor: {
        type: Object,
        required: false
    },
    reqStatus: {
        type: String,
        required: true
    },
    comments: {
        type: Object,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: false
    },
});
const RequestModel = mongoose.model('request', RequestSchema);
exports.RequestModel = RequestModel;
exports.default = RequestModel;
module.exports = RequestModel;
//# sourceMappingURL=request.js.map