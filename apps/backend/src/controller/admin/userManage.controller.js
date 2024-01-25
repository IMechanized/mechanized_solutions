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
exports.deleteMultipleUserByAdminHandler = exports.deleteUserByAdminHandler = exports.updateUserByAdminHandler = exports.getUserByIDHandler = exports.findUserByRoleHandler = exports.createUserByAdminHandler = void 0;
var userManage_service_1 = require("../../service/admin/userManage.service");
var user_service_1 = require("../../service/user.service");
var jwt_utils_1 = require("../../utils/jwt.utils");
// Add user by seper-admin controller
function createUserByAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userNameExist, role, input, user, userId, accessToken, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_service_1.getUser)({ userName: req.body.userName })];
                case 1:
                    userNameExist = _a.sent();
                    if (userNameExist) {
                        return [2 /*return*/, res.status(400).send({
                                message: "User Name already exist"
                            })];
                    }
                    role = {};
                    if (req.body.roleAssigned === 'buyer' || req.body.roleAssigned === '') {
                        role = {
                            isBuyer: true
                        };
                    }
                    if (req.body.roleAssigned === 'seller') {
                        role = {
                            isBuyer: false,
                            isSeller: true
                        };
                    }
                    if (req.body.roleAssigned === 'admin') {
                        role = {
                            isBuyer: false,
                            isAdmin: true
                        };
                    }
                    if (req.body.roleAssigned === 'superAdmin') {
                        role = {
                            isBuyer: false,
                            isSuperAdmin: true
                        };
                    }
                    input = __assign(__assign({}, req.body), { role: role });
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, (0, userManage_service_1.createUserByAdmin)(input)];
                case 3:
                    user = _a.sent();
                    userId = user._id;
                    return [4 /*yield*/, (0, jwt_utils_1.signJwt)({
                            userId: userId
                        }, { expiresIn: '20d' })
                        // const emailType = 'CONFIRMATION_EMAIL'
                        // let emails
                        // emails = await findEmailByEmailType(emailType)
                        // if (emails.length === 0) {
                        //     const templateInput = {
                        //         senderAddress: 'Meta-Ads',
                        //         subject: 'Confirmation email',
                        //         message: 'Please click this link to confirm your email:',
                        //         emailType: 'CONFIRMATION_EMAIL',
                        //     }
                        //     await createEmail(templateInput)
                        //     emails = await findEmailByEmailType('CONFIRMATION_EMAIL')
                        // }
                        // const emailData = emails[0]
                        // const inputEmailData = {
                        //     accessToken,
                        //     userEmail: req.body?.email,
                        //     emailData,
                        //     userId,
                        //     emailType,
                        // }
                        // sendNotificationEmail(inputEmailData)
                    ];
                case 4:
                    accessToken = _a.sent();
                    // const emailType = 'CONFIRMATION_EMAIL'
                    // let emails
                    // emails = await findEmailByEmailType(emailType)
                    // if (emails.length === 0) {
                    //     const templateInput = {
                    //         senderAddress: 'Meta-Ads',
                    //         subject: 'Confirmation email',
                    //         message: 'Please click this link to confirm your email:',
                    //         emailType: 'CONFIRMATION_EMAIL',
                    //     }
                    //     await createEmail(templateInput)
                    //     emails = await findEmailByEmailType('CONFIRMATION_EMAIL')
                    // }
                    // const emailData = emails[0]
                    // const inputEmailData = {
                    //     accessToken,
                    //     userEmail: req.body?.email,
                    //     emailData,
                    //     userId,
                    //     emailType,
                    // }
                    // sendNotificationEmail(inputEmailData)
                    res.status(201).json({
                        message: 'Successfully created user'
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_1.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createUserByAdminHandler = createUserByAdminHandler;
// Find users according to role controller
function findUserByRoleHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, usersData, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.query;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userManage_service_1.findUserByRole)(query)];
                case 2:
                    usersData = _a.sent();
                    data = {
                        users: usersData.users,
                        userCount: usersData.count
                    };
                    res.status(200).json({
                        message: 'Successfully found users',
                        data: data
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_2.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findUserByRoleHandler = findUserByRoleHandler;
// get an user by id controller
function getUserByIDHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = req.params.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, user_service_1.getUser)({ _id: userID })];
                case 2:
                    user = _a.sent();
                    res.status(200).json({
                        message: 'Successfully found users',
                        data: user
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_3.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserByIDHandler = getUserByIDHandler;
//Update user by seper-admin controller
function updateUserByAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, role, input, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    role = {};
                    if (req.body.roleAssigned === 'buyer' || req.body.roleAssigned === '') {
                        role = {
                            isBuyer: true,
                            isSeller: false,
                            isAdmin: false,
                            isSuperAdmin: false
                        };
                    }
                    if (req.body.roleAssigned === 'seller') {
                        role = {
                            isBuyer: false,
                            isSeller: true,
                            isAdmin: false,
                            isSuperAdmin: false
                        };
                    }
                    if (req.body.roleAssigned === 'admin') {
                        role = {
                            isBuyer: false,
                            isSeller: false,
                            isAdmin: true,
                            isSuperAdmin: false
                        };
                    }
                    if (req.body.roleAssigned === 'superAdmin') {
                        role = {
                            isBuyer: false,
                            isSeller: false,
                            isAdmin: false,
                            isSuperAdmin: true
                        };
                    }
                    input = __assign(__assign({}, req.body), { role: role });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userManage_service_1.updateUserByAdmin)(userId, input)
                        // const user = await createUserByAdmin(input)
                    ];
                case 2:
                    _a.sent();
                    // const user = await createUserByAdmin(input)
                    res.status(200).json({
                        message: 'Successfully updated user'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_4.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserByAdminHandler = updateUserByAdminHandler;
// Delete user by seper-admin controller
function deleteUserByAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userManage_service_1.deleteUserByAdmin)(userId)];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        message: 'Successfully deleted user'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_5.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUserByAdminHandler = deleteUserByAdminHandler;
// Delete user by multiple ids controller
function deleteMultipleUserByAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userIds, userIdInput, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIds = req.body.userIDs;
                    userIdInput = userIds.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userManage_service_1.deleteMultipleUserByAdmin)(userIdInput)];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        message: 'Successfully deleted users'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    res.status(500).send({
                        message: 'Server error',
                        error: e_6.message
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleUserByAdminHandler = deleteMultipleUserByAdminHandler;
