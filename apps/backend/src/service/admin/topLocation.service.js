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
exports.deleteMultipleLocation = exports.deleteLocation = exports.changeLocationStatus = exports.updateLocation = exports.findAdminLocation = exports.findTopLocation = exports.getLocationByTitle = exports.getLocationBySlug = exports.getLocation = exports.createTopLocation = void 0;
var lodash_1 = __importDefault(require("lodash"));
var topLocation_model_1 = __importDefault(require("../../models/admin/topLocation.model"));
var ads_model_1 = __importDefault(require("../../models/ads.model"));
var cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
// create location service
function createTopLocation(locationData, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var locationInput, imageData, locations, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    locationInput = void 0;
                    if (!imagePath) return [3 /*break*/, 2];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imagePath)];
                case 1:
                    imageData = _a.sent();
                    locationInput = __assign(__assign({}, locationData), { avatar: imageData.secure_url, avatarCloudinaryId: imageData.public_id });
                    return [3 /*break*/, 3];
                case 2:
                    locationInput = __assign({}, locationData);
                    _a.label = 3;
                case 3:
                    // const locations = await TopLocationModel.findOneAndUpdate({}, input, options)
                    console.log('locationInput', locationInput);
                    return [4 /*yield*/, topLocation_model_1["default"].create(locationInput)];
                case 4:
                    locations = _a.sent();
                    return [2 /*return*/, locations];
                case 5:
                    e_1 = _a.sent();
                    throw e_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createTopLocation = createTopLocation;
