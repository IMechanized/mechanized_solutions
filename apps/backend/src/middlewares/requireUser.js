"use strict";
exports.__esModule = true;
exports.requireSuperAdmin = exports.requireAdmin = exports.requireSeller = exports.requireBuyer = void 0;
var requireUser = function (req, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route'
        });
    }
    return next();
};
exports["default"] = requireUser;
var requireBuyer = function (req, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route'
        });
    }
    if (user.role.isBuyer || user.role.isAdmin || user.role.isSuperAdmin) {
        return next();
    }
    else {
        return res.status(401).json({
            message: 'You must be an buyer to access this route'
        });
    }
};
exports.requireBuyer = requireBuyer;
var requireSeller = function (req, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route'
        });
    }
    if (user.role.isSeller || user.role.isAdmin || user.role.isSuperAdmin) {
        return next();
    }
    else {
        return res.status(401).json({
            message: 'You must be a seller to access this route'
        });
    }
};
exports.requireSeller = requireSeller;
var requireAdmin = function (req, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route'
        });
    }
    if (user.role.isAdmin || user.role.isSuperAdmin) {
        return next();
    }
    else {
        return res.status(401).json({
            message: 'You must be an admin to access this route'
        });
    }
};
exports.requireAdmin = requireAdmin;
var requireSuperAdmin = function (req, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res.status(401).json({
            message: 'You must be logged in to access this route'
        });
    }
    if (user.role.isSuperAdmin) {
        return next();
    }
    else {
        return res.status(401).json({
            message: 'You must be an Super-admin to access this route'
        });
    }
};
exports.requireSuperAdmin = requireSuperAdmin;
