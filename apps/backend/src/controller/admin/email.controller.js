"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createContactEmailHandler = exports.updateEmailHandler = exports.findEmailsHandler = exports.getEmailHandler = exports.createEmailHandler = void 0;
var email_service_1 = require("../../service/admin/email.service");
var nodeMailerSingle_1 = require("../../utils/nodeMailerSingle");
// create email template handller
function createEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var input, email, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = __assign({}, req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, email_service_1.createEmail)(input)];
                case 2:
                    email = _a.sent();
                    return [2 /*return*/, res.status(200).send({
                            message: 'Email template successfully created'
                        })];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_1.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createEmailHandler = createEmailHandler;
// get a email by emailType
function getEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var emailType, email, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailType = req.params.emailType;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 2:
                    email = _a.sent();
                    if (!email) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Email Template Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Email Template found successfully',
                            data: email
                        })];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_2.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getEmailHandler = getEmailHandler;
// find all emails
function findEmailsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var emails, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, email_service_1.findEmails)()];
                case 1:
                    emails = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all emails',
                        data: emails
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_3.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findEmailsHandler = findEmailsHandler;
// update a email by emailType
function updateEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var emailQuery, input, email, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailQuery = {
                        emailType: req.params.emailType
                    };
                    input = __assign({}, req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, email_service_1.updateEmail)(emailQuery, input)];
                case 2:
                    email = _a.sent();
                    if (!email) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Email Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Email updated successfully',
                            data: email
                        })];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_4.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmailHandler = updateEmailHandler;
// create contact us email handller
function createContactEmailHandler(req, res) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var input, email, e_5;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    input = {
                        name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
                        email: (_b = req.body) === null || _b === void 0 ? void 0 : _b.email,
                        mobile: (_c = req.body) === null || _c === void 0 ? void 0 : _c.mobile,
                        subject: (_d = req.body) === null || _d === void 0 ? void 0 : _d.subject,
                        message: (_e = req.body) === null || _e === void 0 ? void 0 : _e.message
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, nodeMailerSingle_1.sendSingleEmail)(input)];
                case 2:
                    email = _f.sent();
                    return [2 /*return*/, res.status(200).send({
                            message: 'Thank you for giving us an email'
                        })];
                case 3:
                    e_5 = _f.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_5.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createContactEmailHandler = createContactEmailHandler;