// get a location by id service
function getLocation(locationID) {
    return __awaiter(this, void 0, void 0, function () {
        var location_1, locationName, totalAdsCount, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, topLocation_model_1["default"].findById(locationID).lean(true)];
                case 1:
                    location_1 = _a.sent();
                    locationName = lodash_1["default"].pick(location_1, ['location']);
                    return [4 /*yield*/, ads_model_1["default"].find({
                            location: locationName.location
                        }).count()];
                case 2:
                    totalAdsCount = _a.sent();
                    result = __assign(__assign({}, location_1), { count: totalAdsCount });
                    // return _.omit(result, ['__v', 'createdAt', 'updatedAt'])
                    return [2 /*return*/, result];
                case 3:
                    e_2 = _a.sent();
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getLocation = getLocation;
// get a location by slug service
function getLocationBySlug(locationSlug) {
    return __awaiter(this, void 0, void 0, function () {
        var location_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, topLocation_model_1["default"].findOne({
                            slug: locationSlug
                        }).lean(true)];
                case 1:
                    location_2 = _a.sent();
                    return [2 /*return*/, location_2];
                case 2:
                    e_3 = _a.sent();
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getLocationBySlug = getLocationBySlug;
// get a location by title service
function getLocationByTitle(locationTitle) {
    return __awaiter(this, void 0, void 0, function () {
        var location_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, topLocation_model_1["default"].findOne({
                            location: locationTitle
                        }).lean(true)];
                case 1:
                    location_3 = _a.sent();
                    return [2 /*return*/, location_3];
                case 2:
                    e_4 = _a.sent();
                    throw e_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getLocationByTitle = getLocationByTitle;
// find all location service public
function findTopLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var locations, locationName, totalAdsCount_1, result, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, topLocation_model_1["default"].find().lean(true)];
                case 1:
                    locations = _a.sent();
                    locationName = lodash_1["default"].map(locations, 'location');
                    return [4 /*yield*/, ads_model_1["default"].aggregate([
                            {
                                $group: {
                                    _id: '$location',
                                    count: { $sum: 1 }
                                }
                            },
                        ])];
                case 2:
                    totalAdsCount_1 = _a.sent();
                    result = locations.map(function (location) {
                        var locationCount = totalAdsCount_1.find(function (count) { return count._id === location.location; });
                        return __assign(__assign({}, location), { count: locationCount ? locationCount.count : 0 });
                    });
                    // return locations[0]?.topLocations
                    // return locations
                    return [2 /*return*/, result];
                case 3:
                    e_5 = _a.sent();
                    throw e_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findTopLocation = findTopLocation;
// find all categories admin private  service
function findAdminLocation() {
    return __awaiter(this, void 0, void 0, function () {
        var locations, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, topLocation_model_1["default"].find().lean(true)];
                case 1:
                    locations = _a.sent();
                    return [2 /*return*/, locations];
                case 2:
                    e_6 = _a.sent();
                    throw e_6;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminLocation = findAdminLocation;
// update a location service
function updateLocation(locationID, update, imagePath) {
    return __awaiter(this, void 0, void 0, function () {
        var locationUpdate, locationPrevData, imageData, imageInput, location_4, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    locationUpdate = null;
                    if (!imagePath) return [3 /*break*/, 5];
                    return [4 /*yield*/, topLocation_model_1["default"].findById(locationID)];
                case 1:
                    locationPrevData = (_a.sent());
                    if (!locationPrevData.avatarCloudinaryId) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(locationPrevData.avatarCloudinaryId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, cloudinary_1["default"].uploader.upload(imagePath)];
                case 4:
                    imageData = _a.sent();
                    imageInput = {
                        avatar: imageData === null || imageData === void 0 ? void 0 : imageData.secure_url,
                        avatarCloudinaryId: imageData === null || imageData === void 0 ? void 0 : imageData.public_id
                    };
                    locationUpdate = __assign(__assign({}, update), imageInput);
                    return [3 /*break*/, 6];
                case 5:
                    locationUpdate = __assign({}, update);
                    _a.label = 6;
                case 6: return [4 /*yield*/, topLocation_model_1["default"].findByIdAndUpdate(locationID, locationUpdate, {
                        "new": true
                    })];
                case 7:
                    location_4 = _a.sent();
                    return [2 /*return*/, location_4];
                case 8:
                    e_7 = _a.sent();
                    throw e_7;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.updateLocation = updateLocation;
// change a location status service
function changeLocationStatus(locationID) {
    return __awaiter(this, void 0, void 0, function () {
        var location_5, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, topLocation_model_1["default"].findById(locationID)];
                case 1:
                    location_5 = _a.sent();
                    return [2 /*return*/, location_5];
                case 2:
                    e_8 = _a.sent();
                    throw e_8;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.changeLocationStatus = changeLocationStatus;
// delete a location service
function deleteLocation(locationID) {
    return __awaiter(this, void 0, void 0, function () {
        var locationPrevData, location_6, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, topLocation_model_1["default"].findById(locationID)];
                case 1:
                    locationPrevData = (_a.sent());
                    if (!locationPrevData.avatarCloudinaryId) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(locationPrevData.avatarCloudinaryId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, topLocation_model_1["default"].findByIdAndDelete(locationID)];
                case 4:
                    location_6 = _a.sent();
                    return [2 /*return*/, location_6];
                case 5:
                    e_9 = _a.sent();
                    throw e_9;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deleteLocation = deleteLocation;
// delete multiple location service
function deleteMultipleLocation(locaionIDs) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, locaionIDs_1, locationID, locationPrevData, location_7, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _i = 0, locaionIDs_1 = locaionIDs;
                    _a.label = 1;
                case 1:
                    if (!(_i < locaionIDs_1.length)) return [3 /*break*/, 5];
                    locationID = locaionIDs_1[_i];
                    console.log('locationID from service', locationID);
                    return [4 /*yield*/, topLocation_model_1["default"].findById(locationID)];
                case 2:
                    locationPrevData = (_a.sent());
                    if (!(locationPrevData === null || locationPrevData === void 0 ? void 0 : locationPrevData.avatarCloudinaryId)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cloudinary_1["default"].uploader.destroy(locationPrevData.avatarCloudinaryId)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, topLocation_model_1["default"].deleteMany({ _id: { $in: locaionIDs } })];
                case 6:
                    location_7 = _a.sent();
                    return [2 /*return*/, location_7];
                case 7:
                    e_10 = _a.sent();
                    throw e_10;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleLocation = deleteMultipleLocation;
