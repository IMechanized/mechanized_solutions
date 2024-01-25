"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var session_controller_1 = require("../controller/session.controller");
var user_controller_1 = require("../controller/user.controller");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
var session_validate_1 = require("../middlewares/session.validate");
var user_validate_1 = require("../middlewares/user.validate");
var multer_1 = __importDefault(require("../utils/multer"));
function userRoute(app) {
    // health check
    app.get('/', function (req, res) {
        res.status(200).send('OK');
    });
    // signup user
    app.post('/api/v1/user/signup', user_validate_1.validateUser, user_validate_1.userExistValidate, user_controller_1.createUserHandler);
    //Check user-name exist
    app.get('/api/v1/user/check/username', user_controller_1.checkUserNameExistHandler);
    // Resend confirmation email
    app.post('/api/v1/user/resend/confirmation', requireUser_1["default"], user_controller_1.resendConfirmEmailhandler);
    // Email confirmation
    app.post('/api/v1/user/confirmation/:token', user_controller_1.confirmEmailhandler);
    // user login api
    app.post('/api/v1/user/session', session_validate_1.validateSession, session_controller_1.createUserSessionHandler);
    // get user self
    app.get('/api/v1/user/self', requireUser_1["default"], user_controller_1.getUserHandler);
    // update user self profile
    app.put('/api/v1/user/self', requireUser_1["default"], multer_1["default"].single('profileImage'), user_controller_1.updateUserHandler);
    // reset password
    app.put('/api/v1/user/reset', requireUser_1["default"], user_controller_1.resetPasswordHandler);
    // forget password email
    app.put('/api/v1/user/account/forget-password', user_controller_1.forgetPasswordHandler);
    // forget password reset
    app.put('/api/v1/user/account/reset-password', user_controller_1.forgetPassResetHandler);
    // update user package 
    app.put('/api/v1/user/package', requireUser_1["default"], user_controller_1.updateUserPackageHandler);
    // user logout
    app["delete"]('/api/v1/user/session', session_controller_1.deleteSessionHandler);
    // create user dashboard statistics route
    app.get('/api/v1/user/dashboard/statistics', requireUser_1["default"], user_controller_1.getDashboardStatHandler);
}
exports["default"] = userRoute;
