import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';
import useSWR, { useSWRConfig } from 'swr';
import { LoaderPage } from '../../../../lib/loader';
import { authAxios } from '../../../../utils/axiosKits';

const fetcher = (url) => authAxios.get(url).then((res) => res.data.data);

const EditUserForm = () => {
    const { addToast } = useToasts();
    const router = useRouter();

    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const { data: userData, error: userError } = useSWR(
        `/admin/manage/user/${router.query.active_id}`,
        fetcher,
    );

    const userRole = userData?.role?.isSeller
        ? 'seller'
        : userData?.role?.isAdmin
        ? 'admin'
        : userData?.role?.isSuperAdmin
        ? 'superAdmin'
        : 'buyer';

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            roleAssigned: userRole,
            firstName: userData?.fullName?.firstName,
            lastName: userData?.fullName?.lastName,
            userName: userData?.userName,
            email: userData?.email,
        },
    });

    React.useEffect(() => {
        setValue('roleAssigned', userRole);
        setValue('firstName', userData?.fullName?.firstName);
        setValue('lastName', userData?.fullName?.lastName);
        setValue('userName', userData?.userName);
        setValue('email', userData?.email);
    }, [userData, userRole, setValue]);

    const onSubmit = async (data) => {
        const userId = userData?._id;

        const inputData = {
            roleAssigned: data.roleAssigned,
            fullName: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            userName: data.userName,
            email: data.email,
        };

        try {
            await authAxios({
                method: 'PUT',
                url: `/admin/manage/user/${userId}`,
                data: inputData,
            }).then((res) => {
                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                mutate('/admin/manage/user');
                router.push('/dashboard/superadmin/users');
            });
        } catch (error) {
            if (error?.response?.data) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } else {
                addToast(error?.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    };

    return (
        <section className="max-w-lg	bg-white rounded-xl shadow-boxShadow p-10 mx-auto mb-36">
            <div className="flex items-center justify-between">
                <h1 className="text-lg text-themeBlackDarker font-bold">
                    Add New User
                </h1>
                <Link href="/dashboard/superadmin/users/">
                    <a>
                        <button className="text-sm font-semibold text-themePrimary">
                            Cancel
                        </button>
                    </a>
                </Link>
            </div>

            <div className="pt-7 relative">
                {userError && (
                    <div className="bg-red-300 my-2 text-white py-1 p-2.5 text-xss rounded text-center">
                        Failed to load data
                    </div>
                )}
                {!userError && !userData && <LoaderPage />}

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                    <div className="w-full">
                        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                            I am
                        </p>
                        <div className="py-3 border border-themeGrayLight rounded w-full px-3 relative">
                            <select
                                name="location"
                                className=" rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full"
                                {...register('roleAssigned', {
                                    required: true,
                                })}
                            >
                                <option value="">Select Role</option>
                                <option value="seller">Seller</option>
                                <option value="buyer">Buyer</option>
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super Admin</option>
                            </select>
                            <RiArrowDownSLine className="h-5 w-5 text-themeGrayWhite absolute top-7 right-3 transform -translate-y-1/2" />
                        </div>
                        {errors.roleAssigned && (
                            <span className="text-red-400 text-sm italic">
                                This field is required
                            </span>
                        )}
                    </div>
                    <label className="w-full" htmlFor="">
                        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                            User First Name
                        </p>
                        <input
                            type="text"
                            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full"
                            {...register('firstName', { required: true })}
                        />
                        {errors.firstName && (
                            <span className="text-red-400 text-sm italic">
                                This field is required
                            </span>
                        )}
                    </label>
                    <label className="w-full" htmlFor="">
                        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                            User Last Name
                        </p>
                        <input
                            type="text"
                            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full"
                            {...register('lastName', { required: true })}
                        />
                        {errors.lastName && (
                            <span className="text-red-400 text-sm italic">
                                This field is required
                            </span>
                        )}
                    </label>
                    <label className="w-full" htmlFor="">
                        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                            User Email
                        </p>
                        <input
                            type="email"
                            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <span className="text-red-400 text-sm italic">
                                This field is required
                            </span>
                        )}
                    </label>
                    <label className="w-full" htmlFor="">
                        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                            User Name
                        </p>
                        <input
                            type="text"
                            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full"
                            {...register('userName', { required: true })}
                        />
                        {errors.userName && (
                            <span className="text-red-400 text-sm italic">
                                This field is required
                            </span>
                        )}
                    </label>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex gap-2 text-base font-semibold text-white bg-themePrimary py-3 px-6 rounded w-fit"
                    >
                        {isSubmitting ? 'Please wait...' : 'Update User'}
                        {/* spinner */}
                        {isSubmitting && (
                            <div className="flex items-center justify-center ">
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditUserForm;
