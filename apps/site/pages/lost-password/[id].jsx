import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import Layout from '../../src/components/fronted/layout/layout';
import { Axios } from '../../src/utils/axiosKits';

const NewPassword = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const { addToast } = useToasts();

    const onSubmitHandler = async (data) => {
        // join reset link to the url
        let newData = {
            ...data,
            resetLink: router.query.id,
        };
        delete newData.confirmPassword; // remove confirm password

        try {
            await Axios({
                method: 'PUT',
                url: `/user/account/reset-password`,
                data: newData,
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    router.replace('/login');
                    reset();
                }
            });
        } catch (error) {
            if (error?.response?.data) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } else {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    };
    return (
        <div>
            <Head>
                <title>Lost password - Meta Ads</title>
                <meta name="description" content="New password setup" />
            </Head>

            <Layout>
                <main>
                    <div className="container mx-auto">
                        <div className="flex justify-center !px-5 my-20">
                            <div className="w-full lg:w-1/2 !p-6 m-auto shadow-card rounded bg-white">
                                <h1 className="text-lg text-center font-semibold">
                                    New Password
                                </h1>
                                <p className="text-center text-themeLight">
                                    Please enter your new password
                                </p>
                                <form
                                    className="!mt-5"
                                    onSubmit={handleSubmit(onSubmitHandler)}
                                >
                                    <div className="!mb-5">
                                        <input
                                            type="password"
                                            {...register('newPassword', {
                                                required:
                                                    'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        'Password must be at least 8 characters',
                                                },
                                            })}
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                                                errors?.newPassword
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } placeholder:font-normal placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-0 focus:ring-opacity-50`}
                                            placeholder="New Password"
                                        />
                                        {errors?.newPassword && (
                                            <span className="text-red-500 text-xss italic">
                                                {errors.newPassword.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="!mb-5">
                                        <input
                                            type="password"
                                            {...register('confirmPassword', {
                                                required:
                                                    'Confirm Password is required',
                                                validate: (value) =>
                                                    value ===
                                                        watch('newPassword') ||
                                                    'Passwords do not match',
                                            })}
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                                                errors?.confirmPassword
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } placeholder:font-normal placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-0 focus:ring-opacity-50`}
                                            placeholder="Confirm Password"
                                        />
                                        {errors?.confirmPassword && (
                                            <span className="text-red-500 text-xss italic">
                                                {
                                                    errors?.confirmPassword
                                                        ?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 rounded-md bg-themePrimary hover:bg-themeSecondary`}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? 'Please wait...'
                                            : 'Reset Password'}
                                        {isSubmitting && (
                                            <div
                                                className="spinner-grow w-5 h-5 text-themePrimary"
                                                role="status"
                                            >
                                                <span className="sr-only">
                                                    Loading...
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    );
};

export default NewPassword;
