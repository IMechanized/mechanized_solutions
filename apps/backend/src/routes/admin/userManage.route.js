"use strict";
exports.__esModule = true;
var userManage_controller_1 = require("../../controller/admin/userManage.controller");
var requireUser_1 = require("../../middlewares/requireUser");
var user_validate_1 = require("../../middlewares/user.validate");
function userManage(app) {
    // Add user by seper-admin
    app.post('/api/v1/admin/manage/user', requireUser_1.requireSuperAdmin, user_validate_1.userExistValidate, userManage_controller_1.createUserByAdminHandler);
    // Find users according to role
    app.get('/api/v1/admin/manage/user', requireUser_1.requireSuperAdmin, userManage_controller_1.findUserByRoleHandler);
    // get an user by id
    app.get('/api/v1/admin/manage/user/:userId', requireUser_1.requireSuperAdmin, userManage_controller_1.getUserByIDHandler);
    // Update user by seper-admin
    app.put('/api/v1/admin/manage/user/:userId', requireUser_1.requireSuperAdmin, userManage_controller_1.updateUserByAdminHandler);
    // Delete user by seper-admin
    app["delete"]('/api/v1/admin/manage/user/:id', requireUser_1.requireSuperAdmin, userManage_controller_1.deleteUserByAdminHandler);
    // Delete user by multiple ids
    app["delete"]('/api/v1/admin/manage/multiselect/user', requireUser_1.requireSuperAdmin, userManage_controller_1.deleteMultipleUserByAdminHandler);
}
exports["default"] = userManage;
