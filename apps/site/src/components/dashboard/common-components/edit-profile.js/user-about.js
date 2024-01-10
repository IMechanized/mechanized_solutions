import React from 'react';
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import useUser from "../../../../lib/user";
import { authAxios } from "../../../../utils/axiosKits";

const UserAbout = () => {
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
            aboutMe: userData?.aboutMe
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("inputType", 'about');
        formData.append("aboutMe", data.aboutMe);

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
                <textarea
                    className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full h-36"
                    name="about"
                    {...register("aboutMe")}
                />
                <button
                    disabled={!isDirty || isSubmitting}
                    type="submit"
                    className={`flex bg-themePrimary py-3 px-6 rounded-md text-white mt-6 mb-2 ${isDirty ? "opacity-100" : "opacity-30"}`}
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

export default UserAbout;