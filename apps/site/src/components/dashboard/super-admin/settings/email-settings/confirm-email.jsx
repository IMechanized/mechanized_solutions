import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { LoaderPage } from "../../../../../lib/loader";
import { authAxios } from "../../../../../utils/axiosKits";

const ConfirmEmail = ({ emailData, loading, emailType }) => {
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      senderAddress: emailData?.senderAddress,
      senderEmail: emailData?.senderEmail,
      subject: emailData?.subject,
      message: emailData?.message,
      emailType: emailData?.emailType,
    },
  });

  React.useEffect(() => {
    setValue("senderAddress", emailData?.senderAddress);
    setValue("senderEmail", emailData?.senderEmail);
    setValue("subject", emailData?.subject);
    setValue("message", emailData?.message);
    setValue("emailType", emailData?.emailType);
  }, [emailData, setValue]);

  const onEmailSubmit = async (data) => {
    const inputData = {
      ...data,
      emailType,
    };
    try {
      await authAxios({
        method: "PUT",
        url: `/admin/notification/email/${emailType}`,
        data: inputData,
      }).then((res) => {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    } catch (error) {
      addToast(error.response?.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="relative">
      {/* loader  */}
      {loading && (
        <LoaderPage />
      )}
      <form className="grid gap-y-6" onSubmit={handleSubmit(onEmailSubmit)}>
        <div className="flex flex-wrap sm:flex-nowrap gap-6 w-full">
          <label className="w-full" htmlFor="">
            <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
              Sender Name
            </p>
            <input
              type="text"
              className="w-full rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none placeholder:text-sm placeholder:text-themeBlackAlt"
              placeholder="Meta Ads"
              {...register("senderAddress", { required: true })}
            />
            {errors.senderAddress && (
              <span className="text-red-400 text-sm italic">
                This field is required
              </span>
            )}
          </label>
          <label className="w-full" htmlFor="">
            <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
              Sender Email
            </p>
            <input
              type="email"
              className="w-full rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none placeholder:text-sm placeholder:text-themeBlackAlt"
              placeholder="info@metads.com"
              {...register("senderEmail", { required: true })}
            />
            {errors.senderEmail && (
              <span className="text-red-400 text-sm italic">
                This field is required
              </span>
            )}
          </label>
        </div>
        <label className="w-full" htmlFor="">
          <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
            Email Subject
          </p>
          <input
            type="text"
            className="w-full rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none placeholder:text-sm placeholder:text-themeBlackAlt"
            placeholder="Confirm Your Email - Meta Ads"
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <span className="text-red-400 text-sm italic">
              This field is required
            </span>
          )}
        </label>
        <label className="w-full" htmlFor="">
          <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
            Email Content
          </p>
          <textarea
            type="email"
            className="w-full h-32 rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none placeholder:text-sm placeholder:text-themeBlackAlt"
            placeholder="Please click this link to confirm your email:"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-400 text-sm italic">
              This field is required
            </span>
          )}
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex gap-2 bg-themePrimary rounded text-base text-white font-semibold py-3 px-7 mt-4 w-fit">
          {isSubmitting ? "Please wait..." : "Save"}
          {/* spinner */}
          {isSubmitting && (
            <div className="flex items-center justify-center ">
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
