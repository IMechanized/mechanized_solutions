import UserModel, { UserDocument } from "../../models/user.model"

// Add user by seper-admin service
export async function createUserByAdmin(input: UserDocument) {
    try {
        const user = await UserModel.create(input)
        return user
    } catch (e: any) {
        throw e
    }
}

// Find users according to role service
export async function findUserByRole(query: any) {
    try {
        const page = query.page
        const limit = 10

        const requestRole = query?.role
        let queryRole = {}
        if (requestRole === 'all') {
            queryRole = {}
        }
        if (requestRole === 'super-admin') {
            queryRole = {
                'role.isSuperAdmin': true,
            }
        }
        if (requestRole === 'admin') {
            queryRole = {
                'role.isAdmin': true,
            }
        }
        if (requestRole === 'buyer') {
            queryRole = {
                'role.isBuyer': true,
            }
        }
        if (requestRole === 'seller') {
            queryRole = {
                'role.isSeller': true,
            }
        }
        const users = await UserModel.find(queryRole)
            .skip((page) * limit)
            .limit(limit)
        // count 
        const count = await UserModel.countDocuments(queryRole)
        return { users, count }
    } catch (e: any) {
        throw e
    }
}

// Update user by seper-admin service
export async function updateUserByAdmin(userId: string, update: UserDocument) {
    try {
        const user = await UserModel.findByIdAndUpdate(userId, update, { new: true })
        return user
    } catch (e: any) {
        throw e
    }
}

// Delete user by seper-admin service
export async function deleteUserByAdmin(query: any) {
    try {
        const user = await UserModel.findByIdAndDelete(query)
        return user
    } catch (e: any) {
        throw e
    }
}

// Delete user by multiple ids service
export async function deleteMultipleUserByAdmin(query: any) {
    try {
        const users = await UserModel.deleteMany({ _id: { $in: query } })
        return users
    } catch (e: any) {
        throw e
    }
}