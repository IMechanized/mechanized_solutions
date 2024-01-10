import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { ThemeContext } from "../../../context/ThemeContext";
import PopupModule from "../../../lib/popup-modul";
import useUser from "../../../lib/user";
import { Axios } from "../../../utils/axiosKits";

const LostPassword = () => {
    const { lostPasswordShow, lostPasswordHandler } =
        React.useContext(ThemeContext);
    const { loggedIn } = useUser();
    const { addToast } = useToasts();
    const [currentStep, setCurrentStep] = React.useState(1);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // lost password submit handler
    const onSubmit = async (data) => {
        try {
            await Axios({
                method: "PUT",
                url: `/user/account/forget-password`,
                data: {
                    email: data.email,
                },
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    setCurrentStep(2);
                    reset();
                }
            });
        } catch (error) {
            if (error.response?.data) {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            } else {
                addToast(error.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
    };

    return (
        <>
            {/* Lost Password popup module */}
            <PopupModule
                PopupTitle="Lost Password"
                Popup={lostPasswordShow}
                PopupHandler={() => {
                    lostPasswordHandler();
                    reset();
                    setCurrentStep(1);
                }}
            >
                {currentStep === 1 && (
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="!mb-6">
                            <input
                                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${errors?.email ? "!border-red-500" : "border-gray"
                                    } placeholder:font-normal placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-0 focus:ring-opacity-50`}
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                placeholder="Email Address"
                            />
                            {errors?.email && (
                                <span className="text-red-500 text-xss italic">
                                    {errors?.email?.message}
                                </span>
                            )}
                        </div>
                        <button
                            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Reset Password"}
                            {isSubmitting && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                )}
                {currentStep === 2 && (
                    <div className="!mb-6">
                        <p className="!text-center text-xs text-themeDarker">
                            Please check your email for a link to reset your password.
                        </p>
                    </div>
                )}
            </PopupModule>
        </>
    );
};

export default LostPassword;
