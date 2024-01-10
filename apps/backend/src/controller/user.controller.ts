import { Request, Response } from "express";
var slug = require("slug");
import {
  createEmail,
  findEmailByEmailType,
} from "../service/admin/email.service";
import { getPackage } from "../service/admin/package.service";
import {
  confirmEmail,
  createUser,
  getDashboardStat,
  getUser,
  updatePassword,
  updateResetLink,
  updateUser,
  updateUserPackage,
  validatePassword,
} from "../service/user.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";
import { sendNotificationEmail } from "../utils/nodeMailer";

// create user controller function
export async function createUserHandler(
  req: Request<{}, {}, any>,
  res: Response
) {
  try {
    // if isAdmin is true then throw error
    const { isAdmin, isSuperAdmin } = req.body.role;

    if (isSuperAdmin) {
      throw new Error(
        "Forbidden - Cannot create a user with isAdmin set to true."
      );
    }

    //check userName exist
    const userNameExist = await getUser({ userName: req.body.userName });
    if (userNameExist) {
      return res.status(400).send({
        message: "User Name already exist",
      });
    }

    const user = await createUser(req.body);

    const userId = user._id;
    const accessToken = await signJwt(
      {
        userId,
      },
      { expiresIn: "20d" }
    );

    const emailType = "CONFIRMATION_EMAIL";
    let emails;
    emails = await findEmailByEmailType(emailType);
    if (emails.length === 0) {
      const templateInput = {
        senderAddress: "Meta-Ads",
        subject: "Confirmation email",
        message: "Please click this link to confirm your email:",
        emailType: "CONFIRMATION_EMAIL",
      };
      await createEmail(templateInput);
      emails = await findEmailByEmailType("CONFIRMATION_EMAIL");
    }
    const emailData = emails[0];
    const inputEmailData = {
      accessToken,
      userEmail: user.email,
      emailData,
      userId,
      emailType,
    };
    sendNotificationEmail(inputEmailData);

    res.status(201).json({
      message: "Successfully created user",
    });
  } catch (e: any) {
    logger.error(e);
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
}

//check userName exist controller
export async function checkUserNameExistHandler(
  req: Request<{}, {}, any>,
  res: Response
) {
  try {
    const userNameExist = await getUser({ userName: req.body.userName });
    if (userNameExist) {
      return res.status(400).send({
        message: "User Name already exist",
      });
    }
    res.status(200).send({
      message: "User Name available",
    });
  } catch (e: any) {
    logger.error(e);
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
}

//  Resend confirmation email controller
export async function resendConfirmEmailhandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const accessToken = await signJwt(
      {
        userId,
      },
      { expiresIn: "20d" }
    );

    const emailType = "CONFIRMATION_EMAIL";
    let emails;
    emails = await findEmailByEmailType(emailType);
    if (emails.length === 0) {
      const templateInput = {
        senderAddress: "Meta-Ads",
        subject: "Confirmation email",
        message: "Please click this link to confirm your email:",
        emailType: "CONFIRMATION_EMAIL",
      };
      await createEmail(templateInput);
      emails = await findEmailByEmailType("CONFIRMATION_EMAIL");
    }
    const emailData = emails[0];
    const inputEmailData = {
      accessToken,
      userEmail: res.locals.user.email,
      emailData,
      userId,
      emailType,
    };
    sendNotificationEmail(inputEmailData);

    res.status(200).json({
      message: "Confirmation email sent successfully",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

//  Confirmation email link controller
export async function confirmEmailhandler(req: Request, res: Response) {
  const accessToken = req.params.token;

  try {
    const verifyResponse = verifyJwt(accessToken) as any;

    const userId = verifyResponse.decoded.userId;
    if (userId === null || userId === undefined) {
      return false;
    }
    const user = await confirmEmail(userId);
    res.status(200).json({
      message: "You email confirmation successful",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

//get UserHandler function
export async function getUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const user = await getUser({ _id: userId });
    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
}

// update User controller
export async function updateUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id as string;
  try {
    const imageData = req.file?.path;

    if (req.body.inputType === "basic") {
      //check userName exist
      let userNameInput = slug(req.body?.userName, { lower: false });
      const userNameExist = await getUser({ userName: req.body?.userName });
      if (userNameExist) {
        if (userNameExist?._id?.toString() == userId) {
          userNameInput = slug(req.body?.userName, { lower: false });
        } else {
          userNameInput =
            userNameInput + "-" + Math.floor(100 + Math.random() * 900);
        }
        // return res.status(400).send({
        //     message: "User Name already exist",
        // });
      }

      const userData = {
        fullName: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
        userName: userNameInput,
        email: req.body?.email,
        phoneNumber: req.body?.phoneNumber,
        sellerType: req.body?.sellerType,
        location: {
          state: req.body?.state,
          city: req.body?.city,
          street: req.body?.street,
          zipCode: req.body?.zipCode,
        },
      };
      const user = await updateUser(userId, userData, imageData);
      res.status(200).json({
        message: "Successfully update user",
      });
    }
    if (req.body.inputType === "social") {
      const userData = {
        socialLink: {
          facebook: req.body?.facebook,
          twitter: req.body?.twitter,
          linkedin: req.body?.linkedin,
          instagram: req.body?.instagram,
        },
      };
      const user = await updateUser(userId, userData, imageData);
      res.status(200).json({
        message: "Successfully update user",
      });
    }
    if (req.body.inputType === "about") {
      const userData = {
        aboutMe: req.body?.aboutMe,
      };
      const user = await updateUser(userId, userData, imageData);
      res.status(200).json({
        message: "Successfully update user",
      });
    }
  } catch (e: any) {
    console.log(e);
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
}

// reset password controller
export async function resetPasswordHandler(req: Request, res: Response) {
  const userId = res.locals.user._id as string;
  const userEmail = res.locals.user.email as string;
  const userPassword = req.body.currentPassword;
  const userDetails = {
    password: userPassword,
    email: userEmail,
  };
  try {
    const user = await validatePassword(userDetails);
    if (!user) {
      return res.status(400).send({
        message: "Invalid current password",
      });
    }

    const input = {
      ...req.body,
    };

    const userPassword = await updatePassword(userId, input);

    const emailType = "RESET_PASSWORD";
    let emails;
    emails = await findEmailByEmailType(emailType);
    if (emails.length === 0) {
      const templateInput = {
        senderAddress: "Meta-Ads",
        subject: "Request to reset password",
        message: "You have changed your password",
        emailType: "RESET_PASSWORD",
      };
      await createEmail(templateInput);
      emails = await findEmailByEmailType("RESET_PASSWORD");
    }
    const emailData = emails[0];

    const inputEmailData = {
      userEmail: userEmail,
      emailData,
      userId,
      emailType,
    };
    sendNotificationEmail(inputEmailData);

    res.status(200).json({
      message: "You have successfully updated your password",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

// forget password email controller
export async function forgetPasswordHandler(req: Request, res: Response) {
  const userEmail = req.body.email;

  try {
    const user = await getUser({ email: userEmail });
    if (!user) {
      return res.status(400).send({
        message: "User with this email does not exists",
      });
    }

    const userId = user._id;
    const forgetPassToken = await signJwt(
      {
        userId,
      },
      { expiresIn: "20d" }
    );
    const resetInput = {
      resetLink: forgetPassToken,
    };
    await updateResetLink(userId, resetInput);

    const emailType = "FORGET_PASSWORD";
    let emails;
    emails = await findEmailByEmailType(emailType);
    if (emails.length === 0) {
      const templateInput = {
        senderAddress: "Meta-Ads",
        subject: "Request to reset password",
        message: "Please click on given link to reset your password",
        emailType: "FORGET_PASSWORD",
      };
      await createEmail(templateInput);
      emails = await findEmailByEmailType("FORGET_PASSWORD");
    }
    const emailData = emails[0];
    const inputEmailData = {
      forgetPassToken,
      userEmail: user.email,
      emailData,
      userId,
      emailType,
    };
    sendNotificationEmail(inputEmailData);

    res.status(200).json({
      message: "Reset password email sent, please follow the instruction",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

// forget password reset controller
export async function forgetPassResetHandler(req: Request, res: Response) {
  const resetLink = req.body.resetLink;
  const newPassword = req.body.newPassword;

  try {
    const verifyResponse = verifyJwt(resetLink) as any;
    const userId = verifyResponse.decoded?.userId;
    if (userId === null || userId === undefined) {
      return res.status(400).send({
        message: "Incorrect token or it is expired",
      });
    }
    const findOneInput = {
      resetLink: resetLink,
    };
    const user = await getUser(findOneInput);

    if (!user) {
      return res.status(400).send({
        message: "User with this token does not exists",
      });
    }

    const input = {
      newPassword: newPassword,
    };
    await updatePassword(userId, input);

    const resetInput = {
      resetLink: "",
    };
    await updateResetLink(user._id, resetInput);

    const emailType = "RESET_PASSWORD";
    let emails;
    emails = await findEmailByEmailType(emailType);
    if (emails.length === 0) {
      const templateInput = {
        senderAddress: "Meta-Ads",
        subject: "Request to reset password",
        message: "You have changed your password",
        emailType: "RESET_PASSWORD",
      };
      await createEmail(templateInput);
      emails = await findEmailByEmailType("RESET_PASSWORD");
    }
    const emailData = emails[0];

    const inputEmailData = {
      userEmail: user.email,
      emailData,
      userId,
      emailType,
    };
    sendNotificationEmail(inputEmailData);

    res.status(200).json({
      message: "You have successfully updated your password",
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

// Update the user package controller
export async function updateUserPackageHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const packageID = req.body.packageId;
  const packageName = req.body.packageName;
  try {
    const user = await getUser({ _id: userId });
    if (!user) {
      return res.status(400).send({
        message: "User does not exists",
      });
    }

    const packageResult = await getPackage(packageID);
    if (!packageResult) {
      return res.status(400).send({
        message: "Package does not exists",
      });
    }

    const input = {
      packageDetails: {
        packageId: packageID,
        packageName: packageName,
      },
    };
    await updateUserPackage(userId, input);

    res.status(200).json({
      message: "You have successfully updated your package",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}

// get user dashboard statistics handller
export async function getDashboardStatHandler(req: Request, res: Response) {
  const userId = res.locals.user._id as string;
  let user = res.locals.user;
  const isAdmin = user.role.isAdmin;
  const isSuperAdmin = user.role.isSuperAdmin;
  const adminEntry = isAdmin || isSuperAdmin;
  const isSeller = user.role.isSeller;
  const isBuyer = user.role.isBuyer;

  try {
    const result = await getDashboardStat({ user: userId });
    const userCurrentPlan = user?.packageDetails?.packageName;

    const {
      adsCount,
      inactiveAdsCount,
      totalPublishedAdsCount,
      totalFeaturedAdsCount,
      featuredAdCount,
      totalSellerCount,
      totalBuyerCount,
      favouriteAdsCount,
      totalRatingCount,
    } = result;

    // response based on user role
    if (adminEntry) {
      res.status(200).json({
        message: "Successfully found admin statistics",
        data: [
          {
            title: "Total Ads",
            count: totalPublishedAdsCount,
          },
          {
            title: "Total Sellers",
            count: totalSellerCount,
          },
          {
            title: "Total Buyers",
            count: totalBuyerCount,
          },
          {
            title: "Feature Ads",
            count: totalFeaturedAdsCount,
          },
          {
            title: "Favourite Ads",
            count: favouriteAdsCount,
          },
        ],
      });
    } else if (isSeller) {
      res.status(200).json({
        message: "Successfully found seller statistics",
        data: [
          {
            title: "Current Plan",
            count: userCurrentPlan,
          },
          {
            title: "Total Ads",
            count: adsCount,
          },
          {
            title: "Inactive Ads",
            count: inactiveAdsCount,
          },
          {
            title: "Total Ratings",
            count: totalRatingCount,
          },
          {
            title: "Featured Ads",
            count: featuredAdCount,
          },
        ],
      });
    } else if (isBuyer) {
      res.status(200).json({
        message: "Successfully found buyer statistics",
        data: [
          {
            title: "Favourite Ads",
            count: favouriteAdsCount,
          },
        ],
      });
    } else {
      res.status(200).json({
        message: "You are not authorized to access this page",
      });
    }
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
}
