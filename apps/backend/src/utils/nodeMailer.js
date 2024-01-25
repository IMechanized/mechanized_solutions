"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sendNotificationEmail = void 0;
var mail_templates_1 = require("./mail-templates");
var config_1 = __importDefault(require("config"));
var notification_service_1 = require("../service/notification.service");
var nodemailer = require('nodemailer');
var endpoint = config_1["default"].get('endpoint');
var endPointFrontend = config_1["default"].get('endPointFrontend');
function sendNotificationEmail(input) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var confirmUrl, forgetPass, DateFormate, date, transporter, _d, mailOptions1, info1, mailOptions2, info2, mailOptions, info, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 8, , 9]);
                    confirmUrl = "".concat(endPointFrontend, "/verify-email/").concat(input === null || input === void 0 ? void 0 : input.accessToken);
                    forgetPass = "".concat(endPointFrontend, "/lost-password/").concat(input === null || input === void 0 ? void 0 : input.forgetPassToken);
                    DateFormate = new Date();
                    date = DateFormate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    transporter = nodemailer.createTransport({
                        host: process.env.NODEMAILER_HOST,
                        port: process.env.NODEMAILER_PORT,
                        secure: process.env.NODEMAILER_SECURE === 'true',
                        auth: {
                            user: process.env.NODEMAILER_EMAIL,
                            pass: process.env.NODEMAILER_PASSWORD
                        },
                        connectionTimeout: 10000,
                        debug: true
                    });
                    console.log('Nodemailer input', input);
                    _d = input.emailData.emailType;
                    switch (_d) {
                        case 'CONFIRMATION_EMAIL': return [3 /*break*/, 1];
                        case 'FORGET_PASSWORD': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    mailOptions1 = {
                        from: "".concat(input.emailData.senderAddress, " <").concat(process.env.NODEMAILER_EMAIL, ">"),
                        to: input.userEmail,
                        subject: input.emailData.subject,
                        html: (0, mail_templates_1.ConfirmMailTemplate)((_a = input.emailData) === null || _a === void 0 ? void 0 : _a.message, confirmUrl)
                    };
                    return [4 /*yield*/, transporter
                            .sendMail(mailOptions1)
                            .then(function (info) {
                            var userId = input === null || input === void 0 ? void 0 : input.userId;
                            var notificationInput = {
                                user: input === null || input === void 0 ? void 0 : input.userId,
                                notification: [
                                    {
                                        message: "".concat(input.emailData.subject),
                                        timestamp: new Date().toISOString(),
                                        event: input === null || input === void 0 ? void 0 : input.emailType,
                                        status: 'UNREAD'
                                    },
                                ]
                            };
                            if (input.userId && input.emailType) {
                                (0, notification_service_1.sendNotification)(userId, notificationInput);
                            }
                        })];
                case 2:
                    info1 = _e.sent();
                    return [3 /*break*/, 7];
                case 3:
                    mailOptions2 = {
                        from: "".concat(input.emailData.senderAddress, " <").concat(process.env.NODEMAILER_EMAIL, ">"),
                        to: input.userEmail,
                        subject: input.emailData.subject,
                        html: (0, mail_templates_1.ConfirmMailTemplate)((_b = input.emailData) === null || _b === void 0 ? void 0 : _b.message, forgetPass)
                    };
                    return [4 /*yield*/, transporter
                            .sendMail(mailOptions2)
                            .then(function (info) {
                            var userId = input === null || input === void 0 ? void 0 : input.userId;
                            var notificationInput = {
                                user: input === null || input === void 0 ? void 0 : input.userId,
                                notification: [
                                    {
                                        message: "".concat(input.emailData.subject),
                                        timestamp: new Date().toISOString(),
                                        event: input === null || input === void 0 ? void 0 : input.emailType,
                                        status: 'UNREAD'
                                    },
                                ]
                            };
                            if (input.userId && input.emailType) {
                                (0, notification_service_1.sendNotification)(userId, notificationInput);
                            }
                        })];
                case 4:
                    info2 = _e.sent();
                    return [3 /*break*/, 7];
                case 5:
                    mailOptions = {
                        from: "".concat(input.emailData.senderAddress, " <").concat(process.env.NODEMAILER_EMAIL, ">"),
                        to: input.userEmail,
                        subject: input.emailData.subject,
                        html: (0, mail_templates_1.DefaultMailTemplate)((_c = input.emailData) === null || _c === void 0 ? void 0 : _c.message)
                    };
                    return [4 /*yield*/, transporter
                            .sendMail(mailOptions)
                            .then(function (info) {
                            var userId = input === null || input === void 0 ? void 0 : input.userId;
                            var notificationInput = {
                                user: input === null || input === void 0 ? void 0 : input.userId,
                                notification: [
                                    {
                                        message: "".concat(input.emailData.subject),
                                        timestamp: new Date().toISOString(),
                                        event: input === null || input === void 0 ? void 0 : input.emailType,
                                        status: 'UNREAD'
                                    },
                                ]
                            };
                            if (input.userId && input.emailType) {
                                (0, notification_service_1.sendNotification)(userId, notificationInput);
                            }
                        })];
                case 6:
                    info = _e.sent();
                    _e.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_1 = _e.sent();
                    console.error("Error sending email: ", e_1);
                    throw e_1;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.sendNotificationEmail = sendNotificationEmail;
