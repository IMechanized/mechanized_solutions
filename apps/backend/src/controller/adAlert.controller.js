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
exports.deleteMultipleAdAlertsHandler = exports.deleteAdAlertHandler = exports.disableMultipleAdAlertHandler = exports.updateAdAlertStatusHandler = exports.updateAdAlertHandler = exports.findAdAlertHandler = exports.showAdAlertHandler = exports.getAdAlertHandler = exports.createAdAlertHandler = void 0;
var adAlert_model_1 = __importDefault(require("../models/adAlert.model"));
var adAlert_service_1 = require("../service/adAlert.service");
var ads_service_1 = require("../service/ads.service");
// create ad alert controller
function createAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, input, adAlert, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user._id;
                    input = __assign(__assign({}, req.body), { user: userId });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.createAdAlert)(input)];
                case 2:
                    adAlert = _a.sent();
                    res.status(200).send({
                        message: 'Successfully created a ad alert'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createAdAlertHandler = createAdAlertHandler;
// get ad alert by ID controller
function getAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertID, adAlertResult, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertID = req.params.alertId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.getAdAlert)(alertID)];
                case 2:
                    adAlertResult = _a.sent();
                    res.status(200).send({
                        message: 'Successfully get alert an alert',
                        data: adAlertResult
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAdAlertHandler = getAdAlertHandler;
// show alert result controller
function showAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertID, adAlertQuery, alertAds, data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertID = req.params.alertId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, adAlert_service_1.getAdAlert)(alertID)];
                case 2:
                    adAlertQuery = _a.sent();
                    return [4 /*yield*/, (0, ads_service_1.searchAdByAlert)(adAlertQuery)];
                case 3:
                    alertAds = _a.sent();
                    data = {
                        alertAds: alertAds
                    };
                    res.status(200).send({
                        message: 'Successfully get alert ads',
                        data: data
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.showAdAlertHandler = showAdAlertHandler;
// find ad alert controller (private)
function findAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, adAlerts, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = res.locals.user._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.findAdAlert)({ user: userID })];
                case 2:
                    adAlerts = _a.sent();
                    res.status(200).send({
                        message: 'Successfully found all ad alerts',
                        data: adAlerts
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findAdAlertHandler = findAdAlertHandler;
// update ad alert controller
function updateAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertID, body, adAlert, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertID = req.params.alertId;
                    body = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.updateAdAlert)(alertID, body)];
                case 2:
                    adAlert = _a.sent();
                    res.status(200).send({
                        message: 'Successfully update an ad alert'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateAdAlertHandler = updateAdAlertHandler;
// update ad alert status controller
function updateAdAlertStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertID, alertData, adAlert, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertID = req.params.alertId;
                    alertData = {
                        active: req.body.active
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.updateAdAlertStatus)(alertID, alertData)];
                case 2:
                    adAlert = _a.sent();
                    if (!adAlert) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Ad Alert Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Ad Alert Updated'
                        })];
                case 3:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateAdAlertStatusHandler = updateAdAlertStatusHandler;
//  disable multiple alert status  handller
function disableMultipleAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertIDs, inputAlertIds, adAlerts, e_7;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertIDs = req.body.alertIds;
                    inputAlertIds = alertIDs === null || alertIDs === void 0 ? void 0 : alertIDs.split(",");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, adAlert_model_1["default"].find({
                            _id: {
                                $in: inputAlertIds
                            }
                        })];
                case 2:
                    adAlerts = _a.sent();
                    if (!adAlerts) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Ad alerts Not Found'
                            })];
                    }
                    adAlerts.forEach(function (adAlert) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            adAlert.active = false;
                            adAlert.save();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({
                            message: 'Successfully disabled ad alert list'
                        })];
                case 3:
                    e_7 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error",
                            error: e_7.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.disableMultipleAdAlertHandler = disableMultipleAdAlertHandler;
// delete ad alert controller
function deleteAdAlertHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertID, adAlert, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertID = req.params.alertId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.deleteAdAlert)(alertID)];
                case 2:
                    adAlert = _a.sent();
                    res.status(200).send({
                        message: 'Successfully delete a ad alert'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteAdAlertHandler = deleteAdAlertHandler;
// delete multiple ads alert controller
function deleteMultipleAdAlertsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var alertIDs, alertIdInput, adAlerts, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertIDs = req.body.alertIds;
                    alertIdInput = alertIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, adAlert_service_1.deleteMultipleAdAlerts)(alertIdInput)];
                case 2:
                    adAlerts = _a.sent();
                    res.status(200).send({
                        message: 'Successfully delete ad alerts'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_9 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: "Server Error"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleAdAlertsHandler = deleteMultipleAdAlertsHandler;
