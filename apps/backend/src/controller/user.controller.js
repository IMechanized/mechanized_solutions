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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getDashboardStatHandler = exports.updateUserPackageHandler = exports.forgetPassResetHandler = exports.forgetPasswordHandler = exports.resetPasswordHandler = exports.updateUserHandler = exports.getUserHandler = exports.confirmEmailhandler = exports.resendConfirmEmailhandler = exports.checkUserNameExistHandler = exports.createUserHandler = void 0;
var slug = require("slug");
var email_service_1 = require("../service/admin/email.service");
var package_service_1 = require("../service/admin/package.service");
var user_service_1 = require("../service/user.service");
var jwt_utils_1 = require("../utils/jwt.utils");
var logger_1 = __importDefault(require("../utils/logger"));
var nodeMailer_1 = require("../utils/nodeMailer");
// create user controller function
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, isAdmin, isSuperAdmin, userNameExist, user, userId, accessToken, emailType, emails, templateInput, emailData, inputEmailData, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    _a = req.body.role, isAdmin = _a.isAdmin, isSuperAdmin = _a.isSuperAdmin;
                    if (isSuperAdmin) {
                        throw new Error("Forbidden - Cannot create a user with isAdmin set to true.");
                    }
                    return [4 /*yield*/, (0, user_service_1.getUser)({ userName: req.body.userName })];
                case 1:
                    userNameExist = _b.sent();
                    if (userNameExist) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User Name already exist"
                            })];
                    }
                    return [4 /*yield*/, (0, user_service_1.createUser)(req.body)];
                case 2:
                    user = _b.sent();
                    userId = user._id;
                    return [4 /*yield*/, (0, jwt_utils_1.signJwt)({
                            userId: userId
                        }, { expiresIn: "20d" })];
                case 3:
                    accessToken = _b.sent();
                    emailType = "CONFIRMATION_EMAIL";
                    emails = void 0;
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 4:
                    emails = _b.sent();
                    if (!(emails.length === 0)) return [3 /*break*/, 7];
                    templateInput = {
                        senderAddress: "Meta-Ads",
                        subject: "Confirmation email",
                        message: "Please click this link to confirm your email:",
                        emailType: "CONFIRMATION_EMAIL"
                    };
                    return [4 /*yield*/, (0, email_service_1.createEmail)(templateInput)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)("CONFIRMATION_EMAIL")];
                case 6:
                    emails = _b.sent();
                    _b.label = 7;
                case 7:
                    emailData = emails[0];
                    inputEmailData = {
                        accessToken: accessToken,
                        userEmail: user.email,
                        emailData: emailData,
                        userId: userId,
                        emailType: emailType
                    };
                    (0, nodeMailer_1.sendNotificationEmail)(inputEmailData);
                    res.status(201).json({
                        message: "Successfully created user"
                    });
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _b.sent();
                    logger_1["default"].error(e_1);
                    res.status(500).send({
                        message: "Server error",
                        error: e_1.message
                    });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createUserHandler = createUserHandler;
