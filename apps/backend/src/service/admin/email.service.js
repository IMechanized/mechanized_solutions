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
exports.findEmailByEmailType = exports.updateEmail = exports.findEmails = exports.getEmail = exports.createEmail = void 0;
var email_model_1 = __importDefault(require("../../models/admin/email.model"));
// create a email services for admin seetings
// export async function createEmail(input: EmailDocument) {
function createEmail(input) {
    return __awaiter(this, void 0, void 0, function () {
        var email, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, email_model_1["default"].create(input)];
                case 1:
                    email = _a.sent();
                    return [2 /*return*/, email];
                case 2:
                    e_1 = _a.sent();
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createEmail = createEmail;
// get a email by id ( neew to check whether used or not)
function getEmail(emailID) {
    return __awaiter(this, void 0, void 0, function () {
        var email, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, email_model_1["default"].findById(emailID).lean(true)];
                case 1:
                    email = _a.sent();
                    if (!email) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, email];
                case 2:
                    e_2 = _a.sent();
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getEmail = getEmail;
// find all emails
function findEmails() {
    return __awaiter(this, void 0, void 0, function () {
        var emails, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, email_model_1["default"].find().lean(true)];
                case 1:
                    emails = _a.sent();
                    return [2 /*return*/, emails];
                case 2:
                    e_3 = _a.sent();
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findEmails = findEmails;
// update a email by id
function updateEmail(emailQuery, input) {
    return __awaiter(this, void 0, void 0, function () {
        var email, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, email_model_1["default"].findOneAndUpdate(emailQuery, input, {
                            "new": true
                        })];
                case 1:
                    email = _a.sent();
                    return [2 /*return*/, email];
                case 2:
                    e_4 = _a.sent();
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmail = updateEmail;
// find  email by emailType
function findEmailByEmailType(emailType) {
    return __awaiter(this, void 0, void 0, function () {
        var email, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, email_model_1["default"].find({ emailType: emailType }).lean(true)];
                case 1:
                    email = _a.sent();
                    return [2 /*return*/, email];
                case 2:
                    e_5 = _a.sent();
                    throw e_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findEmailByEmailType = findEmailByEmailType;
