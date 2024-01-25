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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyJwt = exports.signJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
// const PROVATE_KEY = config.get<string>("privateKey")
// const PUBLIC_KEY = config.get<string>("publicKey")
var PROVATE_KEY = Buffer.from(config_1["default"].get('privateKey'), 'base64').toString('ascii');
var PUBLIC_KEY = Buffer.from(config_1["default"].get('publicKey'), 'base64').toString('ascii');
function signJwt(object, options) {
    return jsonwebtoken_1["default"].sign(object, PROVATE_KEY, __assign(__assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, PUBLIC_KEY);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        };
    }
}
exports.verifyJwt = verifyJwt;