//check userName exist controller
function checkUserNameExistHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userNameExist, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, user_service_1.getUser)({ userName: req.body.userName })];
                case 1:
                    userNameExist = _a.sent();
                    if (userNameExist) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User Name already exist"
                            })];
                    }
                    res.status(200).send({
                        message: "User Name available"
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    logger_1["default"].error(e_2);
                    res.status(500).send({
                        message: "Server error",
                        error: e_2.message
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkUserNameExistHandler = checkUserNameExistHandler;
//  Resend confirmation email controller
function resendConfirmEmailhandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, accessToken, emailType, emails, templateInput, emailData, inputEmailData, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, (0, jwt_utils_1.signJwt)({
                            userId: userId
                        }, { expiresIn: "20d" })];
                case 2:
                    accessToken = _a.sent();
                    emailType = "CONFIRMATION_EMAIL";
                    emails = void 0;
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 3:
                    emails = _a.sent();
                    if (!(emails.length === 0)) return [3 /*break*/, 6];
                    templateInput = {
                        senderAddress: "Meta-Ads",
                        subject: "Confirmation email",
                        message: "Please click this link to confirm your email:",
                        emailType: "CONFIRMATION_EMAIL"
                    };
                    return [4 /*yield*/, (0, email_service_1.createEmail)(templateInput)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)("CONFIRMATION_EMAIL")];
                case 5:
                    emails = _a.sent();
                    _a.label = 6;
                case 6:
                    emailData = emails[0];
                    inputEmailData = {
                        accessToken: accessToken,
                        userEmail: res.locals.user.email,
                        emailData: emailData,
                        userId: userId,
                        emailType: emailType
                    };
                    (0, nodeMailer_1.sendNotificationEmail)(inputEmailData);
                    res.status(200).json({
                        message: "Confirmation email sent successfully"
                    });
                    return [3 /*break*/, 8];
                case 7:
                    e_3 = _a.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_3.message
                    });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.resendConfirmEmailhandler = resendConfirmEmailhandler;
