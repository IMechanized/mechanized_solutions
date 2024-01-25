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
exports.deleteMultipleLocationsHandler = exports.deleteLocationHandler = exports.disableMultipleLocationHandler = exports.changeLoationStatusHandler = exports.updateLocationHandler = exports.findAdminLocationHandler = exports.findTopLocatioHandler = exports.getLocationBySlugHandler = exports.getLocationHandler = exports.createTopLocationHandler = void 0;
var topLocation_model_1 = __importDefault(require("../../models/admin/topLocation.model"));
var topLocation_service_1 = require("../../service/admin/topLocation.service");
var slug = require('slug');
// create a top-location controller
function createTopLocationHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var locationSlug, getLocationInfo, checkLocation, locationData, imagePath, locations, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    locationSlug = slug(req.body.location, { lower: true });
                    return [4 /*yield*/, (0, topLocation_service_1.getLocationBySlug)(locationSlug)];
                case 1:
                    getLocationInfo = _b.sent();
                    if (getLocationInfo) {
                        locationSlug =
                            locationSlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    return [4 /*yield*/, (0, topLocation_service_1.getLocationByTitle)(req.body.location)];
                case 2:
                    checkLocation = _b.sent();
                    if (checkLocation) {
                        return [2 /*return*/, res.status(400).send({
                                message: 'Location already exist'
                            })];
                    }
                    locationData = {
                        location: req.body.location,
                        slug: locationSlug
                    };
                    imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                    return [4 /*yield*/, (0, topLocation_service_1.createTopLocation)(locationData, imagePath)];
                case 3:
                    locations = _b.sent();
                    return [2 /*return*/, res.status(200).send({
                            message: 'Locations created successfully'
                        })];
                case 4:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_1.message
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createTopLocationHandler = createTopLocationHandler;
// get top-location handller by id
function getLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locationID, location_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locationID = req.params.locationId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, topLocation_service_1.getLocation)(locationID)];
                case 2:
                    location_1 = _a.sent();
                    if (!location_1) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Location Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Location Found',
                            data: location_1
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
exports.getLocationHandler = getLocationHandler;
// get top-location handller by slug
function getLocationBySlugHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locationSlug, location_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locationSlug = req.params.locationSlug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, topLocation_service_1.getLocationBySlug)(locationSlug)];
                case 2:
                    location_2 = _a.sent();
                    if (!location_2) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Location Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Location Found',
                            data: location_2
                        })];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_3.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getLocationBySlugHandler = getLocationBySlugHandler;
// find all top-location controller public
function findTopLocatioHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locations, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, topLocation_service_1.findTopLocation)()];
                case 1:
                    locations = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all top-locations',
                        data: locations
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_4.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findTopLocatioHandler = findTopLocatioHandler;
// find all location admin private handller
function findAdminLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locations, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, topLocation_service_1.findAdminLocation)()];
                case 1:
                    locations = _a.sent();
                    res.status(200).send({
                        message: 'Successfully find all Locations',
                        data: locations
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_5.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAdminLocationHandler = findAdminLocationHandler;
// update Locaion handller
function updateLocationHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var locationID, locationSlug, getLocationInfo, checkLocation, imagePath, locationData, location_3, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    locationID = req.params.locationId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    locationSlug = slug(req.body.location, { lower: true });
                    return [4 /*yield*/, (0, topLocation_service_1.getLocationBySlug)(locationSlug)];
                case 2:
                    getLocationInfo = _b.sent();
                    if (getLocationInfo) {
                        locationSlug =
                            locationSlug + '-' + Math.floor(100 + Math.random() * 900);
                    }
                    return [4 /*yield*/, (0, topLocation_service_1.getLocationByTitle)(req.body.location)];
                case 3:
                    checkLocation = _b.sent();
                    if (checkLocation && (checkLocation === null || checkLocation === void 0 ? void 0 : checkLocation._id) != locationID) {
                        return [2 /*return*/, res.status(400).send({
                                message: 'Location already exist'
                            })];
                    }
                    imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                    locationData = {
                        location: req.body.location,
                        slug: locationSlug
                    };
                    return [4 /*yield*/, (0, topLocation_service_1.updateLocation)(locationID, locationData, imagePath)];
                case 4:
                    location_3 = _b.sent();
                    if (!location_3) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Locaion Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Locaion Updated'
                        })];
                case 5:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_6.message
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateLocationHandler = updateLocationHandler;
//  change a locaion status handller
function changeLoationStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locationID, locationyStatus, location_4, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locationID = req.params.locationId;
                    locationyStatus = req.body.status;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, topLocation_service_1.changeLocationStatus)(locationID)];
                case 2:
                    location_4 = (_a.sent());
                    switch (locationyStatus) {
                        case 'enbable':
                            location_4.status.isActive = true;
                            location_4.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Location is activated successfully'
                                })];
                        case 'disable':
                            location_4.status.isActive = false;
                            location_4.save();
                            return [2 /*return*/, res.status(200).send({
                                    message: 'Location is deactivated successfully'
                                })];
                        default:
                            return [2 /*return*/, res.status(400).send({
                                    message: 'Invalid status'
                                })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_7.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.changeLoationStatusHandler = changeLoationStatusHandler;
//  disable multiple locaion status handller
function disableMultipleLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locaionIDs, inputLocationIds, locations, e_8;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locaionIDs = req.body.locationIds;
                    inputLocationIds = locaionIDs === null || locaionIDs === void 0 ? void 0 : locaionIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, topLocation_model_1["default"].find({
                            _id: {
                                $in: inputLocationIds
                            }
                        })];
                case 2:
                    locations = _a.sent();
                    if (!locations) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Locaion Not Found'
                            })];
                    }
                    locations.forEach(function (location) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            location.status.isActive = false;
                            location.save();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, res.status(200).send({
                            message: 'Locaions are disabled successfully'
                        })];
                case 3:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_8.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.disableMultipleLocationHandler = disableMultipleLocationHandler;
// delete locaion handller
function deleteLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locationID, locaion, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locationID = req.params.locationId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, topLocation_service_1.deleteLocation)(locationID)];
                case 2:
                    locaion = _a.sent();
                    if (!locaion) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Locaion Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Locaion Deleted'
                        })];
                case 3:
                    e_9 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_9.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteLocationHandler = deleteLocationHandler;
// delete multiple  locaion handller
function deleteMultipleLocationsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var locaionIDs, inputLocationsIds, locaion, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locaionIDs = req.body.locationIds;
                    inputLocationsIds = locaionIDs === null || locaionIDs === void 0 ? void 0 : locaionIDs.split(',');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, topLocation_service_1.deleteMultipleLocation)(inputLocationsIds)];
                case 2:
                    locaion = _a.sent();
                    if (!locaion) {
                        return [2 /*return*/, res.status(404).send({
                                message: 'Locaion Not Found'
                            })];
                    }
                    return [2 /*return*/, res.status(200).send({
                            message: 'Locaion Deleted'
                        })];
                case 3:
                    e_10 = _a.sent();
                    return [2 /*return*/, res.status(500).send({
                            message: 'Server Error',
                            error: e_10.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMultipleLocationsHandler = deleteMultipleLocationsHandler;
