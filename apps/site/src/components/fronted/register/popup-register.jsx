import styled from '@emotion/styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { ThemeContext } from '../../../context/ThemeContext';
import { Axios } from '../../../utils/axiosKits';

const PopupRegister = () => {
    const { RegisterPopup, RegisterPopupHandler, LoginPopupHandler } =
        React.useContext(ThemeContext);
    const [CurrentPage, setCurrentPage] = React.useState(1);
    const [UserType, setUserType] = React.useState('buyer');
    const { addToast } = useToasts();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    /* ----------------------------- register submit function ---------------------------- */
    const onSubmitHandler = async (data) => {
        if (CurrentPage === 1) {
            setCurrentPage(2);
        }
        if (CurrentPage === 2) {
            if (data.password !== data.confirm_password) {
                addToast('Password and Confirm Password does not match', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }

            const inputData = {
                fullName: {
                    firstName: data.first_name,
                    lastName: data.last_name,
                },
                userName: data.user_name,
                email: data.email,
                isConfirmed: false,
                password: data.password,
                role: {
                    isBuyer: data.user_role === 'buyer' ? true : false,
                    isSeller: data.user_role === 'seller' ? true : false,
                    isAdmin: data.user_role === 'admin' ? true : false,
                    isSuperAdmin:
                        data.user_role === 'isSuperAdmin' ? true : false,
                },
            };

            try {
                await Axios({
                    method: 'post',
                    url: `/user/signup`,
                    data: {
                        fullName: {
                            firstName: data.first_name,
                            lastName: data.last_name,
                        },
                        userName: data.user_name,
                        email: data.email,
                        isConfirmed: false,
                        password: data.password,
                        role: {
                            isBuyer: data.user_role === 'buyer' ? true : false,
                            isSeller:
                                data.user_role === 'seller' ? true : false,
                            isAdmin: data.user_role === 'admin' ? true : false,
                            isSuperAdmin:
                                data.user_role === 'isSuperAdmin'
                                    ? true
                                    : false,
                        },
                    },
                }).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        RegisterPopupHandler();
                        LoginPopupHandler();
                        setTimeout(() => {
                            setCurrentPage(1);
                            reset();
                        }, 3000);
                    }
                });
            } catch (error) {
                addToast(error.response.data?.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    };

    /* ------------------------- previous page function ------------------------- */
    const previousHandler = () => {
        if (CurrentPage === 2) {
            setCurrentPage(1);
        }
    };

    const LoginHandler = async () => {
        await RegisterPopupHandler();
        setTimeout(() => {
            LoginPopupHandler();
        }, 300);
    };

    return (
        <PopupRegisterWrapper className={RegisterPopup ? 'show' : 'hide'}>
            <div className="flex justify-center items-center w-full h-screen">
                <RegisterForm className={RegisterPopup ? 'show' : 'hide'}>
                    <RegisterFormTitle>
                        <RegisterFormTitleText>
                            {CurrentPage === 1
                                ? 'Create an Account'
                                : 'Password Confirmation'}
                        </RegisterFormTitleText>
                        <RegisterFormTitleClose
                            onClick={RegisterPopupHandler}
                            className="hover:bg-themePrimary duration-300 ease-in-out"
                        >
                            <RegisterFormTitleCloseIcon />
                        </RegisterFormTitleClose>
                    </RegisterFormTitle>
                    <RegisterFormBody>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            {CurrentPage === 1 && (
                                <>
                                    <div className="flex gap-6 pt-2 pb-8 w-full">
                                        <Label className="w-6/12">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                id="buyer-radio"
                                                defaultValue="buyer"
                                                className="hidden absolute"
                                                {...register('user_role')}
                                                defaultChecked={
                                                    UserType === 'buyer'
                                                        ? true
                                                        : false
                                                }
                                                onChange={() => {
                                                    setUserType('buyer');
                                                    setValue(
                                                        'user_role',
                                                        'buyer',
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor="buyer-radio"
                                                className={`w-full duration-300 ease-in-out px-3 py-2.5 text-center cursor-pointer rounded inline-block ${
                                                    UserType === 'buyer'
                                                        ? 'bg-themePrimary text-white'
                                                        : 'bg-themeWhiteLight  hover:bg-themePrimaryLighter text-themeBlackDarker hover:text-themePrimary'
                                                }`}
                                            >
                                                Buyer
                                            </label>
                                        </Label>
                                        <Label className="w-6/12">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                id="seller-radio"
                                                defaultValue="seller"
                                                {...register('user_role')}
                                                className="hidden absolute"
                                                defaultChecked={
                                                    UserType === 'seller'
                                                        ? true
                                                        : false
                                                }
                                                onChange={() => {
                                                    setUserType('seller');
                                                    setValue(
                                                        'user_role',
                                                        'seller',
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor="seller-radio"
                                                className={`duration-300 ease-in-out px-3 py-2.5 w-full text-center cursor-pointer rounded inline-block ${
                                                    UserType === 'seller'
                                                        ? 'bg-themePrimary text-white'
                                                        : 'bg-themeWhiteLight  hover:bg-themePrimaryLighter text-themeBlackDarker hover:text-themePrimary'
                                                }`}
                                            >
                                                Seller
                                            </label>
                                        </Label>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border ${
                                                errors?.first_name
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } rounded-lg placeholder-themeGrayWhite text-themeBlackDarker focus:outline-none `}
                                            type="name"
                                            {...register('first_name', {
                                                required: true,
                                            })}
                                            placeholder="Enter Your First Name"
                                        />
                                        {errors?.first_name && (
                                            <span className="text-red-600 text-xss italic">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border ${
                                                errors?.last_name
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } rounded-lg placeholder-themeGrayWhite text-themeBlackDarker focus:outline-none `}
                                            type="name"
                                            {...register('last_name', {
                                                required: true,
                                            })}
                                            placeholder="Enter Your Last Name"
                                        />
                                        {errors?.last_name && (
                                            <span className="text-red-600 text-xss italic">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            Email
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border rounded-lg placeholder-themeGrayWhite focus:outline-none focus:ring-2 ${
                                                errors?.email
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } focus:ring-themePrimary focus:ring-opacity-50`}
                                            type="name"
                                            {...register('email', {
                                                required: true,
                                            })}
                                            placeholder="Enter Your Email"
                                        />
                                        {errors?.email && (
                                            <span className="text-red-600 text-xss italic">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            User Name
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border rounded-lg placeholder-themeGrayWhite focus:outline-none focus:ring-2 ${
                                                errors?.user_name
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } focus:ring-themePrimary focus:ring-opacity-50`}
                                            type="name"
                                            {...register('user_name', {
                                                required: true,
                                            })}
                                            placeholder="Enter Your User Name"
                                        />
                                        {errors?.email && (
                                            <span className="text-red-600 text-xss italic">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}

                            {CurrentPage === 2 && (
                                <>
                                    <div className="mb-3">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            Password
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border ${
                                                errors?.password
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } rounded-lg placeholder-themeGrayWhite text-themeBlackDarker focus:outline-none `}
                                            type="password"
                                            {...register('password', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'This field is required',
                                                },
                                            })}
                                            placeholder="Enter Password"
                                        />
                                        {errors?.password && (
                                            <span className="text-red-600 text-xss italic">
                                                {errors?.password?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-themeBlackAlt"
                                            htmlFor=""
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            className={`appearance-none block w-full !p-3 leading-5 text-themeBlackDarker border ${
                                                errors?.confirm_password
                                                    ? '!border-red-500'
                                                    : 'border-gray'
                                            } rounded-lg placeholder-themeGrayWhite text-themeBlackDarker focus:outline-none `}
                                            type="password"
                                            {...register('confirm_password', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'This field is required',
                                                },
                                                validate: (value) =>
                                                    value ===
                                                        watch('password') ||
                                                    'Passwords do not match',
                                            })}
                                            placeholder="Enter Confirm Password"
                                        />
                                        {errors?.confirm_password && (
                                            <span className="text-red-600 text-xss italic">
                                                {
                                                    errors?.confirm_password
                                                        ?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="flex gap-4">
                                {CurrentPage === 2 && (
                                    <button
                                        onClick={previousHandler}
                                        className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                                    >
                                        Previous
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex gap-2 justify-center items-center !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 ${
                                        isSubmitting
                                            ? 'bg-themeDarkerAlt'
                                            : 'bg-themePrimary'
                                    } rounded-md hover:bg-black`}
                                >
                                    {CurrentPage === 1 ? (
                                        'Next'
                                    ) : (
                                        <>
                                            {isSubmitting
                                                ? 'Please wait...'
                                                : 'Sign Up'}
                                            {isSubmitting && (
                                                <div className="spinner-grow w-5 h-5 text-themePrimary" />
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        <p className="text-center">
                            <span className="text-xss1 text-themeWhiteLighter">
                                Already have an account?
                            </span>
                            <button
                                onClick={LoginHandler}
                                className="inline-block text-xss1 text-themePrimary hover:underline ml-4"
                            >
                                Log In
                            </button>
                        </p>
                    </RegisterFormBody>
                </RegisterForm>
                <PopupOverlay onClick={RegisterPopupHandler} />
            </div>
        </PopupRegisterWrapper>
    );
};

export default PopupRegister;

const RegisterFormTitleCloseIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                fill="currentColor"
            />
        </svg>
    );
};

const PopupRegisterWrapper = styled('div')`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    color: #fff;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    &.show {
        opacity: 1;
        visibility: visible;
    }
`;
const RegisterForm = styled('div')`
    max-width: 550px;
    width: 100%;
    max-height: 650px;
    overflow: auto;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(0.7);
    transition: all 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    position: relative;
    z-index: 2;
    &.show {
        transform: scale(1);
        opacity: 1;
        visibility: visible;
    }
`;
const RegisterFormTitle = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #ebebeb;
`;
const RegisterFormTitleText = styled('div')`
    font-size: 28px;
    font-weight: 500;
    color: #000;
`;
const RegisterFormTitleClose = styled('div')`
    cursor: pointer;
    padding: 15px;
    background-color: #000;
    border-radius: 5px;
    & svg {
        color: #fff;
        width: 16px;
        height: 16px;
    }
`;
const RegisterFormBody = styled('div')`
    padding: 25px 40px;
`;
const PopupOverlay = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;
const Label = styled('div')``;
