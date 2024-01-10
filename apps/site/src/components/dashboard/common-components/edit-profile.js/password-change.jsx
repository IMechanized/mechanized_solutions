import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { authAxios } from '../../../../utils/axiosKits';

const PasswordChange = () => {
  const { addToast } = useToasts();

  const {
    register: register,
    handleSubmit: handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm({
    mode: "onChange",
  });

  // reset Password handler
  const onSubmitPassword = async (data) => {
    // validate new-password
    const newPass = data.newPassword;
    if (newPass.length < 6) {
      return addToast("Too-short New password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (newPass.length > 30) {
      return addToast("Too-long New password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (newPass.search(/\d/) == -1) {
      return addToast("Need Number in New password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (newPass.search(/[a-zA-Z]/) == -1) {
      return addToast("Need Letter in New password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (newPass.search(/[A-Z]/) == -1) {
      return addToast("Need Uppercase in New password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (newPass.search(/[a-z]/) == -1) {
      return addToast("Need Lowercase in New password", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    const passwordData = {
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
    };
    try {
      await authAxios({
        method: "PUT",
        url: `/user/reset`,
        data: passwordData,
      }).then((res) => {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
      });
    } catch (error) {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmitPassword)}>
        <div>
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            Current Password
          </p>
          <input
            type="password"
            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-themeBlackAlt"
            {...register("currentPassword", { required: true })}
          />
          {errors.currentPassword && (
            <span className="text-red-400 text-sm italic block">
              This field is required
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            New Password
          </p>
          <input
            type="password"
            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-themeBlackAlt"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && (
            <span className="text-red-400 text-sm italic block">
              This field is required
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            Re-Type New Password
          </p>
          <input
            type="password"
            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full md:w-8/12 lg:w-4/12 placeholder:text-themeBlackAlt"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "This field is required",
              },
              validate: (value) =>
                value === watch("newPassword") ||
                "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-400 text-sm italic block">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
        <button
          disabled={!isDirty || isSubmitting}
          type="submit"
          className={`flex bg-themePrimary py-3 px-6 rounded-md text-white mt-12 mb-2 ${isDirty ? "opacity-100" : "opacity-30"}`}
        >
          {isSubmitting ? "Please wait..." : "Change Password"}
          {/* spinner */}
          {isSubmitting && (
            <div className="ml-2 flex items-center justify-center ">
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;