//  Confirmation email link controller
function confirmEmailhandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, verifyResponse, userId, user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = req.params.token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    verifyResponse = (0, jwt_utils_1.verifyJwt)(accessToken);
                    userId = verifyResponse.decoded.userId;
                    if (userId === null || userId === undefined) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, (0, user_service_1.confirmEmail)(userId)];
                case 2:
                    user = _a.sent();
                    res.status(200).json({
                        message: "You email confirmation successful"
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_4.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.confirmEmailhandler = confirmEmailhandler;
//get UserHandler function
function getUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, user_service_1.getUser)({ _id: userId })];
                case 2:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    res.status(500).send({
                        message: "Server error",
                        error: e_5.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserHandler = getUserHandler;
// update User controller
function updateUserHandler(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    return __awaiter(this, void 0, void 0, function () {
        var userId, imageData, userNameInput, userNameExist, userData, user, userData, user, userData, user, e_6;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    userId = res.locals.user._id;
                    _t.label = 1;
                case 1:
                    _t.trys.push([1, 9, , 10]);
                    imageData = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                    if (!(req.body.inputType === "basic")) return [3 /*break*/, 4];
                    userNameInput = slug((_b = req.body) === null || _b === void 0 ? void 0 : _b.userName, { lower: false });
                    return [4 /*yield*/, (0, user_service_1.getUser)({ userName: (_c = req.body) === null || _c === void 0 ? void 0 : _c.userName })];
                case 2:
                    userNameExist = _t.sent();
                    if (userNameExist) {
                        if (((_d = userNameExist === null || userNameExist === void 0 ? void 0 : userNameExist._id) === null || _d === void 0 ? void 0 : _d.toString()) == userId) {
                            userNameInput = slug((_e = req.body) === null || _e === void 0 ? void 0 : _e.userName, { lower: false });
                        }
                        else {
                            userNameInput =
                                userNameInput + "-" + Math.floor(100 + Math.random() * 900);
                        }
                        // return res.status(400).send({
                        //     message: "User Name already exist",
                        // });
                    }
                    userData = {
                        fullName: {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        },
                        userName: userNameInput,
                        email: (_f = req.body) === null || _f === void 0 ? void 0 : _f.email,
                        phoneNumber: (_g = req.body) === null || _g === void 0 ? void 0 : _g.phoneNumber,
                        sellerType: (_h = req.body) === null || _h === void 0 ? void 0 : _h.sellerType,
                        location: {
                            state: (_j = req.body) === null || _j === void 0 ? void 0 : _j.state,
                            city: (_k = req.body) === null || _k === void 0 ? void 0 : _k.city,
                            street: (_l = req.body) === null || _l === void 0 ? void 0 : _l.street,
                            zipCode: (_m = req.body) === null || _m === void 0 ? void 0 : _m.zipCode
                        }
                    };
                    return [4 /*yield*/, (0, user_service_1.updateUser)(userId, userData, imageData)];
                case 3:
                    user = _t.sent();
                    res.status(200).json({
                        message: "Successfully update user"
                    });
                    _t.label = 4;
                case 4:
                    if (!(req.body.inputType === "social")) return [3 /*break*/, 6];
                    userData = {
                        socialLink: {
                            facebook: (_o = req.body) === null || _o === void 0 ? void 0 : _o.facebook,
                            twitter: (_p = req.body) === null || _p === void 0 ? void 0 : _p.twitter,
                            linkedin: (_q = req.body) === null || _q === void 0 ? void 0 : _q.linkedin,
                            instagram: (_r = req.body) === null || _r === void 0 ? void 0 : _r.instagram
                        }
                    };
                    return [4 /*yield*/, (0, user_service_1.updateUser)(userId, userData, imageData)];
                case 5:
                    user = _t.sent();
                    res.status(200).json({
                        message: "Successfully update user"
                    });
                    _t.label = 6;
                case 6:
                    if (!(req.body.inputType === "about")) return [3 /*break*/, 8];
                    userData = {
                        aboutMe: (_s = req.body) === null || _s === void 0 ? void 0 : _s.aboutMe
                    };
                    return [4 /*yield*/, (0, user_service_1.updateUser)(userId, userData, imageData)];
                case 7:
                    user = _t.sent();
                    res.status(200).json({
                        message: "Successfully update user"
                    });
                    _t.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_6 = _t.sent();
                    console.log(e_6);
                    res.status(500).send({
                        message: "Server error",
                        error: e_6.message
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserHandler = updateUserHandler;
// reset password controller
function resetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userEmail, userPassword, userDetails, user, input, userPassword_1, emailType, emails, templateInput, emailData, inputEmailData, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    userEmail = res.locals.user.email;
                    userPassword = req.body.currentPassword;
                    userDetails = {
                        password: userPassword,
                        email: userEmail
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, (0, user_service_1.validatePassword)(userDetails)];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).send({
                                message: "Invalid current password"
                            })];
                    }
                    input = __assign({}, req.body);
                    return [4 /*yield*/, (0, user_service_1.updatePassword)(userId, input)];
                case 3:
                    userPassword_1 = _a.sent();
                    emailType = "RESET_PASSWORD";
                    emails = void 0;
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 4:
                    emails = _a.sent();
                    if (!(emails.length === 0)) return [3 /*break*/, 7];
                    templateInput = {
                        senderAddress: "Meta-Ads",
                        subject: "Request to reset password",
                        message: "You have changed your password",
                        emailType: "RESET_PASSWORD"
                    };
                    return [4 /*yield*/, (0, email_service_1.createEmail)(templateInput)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)("RESET_PASSWORD")];
                case 6:
                    emails = _a.sent();
                    _a.label = 7;
                case 7:
                    emailData = emails[0];
                    inputEmailData = {
                        userEmail: userEmail,
                        emailData: emailData,
                        userId: userId,
                        emailType: emailType
                    };
                    (0, nodeMailer_1.sendNotificationEmail)(inputEmailData);
                    res.status(200).json({
                        message: "You have successfully updated your password"
                    });
                    return [3 /*break*/, 9];
                case 8:
                    e_7 = _a.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_7.message
                    });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.resetPasswordHandler = resetPasswordHandler;
// forget password email controller
function forgetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userEmail, user, userId, forgetPassToken, resetInput, emailType, emails, templateInput, emailData, inputEmailData, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userEmail = req.body.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, (0, user_service_1.getUser)({ email: userEmail })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User with this email does not exists"
                            })];
                    }
                    userId = user._id;
                    return [4 /*yield*/, (0, jwt_utils_1.signJwt)({
                            userId: userId
                        }, { expiresIn: "20d" })];
                case 3:
                    forgetPassToken = _a.sent();
                    resetInput = {
                        resetLink: forgetPassToken
                    };
                    return [4 /*yield*/, (0, user_service_1.updateResetLink)(userId, resetInput)];
                case 4:
                    _a.sent();
                    emailType = "FORGET_PASSWORD";
                    emails = void 0;
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 5:
                    emails = _a.sent();
                    if (!(emails.length === 0)) return [3 /*break*/, 8];
                    templateInput = {
                        senderAddress: "Meta-Ads",
                        subject: "Request to reset password",
                        message: "Please click on given link to reset your password",
                        emailType: "FORGET_PASSWORD"
                    };
                    return [4 /*yield*/, (0, email_service_1.createEmail)(templateInput)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)("FORGET_PASSWORD")];
                case 7:
                    emails = _a.sent();
                    _a.label = 8;
                case 8:
                    emailData = emails[0];
                    inputEmailData = {
                        forgetPassToken: forgetPassToken,
                        userEmail: user.email,
                        emailData: emailData,
                        userId: userId,
                        emailType: emailType
                    };
                    (0, nodeMailer_1.sendNotificationEmail)(inputEmailData);
                    res.status(200).json({
                        message: "Reset password email sent, please follow the instruction"
                    });
                    return [3 /*break*/, 10];
                case 9:
                    e_8 = _a.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_8.message
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.forgetPasswordHandler = forgetPasswordHandler;
// forget password reset controller
function forgetPassResetHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var resetLink, newPassword, verifyResponse, userId, findOneInput, user, input, resetInput, emailType, emails, templateInput, emailData, inputEmailData, e_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    resetLink = req.body.resetLink;
                    newPassword = req.body.newPassword;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    verifyResponse = (0, jwt_utils_1.verifyJwt)(resetLink);
                    userId = (_a = verifyResponse.decoded) === null || _a === void 0 ? void 0 : _a.userId;
                    if (userId === null || userId === undefined) {
                        return [2 /*return*/, res.status(400).send({
                                message: "Incorrect token or it is expired"
                            })];
                    }
                    findOneInput = {
                        resetLink: resetLink
                    };
                    return [4 /*yield*/, (0, user_service_1.getUser)(findOneInput)];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User with this token does not exists"
                            })];
                    }
                    input = {
                        newPassword: newPassword
                    };
                    return [4 /*yield*/, (0, user_service_1.updatePassword)(userId, input)];
                case 3:
                    _b.sent();
                    resetInput = {
                        resetLink: ""
                    };
                    return [4 /*yield*/, (0, user_service_1.updateResetLink)(user._id, resetInput)];
                case 4:
                    _b.sent();
                    emailType = "RESET_PASSWORD";
                    emails = void 0;
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)(emailType)];
                case 5:
                    emails = _b.sent();
                    if (!(emails.length === 0)) return [3 /*break*/, 8];
                    templateInput = {
                        senderAddress: "Meta-Ads",
                        subject: "Request to reset password",
                        message: "You have changed your password",
                        emailType: "RESET_PASSWORD"
                    };
                    return [4 /*yield*/, (0, email_service_1.createEmail)(templateInput)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, (0, email_service_1.findEmailByEmailType)("RESET_PASSWORD")];
                case 7:
                    emails = _b.sent();
                    _b.label = 8;
                case 8:
                    emailData = emails[0];
                    inputEmailData = {
                        userEmail: user.email,
                        emailData: emailData,
                        userId: userId,
                        emailType: emailType
                    };
                    (0, nodeMailer_1.sendNotificationEmail)(inputEmailData);
                    res.status(200).json({
                        message: "You have successfully updated your password"
                    });
                    return [3 /*break*/, 10];
                case 9:
                    e_9 = _b.sent();
                    console.log(e_9);
                    res.status(500).send({
                        message: "Server Error",
                        error: e_9.message
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.forgetPassResetHandler = forgetPassResetHandler;
// Update the user package controller
function updateUserPackageHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, packageID, packageName, user, packageResult, input, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    packageID = req.body.packageId;
                    packageName = req.body.packageName;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, user_service_1.getUser)({ _id: userId })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User does not exists"
                            })];
                    }
                    return [4 /*yield*/, (0, package_service_1.getPackage)(packageID)];
                case 3:
                    packageResult = _a.sent();
                    if (!packageResult) {
                        return [2 /*return*/, res.status(400).send({
                                message: "Package does not exists"
                            })];
                    }
                    input = {
                        packageDetails: {
                            packageId: packageID,
                            packageName: packageName
                        }
                    };
                    return [4 /*yield*/, (0, user_service_1.updateUserPackage)(userId, input)];
                case 4:
                    _a.sent();
                    res.status(200).json({
                        message: "You have successfully updated your package"
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_10 = _a.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_10.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserPackageHandler = updateUserPackageHandler;
// get user dashboard statistics handller
function getDashboardStatHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, isAdmin, isSuperAdmin, adminEntry, isSeller, isBuyer, result, userCurrentPlan, adsCount, inactiveAdsCount, totalPublishedAdsCount, totalFeaturedAdsCount, featuredAdCount, totalSellerCount, totalBuyerCount, favouriteAdsCount, totalRatingCount, e_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.user._id;
                    user = res.locals.user;
                    isAdmin = user.role.isAdmin;
                    isSuperAdmin = user.role.isSuperAdmin;
                    adminEntry = isAdmin || isSuperAdmin;
                    isSeller = user.role.isSeller;
                    isBuyer = user.role.isBuyer;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, user_service_1.getDashboardStat)({ user: userId })];
                case 2:
                    result = _b.sent();
                    userCurrentPlan = (_a = user === null || user === void 0 ? void 0 : user.packageDetails) === null || _a === void 0 ? void 0 : _a.packageName;
                    adsCount = result.adsCount, inactiveAdsCount = result.inactiveAdsCount, totalPublishedAdsCount = result.totalPublishedAdsCount, totalFeaturedAdsCount = result.totalFeaturedAdsCount, featuredAdCount = result.featuredAdCount, totalSellerCount = result.totalSellerCount, totalBuyerCount = result.totalBuyerCount, favouriteAdsCount = result.favouriteAdsCount, totalRatingCount = result.totalRatingCount;
                    // response based on user role
                    if (adminEntry) {
                        res.status(200).json({
                            message: "Successfully found admin statistics",
                            data: [
                                {
                                    title: "Total Ads",
                                    count: totalPublishedAdsCount
                                },
                                {
                                    title: "Total Sellers",
                                    count: totalSellerCount
                                },
                                {
                                    title: "Total Buyers",
                                    count: totalBuyerCount
                                },
                                {
                                    title: "Feature Ads",
                                    count: totalFeaturedAdsCount
                                },
                                {
                                    title: "Favourite Ads",
                                    count: favouriteAdsCount
                                },
                            ]
                        });
                    }
                    else if (isSeller) {
                        res.status(200).json({
                            message: "Successfully found seller statistics",
                            data: [
                                {
                                    title: "Current Plan",
                                    count: userCurrentPlan
                                },
                                {
                                    title: "Total Ads",
                                    count: adsCount
                                },
                                {
                                    title: "Inactive Ads",
                                    count: inactiveAdsCount
                                },
                                {
                                    title: "Total Ratings",
                                    count: totalRatingCount
                                },
                                {
                                    title: "Featured Ads",
                                    count: featuredAdCount
                                },
                            ]
                        });
                    }
                    else if (isBuyer) {
                        res.status(200).json({
                            message: "Successfully found buyer statistics",
                            data: [
                                {
                                    title: "Favourite Ads",
                                    count: favouriteAdsCount
                                },
                            ]
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "You are not authorized to access this page"
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_11 = _b.sent();
                    res.status(500).send({
                        message: "Server Error",
                        error: e_11.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDashboardStatHandler = getDashboardStatHandler;
