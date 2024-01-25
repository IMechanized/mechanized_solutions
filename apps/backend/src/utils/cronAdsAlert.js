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
exports.__esModule = true;
var adAlert_service_1 = require("../service/adAlert.service");
var ads_service_1 = require("../service/ads.service");
var nodeMailer_1 = require("./nodeMailer");
var cron = require('node-cron');
var cronAdsAlert = function () {
    try {
        // Daily Ad ALert 
        adsAlertFunction('0 0 0 * * *', 'Daily', 'today');
        // Weekly Ad ALert 
        adsAlertFunction('0 0 0 * * 0', 'Weekly', 'in this week');
        // Fortnightly Ad ALert 
        adsAlertFunction('0 0 0 */15 * 0', 'Fortnightly', 'fortnightly');
        // Monthly Ad ALert 
        adsAlertFunction('0 0 0 1 * *', 'Monthly', 'in this month');
    }
    catch (e) {
        throw e;
    }
};
//  Sending email and notification function 
var adsAlertFunction = function (schedule, queryTime, day) {
    cron.schedule(schedule, function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, adAlerts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        emailFrequency: queryTime,
                        active: true
                    };
                    return [4 /*yield*/, (0, adAlert_service_1.findAllAdAlerts)(query)];
                case 1:
                    adAlerts = _a.sent();
                    if (adAlerts.length !== 0) {
                        adAlerts.map(function (singleAlert, index) { return __awaiter(void 0, void 0, void 0, function () {
                            var alertAds, emailData, inputEmailData;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, (0, ads_service_1.searchAdByAlert)(singleAlert)];
                                    case 1:
                                        alertAds = _c.sent();
                                        emailData = {
                                            senderAddress: 'Meta-Ads Ads Alerts',
                                            senderEmail: 'info@metaads.com',
                                            subject: 'Ads Alert',
                                            message: "You have got ".concat(alertAds.length, " ads results ").concat(day),
                                            emailType: 'ADS_ALERT',
                                            _id: singleAlert === null || singleAlert === void 0 ? void 0 : singleAlert._id
                                        };
                                        inputEmailData = {
                                            userEmail: (_a = singleAlert === null || singleAlert === void 0 ? void 0 : singleAlert.user) === null || _a === void 0 ? void 0 : _a.email,
                                            emailData: emailData,
                                            emailType: 'ADS_ALERT',
                                            userId: (_b = singleAlert === null || singleAlert === void 0 ? void 0 : singleAlert.user) === null || _b === void 0 ? void 0 : _b._id
                                        };
                                        return [4 /*yield*/, (0, nodeMailer_1.sendNotificationEmail)(inputEmailData)];
                                    case 2:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
exports["default"] = cronAdsAlert;
