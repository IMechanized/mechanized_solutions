import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import Layout from "../../src/components/fronted/layout/layout";
import useUser from "../../src/lib/user";
import { ThemeContext } from "../../src/context/ThemeContext";
import { authAxios } from "../../src/utils/axiosKits";

const VerifyEmail = () => {
    const { user, isConfirmed } = useUser();
    const { LoginPopupHandler } = React.useContext(ThemeContext);
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const { addToast } = useToasts();

    // verify email handler
    const verifyHandler = async () => {
        setLoading(true);
        try {
            await authAxios({
                method: "POST",
                url: `/user/confirmation/${router.query.id}`,
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    mutate(`/user/self`).then(() => {
                        setLoading(false);
                    });
                }
            });
        } catch (error) {
            if (error?.response?.data) {
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
            setLoading(false);
        }
    };

    return (
        <div>
            <Head>
                <title>Verify email - Meta Ads</title>
                <meta name="description" content="New password setup" />
            </Head>

            <Layout>
                <main>
                    <div className="container mx-auto">
                        <div className="flex justify-center !px-5 my-20">
                            <div className="w-full lg:w-1/2 !p-10 m-auto shadow-card rounded-lg bg-white">
                                {!user?.data && (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-3xl font-bold text-gray-800 !mb-3">
                                                You are not logged in
                                            </h1>
                                            <p className="text-gray-600">Please login to continue</p>
                                            <div className="mt-10">
                                                <button
                                                    className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base bg-themePrimary text-white font-normal text-center leading-6 rounded-md  hover:bg-themeSecondary`}
                                                    onClick={LoginPopupHandler}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {user?.data && !isConfirmed ? (
                                    <>
                                        <div className="!mb-3">
                                            <MdMarkEmailUnread className="text-7xl mx-auto text-themePrimary" />
                                        </div>
                                        <h1 className="text-lg text-center font-semibold !mb-3">
                                            Verify Email Address
                                        </h1>
                                        <p className="text-center text-themeLight w-3/4 mx-auto">
                                            {`You're almost there! Please verify your email address by clicking the link we just sent you.`}
                                        </p>
                                        <button
                                            className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white bg-themePrimary font-normal text-center leading-6 rounded-md hover:bg-themeSecondary `}
                                            type="submit"
                                            onClick={verifyHandler}
                                            disabled={loading}
                                        >
                                            {loading ? "Please wait..." : "Verify Email"}
                                            {loading && (
                                                <div
                                                    className="spinner-grow w-5 h-5 text-themePrimary"
                                                    role="status"
                                                >
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            )}
                                        </button>
                                    </>
                                ) : (
                                    user?.data &&
                                    isConfirmed && (
                                        <>
                                            <div className="!mb-3">
                                                <MdMarkEmailRead className="text-7xl mx-auto text-themePrimary" />
                                            </div>
                                            <h1 className="text-lg text-center font-semibold !mb-3">
                                                Email Verified
                                            </h1>
                                            <p className="text-center text-themeLight w-3/4 mx-auto">
                                                Your email address is already verified. You can now back
                                                to your dashboard.
                                            </p>
                                            <button
                                                className={`!py-3 px-12 w-1/2 mx-auto !mt-10 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base bg-themePrimary text-white font-normal text-center leading-6  rounded-md hover:bg-themeSecondary`}
                                                type="submit"
                                                onClick={() => {
                                                    router.push("/dashboard");
                                                }}
                                            >
                                                Dashboard
                                            </button>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    );
};

export default VerifyEmail;
