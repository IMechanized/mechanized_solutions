import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { PackageDocument } from "./admin/package.model";

export interface UserDocument extends mongoose.Document {
    fullName: {
        firstName: string
        lastName: string
    }
    userName: string
    email: string
    password: string
    isConfirmed: boolean
    packageDetails: {
        packageId: PackageDocument['_id']
        packageName: string
    }
    ratingDetails: {
        averageRating: number
        reviewCount: number
    }
    sellerReviews: [
        {
            user: UserDocument['_id']
            ratingNumber: number
            review: string
            isApproved: boolean
        }
    ]
    resetLink: string
    phoneNumber: string
    avatar: string
    cloudinary_id: string
    role: {
        isBuyer: boolean
        isSeller: boolean
        isAdmin: boolean
        isSuperAdmin: boolean
    }

    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface UpdateUserDocument extends mongoose.Document {
    sellerType: string
    location: {
        state: string
        city: string
        street: string
        zipCode: string
    }
    aboutMe: string
    accountType: string
    socialLink: {
        linkedin: string
        facebook: string
        twitter: string
        instagram: string
    }
}


export const userSchema = new mongoose.Schema(
    {
        fullName: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isConfirmed: {
            type: Boolean,
            required: true,
        },
        packageDetails: {
            packageId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Package",
            },
            packageName: {
                type: String,
            },
        },
        ratingDetails: {
            averageRating: {
                type: Number,
            },
            reviewCount: {
                type: Number,
            },
        },
        sellerReviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                ratingNumber: {
                    type: Number,
                },
                review: {
                    type: String,
                },
                isApproved: {
                    type: Boolean,
                    default: true,
                },
            },
        ],
        resetLink: {
            data: String,
            default: '',
        },
        phoneNumber: {
            type: String,
        },
        avatar: {
            type: String,
        },
        cloudinary_id: {
            type: String,
        },
        role: {
            isBuyer: {
                type: Boolean,
                default: true,
            },
            isSeller: {
                type: Boolean,
                default: false,
            },
            isAdmin: {
                type: Boolean,
                default: false,
            },
            isSuperAdmin: {
                type: Boolean,
                default: false,
            },
        }
    },
    {
        timestamps: true,
    }
)

const updateUserSchema = new mongoose.Schema({

    sellerType: {
        type: String,
        default: 'Individual',
    },
    aboutMe: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    location: {
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        zipCode: {
            type: String,
        },
    },
    accountType: {
        type: String,
    },
    socialLink: {
        linkedin: {
            type: String,
        },
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        }
    },
})


userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    const isMatch = await bcrypt.compare(candidatePassword, user.password).catch((e) => false);
    return isMatch
};


const userUpdatedSchema = userSchema.add(updateUserSchema)


const UserModel = mongoose.model<UserDocument>("User", userUpdatedSchema);

export default UserModel;