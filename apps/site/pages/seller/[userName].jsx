import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsShield } from 'react-icons/bs';
import { HiStar } from 'react-icons/hi';
import { RiBriefcaseLine } from 'react-icons/ri';
import { VscCalendar } from 'react-icons/vsc';
import Rating from 'react-rating';
import { useToasts } from 'react-toast-notifications';
import useSWR, { useSWRConfig } from 'swr';
import Layout from '../../src/components/fronted/layout/layout';
import SellerAds from '../../src/components/fronted/seller-ads';
import { ThemeContext } from '../../src/context/ThemeContext';
import PopupModule from '../../src/lib/popup-modul';
import useUser from '../../src/lib/user';
import Image from '../../src/optimize/image';
import { authAxios, Axios } from '../../src/utils/axiosKits';

const data = ['1', '2', '3'];
const fetcher = (url) => Axios(url).then((res) => res.data.data);
// const reviewfetcher = (url) => Axios(url).then((res) => res.data.data);

const SellerProfile = () => {
    const [review, setReview] = React.useState(false);
    const [currentView, setCurrentView] = React.useState(1);
    const [showButton, setShowButton] = React.useState(true);
    const [reviewPerView, setReviewPerView] = React.useState(3);
    const totalReviewsPerView = currentView * reviewPerView;

    const { LoginPopupHandler } = React.useContext(ThemeContext);
    const { user, loggedIn } = useUser();
    const userData = user?.data;
    const router = useRouter();
    const { userName } = router.query;
    const { data: sellerAllData, error: sellerAllError } = useSWR(
        userName ? `/user/seller/${userName}` : null,
        fetcher,
    );
    const seller = sellerAllData?.seller;
    const sellerAds = sellerAllData?.sellerAds;

    const sellerImageUrl = seller?.avatar
        ? seller?.avatar
        : `https://ui-avatars.com/api/?name=${seller?.fullName?.firstName}&background=random&length=1&size=50`;
    const dateFormate = new Date(seller?.createdAt);
    const date = dateFormate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const { data: reviewAllData, error: reviewAllError } = useSWR(
        userName ? `/seller/review/${seller?._id}` : null,
        fetcher,
        {
            refreshInterval: 0,
        },
    );

    const [ratingValue, setRatingValue] = React.useState(0);
    const [ratingValueError, setRatingValueError] = React.useState(false);

    const onRatingClick = (rate) => {
        setRatingValue(rate);
        setRatingValueError(false);
    };

    const {
        register: reviewRegister,
        handleSubmit: reviewHandleSubmit,
        reset: reviewReset,
        formState: { errors: reviewErrors, isSubmitting: reviewIsSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    const reviewSubmit = async (data) => {
        if (ratingValue === 0) {
            setRatingValueError(true);
            return;
        }
        const reviewInput = {
            sellerId: seller?._id,
            review: data.review,
            ratingNumber: ratingValue,
        };

        try {
            await authAxios({
                method: 'PUT',
                url: '/seller/review',
                data: reviewInput,
            }).then((res) => {
                mutate(`/user/seller/${userName}`).then(() => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setReview(!review);
                    setRatingValueError(false);
                    reviewReset();
                });
            });
        } catch (error) {
            addToast(error.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setRatingValueError(false);
        }
    };

    const reviewViewsHandler = () => {
        setCurrentView(currentView + 1);
        if (totalReviewsPerView >= reviewAllData?.reviews.length) {
            setShowButton(false);
        }
    };

    return (
        <>
            <Head>
                <title>Seller Details</title>
                <meta name="viewport" content="" />
            </Head>
            <Layout>
                <section className="bg-themeWhiteLight">
                    <div className="container mx-auto pt-16 pb-20 px-5 sm:px-0">
                        {!sellerAllData && (
                            // <LoaderPage />
                            <div className="absolute w-full h-full bg-[#ffffffd0] z-40 flex justify-center items-center">
                                <div className="flex  items-center justify-center space-x-2 animate-pulse">
                                    <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                    <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                    <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-8 xl:gap-14">
                            <div className="col-span-3 sm:col-span-5 lg:col-span-1 ">
                                <div className="bg-white relative shadow-sectionShadow text-themeGray-800 rounded-2xl pb-10 sm:w-10/12 lg:w-full sm:mx-auto lg:mx-0">
                                    <div className="right-0 mt-4 mr-4 rounded-[3px] absolute text-center font-bold text-xs text-white px-5 py-2 bg-orange-500 z-20 uppercase">
                                        {seller?.sellerType}
                                    </div>
                                    <Image
                                        src={'/banner.png'}
                                        width={475}
                                        height={200}
                                        alt="Image"
                                        className="rounded-lg w-full object-cover"
                                        layout="responsive"
                                    />
                                    <div className="flex absolute -mt-16 left-0 right-0 justify-center">
                                        <Image
                                            src={sellerImageUrl}
                                            width={130}
                                            height={130}
                                            alt="Image"
                                            className="rounded-full object-center object-cover border-white mr-2"
                                        />
                                    </div>
                                    <div className="py-7 px-2 pt-24">
                                        <p className="font-bold text-2xl text-center text-themeBlackAlt pt-3">
                                            {seller?.fullName?.firstName}{' '}
                                            {seller?.fullName?.lastName}
                                        </p>
                                        <div className="flex gap-1 justify-center pt-3">
                                            {/* <HiStar className="text-themeYellowLight text-base" />
                                            <HiStar className="text-themeYellowLight text-base" />
                                            <HiStar className="text-themeYellowLight text-base" />
                                            <HiStar className="text-themeYellowLight text-base" />
                                            <IoIosStarHalf className="text-themeYellowLight text-base" /> */}
                                            <div>
                                                <Rating
                                                    initialRating={
                                                        reviewAllData?.averageRating
                                                    }
                                                    readonly
                                                    emptySymbol={
                                                        <HiStar className="text-themeGrayLight text-base" />
                                                    }
                                                    fullSymbol={
                                                        <HiStar className="text-themeYellowLight text-base" />
                                                    }
                                                />
                                            </div>
                                            <p className="text-xs font-normal text-themeBlackAlt">
                                                ({reviewAllData?.reviewCount}{' '}
                                                Review
                                                {reviewAllData?.reviewCount > 1
                                                    ? 's'
                                                    : ''}
                                                )
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-5 sm:px-10 md:px-6 lg:px-10">
                                        <div className="bg-themePrimaryLighter w-full py-5 text-center rounded-lg">
                                            <h3 className="text-2xl font-bold text-themePrimary">
                                                {sellerAds?.length < 10 && (
                                                    <span>0</span>
                                                )}
                                                {sellerAds?.length}
                                            </h3>
                                            <p className="text-base font-semibold text-themeBlackAlt">
                                                Ad
                                                {sellerAds?.length > 1 && (
                                                    <span>s</span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="space-y-6 py-8">
                                            <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                                                <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="text-themePrimary"
                                                    >
                                                        <path
                                                            d="M16 3C11.043 3 7 7.04297 7 12C7 13.4062 7.57031 15.0195 8.34375 16.7812C9.11719 18.543 10.1133 20.4141 11.125 22.1562C13.1484 25.6445 15.1875 28.5625 15.1875 28.5625L16 29.75L16.8125 28.5625C16.8125 28.5625 18.8516 25.6445 20.875 22.1562C21.8867 20.4141 22.8828 18.543 23.6562 16.7812C24.4297 15.0195 25 13.4062 25 12C25 7.04297 20.957 3 16 3ZM16 5C19.8789 5 23 8.12109 23 12C23 12.8008 22.5703 14.3164 21.8438 15.9688C21.1172 17.6211 20.1133 19.4531 19.125 21.1562C17.5547 23.8672 16.5781 25.3008 16 26.1562C15.4219 25.3008 14.4453 23.8672 12.875 21.1562C11.8867 19.4531 10.8828 17.6211 10.1562 15.9688C9.42969 14.3164 9 12.8008 9 12C9 8.12109 12.1211 5 16 5ZM16 10C14.8945 10 14 10.8945 14 12C14 13.1055 14.8945 14 16 14C17.1055 14 18 13.1055 18 12C18 10.8945 17.1055 10 16 10Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="w-9/12">
                                                    <p className="text-base font-bold text-themeBlackAlt">
                                                        LOCATION
                                                    </p>
                                                    <p className="text-lg font-normal text-themeBlackAlt">
                                                        {
                                                            seller?.location
                                                                ?.street
                                                        }{' '}
                                                        {seller?.location
                                                            ?.state && (
                                                            <span>
                                                                {
                                                                    seller
                                                                        ?.location
                                                                        ?.city
                                                                }
                                                                ,
                                                            </span>
                                                        )}{' '}
                                                        {
                                                            seller?.location
                                                                ?.state
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                                                <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                                                    <RiBriefcaseLine className="h-8 w-8 text-themePrimary" />
                                                </div>
                                                <div className="w-9/12">
                                                    <p className="text-base font-bold text-themeBlackAlt">
                                                        ACCOUNT
                                                    </p>
                                                    <p className="text-lg font-normal text-themeBlackAlt truncate">
                                                        {
                                                            seller
                                                                ?.packageDetails
                                                                ?.packageName
                                                        }{' '}
                                                        User
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                                                <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                                                    <BsShield className="h-8 w-8 text-themePrimary" />
                                                </div>
                                                <div className="w-9/12">
                                                    <p className="text-base font-bold text-themeBlackAlt">
                                                        USER TYPE
                                                    </p>
                                                    <p className="text-lg font-normal text-themeBlackAlt truncate">
                                                        {seller?.isConfirmed
                                                            ? 'VERIFIED'
                                                            : 'NON-VERIFIED'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                                                <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                                                    <VscCalendar className="h-8 w-8 text-themePrimary" />
                                                </div>
                                                <div className="w-9/12">
                                                    <p className="text-base font-bold text-themeBlackAlt">
                                                        MEMBER SINCE
                                                    </p>
                                                    <p className="text-lg font-normal text-themeBlackAlt truncate">
                                                        {date}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button className="bg-themeSecondary rounded-lg w-full mt-3 py-4">
                                                <Link href="#">
                                                    <a>
                                                        <p className="text-2xl text-bold text-white">
                                                            {
                                                                seller?.phoneNumber
                                                            }
                                                        </p>
                                                        <p className="text-sm text-bold text-white mt-2">
                                                            CLICK TO CALL NOW
                                                        </p>
                                                    </a>
                                                </Link>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-themePrimary rounded-lg w-full mt-3 py-4"
                                                onClick={() => {
                                                    setReview(!review);
                                                }}
                                            >
                                                <p className="text-xl text-bold text-white my-2">
                                                    Review Seller
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3 sm:col-span-5 lg:col-span-2 mt-12 md:mt-0">
                                <p className="text-3xl text-themeBlackAlt font-bold">
                                    Active Ads
                                </p>

                                {/* <!-- active ads card items --> */}
                                <div className="space-y-7 pt-10">
                                    {_.map(sellerAds, (item, index) => (
                                        <SellerAds key={index} item={item} />
                                    ))}
                                </div>

                                {sellerAds?.length == 0 && (
                                    <div className="space-y-7 pt-10 text-center ">
                                        <h3 className="text-2xl font-semibold">
                                            No Data Found
                                        </h3>
                                    </div>
                                )}

                                {/* <div>
                                    <Pagination />
                                </div> */}

                                {/* <!-- review and feedBack --> */}
                                <div>
                                    <div className="flex justify-between">
                                        <h1 className="text-xl sm:text-3xl text-themeBlackAlt font-bold">
                                            Review &amp; Feedback
                                        </h1>
                                        <div className="flex gap-2">
                                            <HiStar className="text-themeYellowLight text-2xl" />
                                            <p className="text-base text-themeBlackAlt font-normal">
                                                <strong>
                                                    {reviewAllData?.averageRating !=
                                                    'NaN'
                                                        ? reviewAllData?.averageRating
                                                        : '0.0'}{' '}
                                                </strong>
                                                ({reviewAllData?.reviewCount}{' '}
                                                Review)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap sm:grid grid-cols-2 gap-7 pt-9 ">
                                        {/* {data.map((item, index) => ( */}
                                        {_.map(
                                            _.slice(
                                                reviewAllData?.reviews,
                                                0,
                                                totalReviewsPerView,
                                            ),
                                            (item, index) => (
                                                // {_.map(reviewAllData?.reviews, (item, index) => (
                                                <div
                                                    className="bg-white p-10 rounded-2xl shadow-owlCard"
                                                    key={index}
                                                >
                                                    <p className="text-base sm:text-lg font-normal text-themeWhiteLighter overflow-hidden text-clip max-h-24 sm:max-h-28">
                                                        {item?.review}
                                                    </p>
                                                    <div className="flex gap-4 pt-5">
                                                        <div>
                                                            {' '}
                                                            {item?.user
                                                                ?.avatar ? (
                                                                <Image
                                                                    className="m-auto rounded-full"
                                                                    src={
                                                                        item
                                                                            ?.user
                                                                            ?.avatar
                                                                    }
                                                                    width={50}
                                                                    height={50}
                                                                    alt="seller"
                                                                />
                                                            ) : (
                                                                <Image
                                                                    className="m-auto rounded-full"
                                                                    src={`https://ui-avatars.com/api/?name=${item?.user?.fullName?.firstName}&background=random&length=1&size=50`}
                                                                    width={50}
                                                                    height={50}
                                                                    alt="seller"
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-base sm:text-lg font-semibold text-themePrimary">
                                                                {
                                                                    item?.user
                                                                        ?.fullName
                                                                        ?.firstName
                                                                }{' '}
                                                                {
                                                                    item?.user
                                                                        ?.fullName
                                                                        ?.lastName
                                                                }
                                                            </p>
                                                            <div className="flex gap-1">
                                                                {/* <HiStar className="text-themeYellowLight text-base" />
                                                            <HiStar className="text-themeYellowLight text-base" />
                                                            <HiStar className="text-themeYellowLight text-base" />
                                                            <HiStar className="text-themeYellowLight text-base" />
                                                            <IoIosStarHalf className="text-themeYellowLight text-base" /> */}
                                                                <div>
                                                                    <Rating
                                                                        initialRating={
                                                                            item?.ratingNumber
                                                                        }
                                                                        readonly
                                                                        emptySymbol={
                                                                            <HiStar className="text-themeGrayLight text-base" />
                                                                        }
                                                                        fullSymbol={
                                                                            <HiStar className="text-themeYellowLight text-base" />
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {reviewAllData?.reviews?.length !== 0 &&
                                    showButton && (
                                        <button
                                            className="text-base font-semibold text-white bg-themeSecondary rounded py-3 px-7 mt-14 grid m-auto"
                                            onClick={() => {
                                                reviewViewsHandler();
                                            }}
                                        >
                                            Load More
                                        </button>
                                    )}

                                {reviewAllData?.reviews?.length == 0 && (
                                    <div className="space-y-7 pt-10 text-center ">
                                        <h3 className="text-2xl font-semibold">
                                            No Data Found
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

            {/* Seller Review popup */}
            <PopupModule
                PopupTitle="Seller Review"
                Popup={review}
                PopupHandler={() => {
                    setReview(!review);
                }}
            >
                {loggedIn && userData ? (
                    <form
                        className="grid grid-cols-1 gap-4"
                        onSubmit={reviewHandleSubmit(reviewSubmit)}
                    >
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker font-normal"
                                htmlFor="note"
                            >
                                Rating:
                            </label>
                            <Rating
                                initialRating={ratingValue}
                                emptySymbol={
                                    <HiStar className="text-themeGrayLight text-2xl" />
                                }
                                fullSymbol={
                                    <HiStar className="text-themeYellowLight text-2xl" />
                                }
                                onClick={onRatingClick}
                                fractions={2}
                            />
                            {ratingValueError && (
                                <span className="text-red-500 text-xss italic block">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker font-normal"
                                htmlFor="note"
                            >
                                Review Note:
                            </label>
                            <textarea
                                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border "border-gray"
                                    placeholder:font-normal h-40 placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50`}
                                id="note"
                                {...reviewRegister('review', {
                                    required: true,
                                })}
                                placeholder="Note"
                            />
                            {reviewErrors?.review && (
                                <span className="text-red-500 text-xss italic">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md`}
                            type="submit"
                            disabled={reviewIsSubmitting}
                        >
                            {reviewIsSubmitting
                                ? 'Please wait...'
                                : 'Add Review'}
                            {/* spinner */}
                            {reviewIsSubmitting && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center grid justify-center items-center h-40">
                        <div>
                            <p className="text-xxs text-themeLighter !mb-4">
                                You must be logged in to review a seller.
                            </p>
                            <button
                                className="bg-themePrimary text-white px-10 !py-3 hover:bg-themeSecondary transition-all duration-300 ease-in-out rounded text-base font-normal"
                                onClick={() => {
                                    LoginPopupHandler();
                                    setReview(!review);
                                }}
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                )}
            </PopupModule>
        </>
    );
};

export default SellerProfile;
