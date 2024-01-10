import { Express, Request, Response } from "express";
import { createUserByAdminHandler, deleteMultipleUserByAdminHandler, deleteUserByAdminHandler, findUserByRoleHandler, getUserByIDHandler, updateUserByAdminHandler } from "../../controller/admin/userManage.controller";
import { requireSuperAdmin } from "../../middlewares/requireUser";
import { userExistValidate } from "../../middlewares/user.validate";


function userManage(app: Express) {

    // Add user by seper-admin
    app.post('/api/v1/admin/manage/user',
        requireSuperAdmin,
        userExistValidate,
        createUserByAdminHandler
    )

    // Find users according to role
    app.get('/api/v1/admin/manage/user',
        requireSuperAdmin,
        findUserByRoleHandler
    )

    // get an user by id
    app.get('/api/v1/admin/manage/user/:userId',
        requireSuperAdmin,
        getUserByIDHandler
    )

    // Update user by seper-admin
    app.put('/api/v1/admin/manage/user/:userId',
        requireSuperAdmin,
        updateUserByAdminHandler
    )

    // Delete user by seper-admin
    app.delete('/api/v1/admin/manage/user/:id',
        requireSuperAdmin,
        deleteUserByAdminHandler
    )

    // Delete user by multiple ids
    app.delete('/api/v1/admin/manage/multiselect/user',
        requireSuperAdmin,
        deleteMultipleUserByAdminHandler
    )
}

export default userManage;