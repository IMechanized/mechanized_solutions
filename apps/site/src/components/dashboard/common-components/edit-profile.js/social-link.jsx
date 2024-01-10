import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import useUser from "../../../../lib/user";
import { authAxios } from "../../../../utils/axiosKits";

const SocialLink = () => {
  const { user } = useUser();
  const userData = user?.data;

  const { addToast } = useToasts();
  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      facebook: userData?.socialLink?.facebook,
      twitter: userData?.socialLink?.twitter,
      linkedin: userData?.socialLink?.linkedin,
      instagram: userData?.socialLink?.instagram,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("inputType", 'social');
    formData.append("facebook", data.facebook);
    formData.append("twitter", data.twitter);
    formData.append("linkedin", data.linkedin);
    formData.append("instagram", data.instagram);

    try {
      await authAxios({
        method: "PUT",
        url: `/user/self`,
        data: formData,
      }).then((res) => {
        mutate("/user/self").then(() => {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
        });
      });
    } catch (error) {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* facebook */}
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-themeWhiteLighter">
              Facebook
            </p>
            <input
              className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-8/12 placeholder:text-themeBlackAlt"
              type="text"
              placeholder="https://facebook.com/user-name-here"
              {...register("facebook")}
            />
          </div>

          {/* twitter */}
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-themeWhiteLighter">
              Twitter
            </p>
            <input
              className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-8/12 placeholder:text-themeBlackAlt"
              type="text"
              placeholder="https://twitter.com/user-name-here"
              {...register("twitter")}
            />
          </div>

          {/* linkedin */}
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-themeWhiteLighter">
              Linkedin
            </p>
            <input
              className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-8/12 placeholder:text-themeBlackAlt"
              type="text"
              placeholder="https://linkedin.com/user-name-here"
              {...register("linkedin")}
            />
          </div>

          {/* instagram */}
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold text-themeWhiteLighter">
              Instagram
            </p>
            <input
              className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-8/12 placeholder:text-themeBlackAlt"
              type="text"
              placeholder="https://instagram.com/user-name-here"
              {...register("instagram")}
            />
          </div>
        </div>
        <button
          disabled={!isDirty || isSubmitting}
          type="submit"
          className={`flex bg-themePrimary py-3 px-6 rounded-md text-white mt-12 mb-2  ${isDirty ? "opacity-100" : "opacity-30"}`}
        >
          {isSubmitting ? "Please wait..." : "Save Changes"}
          {/* spinner */}
          {isSubmitting && (
            <div className="ml-2 flex items-center justify-center ">
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default SocialLink;
