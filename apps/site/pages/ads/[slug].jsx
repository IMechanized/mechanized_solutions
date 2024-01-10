import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUser } from 'react-icons/ai';
import { BiHeart } from 'react-icons/bi';
import { BsShield } from 'react-icons/bs';
import { CgChevronRightO } from 'react-icons/cg';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaPinterest,
    FaTwitter,
} from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { RiBriefcaseLine, RiHeartFill } from 'react-icons/ri';
import { VscCalendar } from 'react-icons/vsc';
import Rating from 'react-rating';
import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
} from 'react-share';
import { useToasts } from 'react-toast-notifications';
import useSWR, { useSWRConfig } from 'swr';
import AdsItem from '../../src/components/fronted/ads/ads-item';
import Layout from '../../src/components/fronted/layout/layout';
import { ThemeContext } from '../../src/context/ThemeContext';
import { LoaderPage } from '../../src/lib/loader';
import PopupModule from '../../src/lib/popup-modul';
import useUser from '../../src/lib/user';
import Image from '../../src/optimize/image';
import { Axios, authAxios } from '../../src/utils/axiosKits';

const data = ['1', '2', '3', '4', '5', '6', '7', '8'];
// const TagData = ["1", "2", "3", "4", "5"];

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const authFetcher = (url) => authAxios(url).then((res) => res.data.data);

const SingleAds = () => {
    const [saveLoading, setSaveLoading] = React.useState(false);
    const [messageUp, setMessageUp] = React.useState(false);
    const [shareUp, setShareUp] = React.useState(false);
    const [reportUp, setReportUp] = React.useState(false);

    const router = useRouter();
    const { user, loggedIn } = useUser();
    const userData = user?.data;
    const { LoginPopupHandler } = React.useContext(ThemeContext);
    const { slug } = router.query;
    const { data: adsDataTotal, error: adsError } = useSWR(
        slug ? `/user/slug/ads/${slug}` : null,
        fetcher,
    );
    const adsData = adsDataTotal?.ad;
    const relatedAdsData = adsDataTotal?.relatedAds;
    const bgUrl = adsData?.adCoverImage ? adsData?.adCoverImage : '';
    const sellerImageUrl = adsData?.user?.avatar
        ? adsData?.user?.avatar
        : `https://ui-avatars.com/api/?name=${adsData?.user?.fullName?.firstName}&background=random&length=1&size=50`;
    const socialShareImageUrl =
        adsData?.adGallery && adsData?.adGallery[0]?.url
            ? adsData?.adGallery[0]?.url
            : `/avatar.png`;
    const dateFormate = new Date(adsData?.updatedAt);
    const date = dateFormate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    const [galleryPreview, setGalleryPreview] = React.useState(
        adsData?.adGallery && adsData?.adGallery[0]?.url
            ? adsData?.adGallery[0]?.url
            : `/avatar.png`,
    );
    React.useEffect(() => {
        if (adsData?.adGallery && adsData?.adGallery[0]?.url) {
            setGalleryPreview(adsData?.adGallery[0]?.url);
        }
    }, [adsData?.adGallery]);

    // check isBookmark true or false
    const { data: bookmarkData } = useSWR(
        adsData ? `/user/bookmark/${adsData?._id}` : null,
        authFetcher,
        {
            refreshInterval: 0,
        },
    );

    const {
        register,
        handleSubmit,
        reset: messageReset,
        formState: { errors: messageErrors, isSubmitting: messageIsSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    const {
        register: reportRegister,
        handleSubmit: repportSubmit,
        reset: reportReset,
        formState: { errors: reportErrors, isSubmitting: reportIsSubmitting },
    } = useForm({
        mode: 'onChange',
    });

    // message submit form
    const messageHandleSubmit = async (formData) => {
        // user is not loggedIn then show login popup
        if (!loggedIn) {
            return;
        }

        const newData = {
            ads: adsData?._id,
            time: new Date(),
            members: {
                buyer: user?.data?._id,
                seller: adsData?.user?._id,
            },
            messages: [
                {
                    sender: user?.data?._id,
                    reciver: adsData?.user?._id,
                    message: formData?.message,
                    timestamp: new Date(),
                },
            ],
        };

        try {
            await authAxios({
                method: 'POST',
                url: '/users/message/rooms',
                data: newData,
            }).then((res) => {
                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                // setMessageUp(!messageUp);
                messageReset();
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

    // message submit form
    const reportHandleSubmit = async (reportData) => {
        const newData = {
            reason: reportData?.reason,
        };

        try {
            await authAxios({
                method: 'PUT',
                url: `/user/report/ads/${adsData?._id}`,
                data: newData,
            }).then((res) => {
                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                setReportUp(!reportUp);
                reportReset();
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

    // ad bookmark submit handler
    const addBookmarkHandler = async (adId) => {
        setSaveLoading(true);
        try {
            await authAxios({
                method: 'post',
                url: '/user/bookmark',
                data: {
                    ads: adId,
                },
            }).then((res) => {
                mutate(`/user/bookmark/${adId}`).then(() => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setSaveLoading(false);
                });
            });
        } catch (error) {
            addToast(error.responsive.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setSaveLoading(false);
        }
    };

    // ad bookmark submit handler
    const removeBookmarkHandler = async (adId) => {
        setSaveLoading(true);
        try {
            await authAxios({
                method: 'DELETE',
                url: `/user/bookmark/${adId}`,
            }).then((res) => {
                mutate(`/user/bookmark/${adId}`).then(() => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setSaveLoading(false);
                });
            });
        } catch (error) {
            addToast(error.responsive.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setSaveLoading(false);
        }
    };

    const LoaderGrow = () => {
        return (
            <div className="flex justify-center items-center">
                <div
                    className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    };
    return (
        <>
            <Head>
                <title>Ads Details</title>
                <meta name="viewport" content="" />
            </Head>
            <Layout>
                <section>
                    {!adsData && !adsError && <LoaderPage />}
                    <div
                        className="bg-themePrimary bg-center bg-no-repeat bg-cover"
                        style={
                            bgUrl
                                ? {
                                      backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.6)),url(${bgUrl})`,
                                  }
                                : {}
                        }
                    >
                        <div className="container mx-auto pt-24 pb-16 px-5 sm:px-0">
                            <div className="grid">
                                <div className="grid grid-cols-5 lg:grid-cols-9 gap-8 relative">
                                    <div className="col-span-5 lg:col-span-6 w-full">
                                        <div className="grid xl:flex items-center justify-between gap-8 xl:gap-10">
                                            <div>
                                                <p className="text-base font-normal text-white">
                                                    {adsData?.category}
                                                </p>
                                                <h1 className="text-4xl font-bold text-white pt-1">
                                                    {adsData?.adTitle}
                                                </h1>
                                                <div className="flex gap-2 items-center pt-3">
                                                    <MdOutlineLocationOn className="text-2xl text-white" />
                                                    <p className="text-xl font-normal text-white">
                                                        {adsData?.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex-none">
                                                <h1 className="text-4xl font-bold text-white">
                                                    {adsData?.priceDetails
                                                        ?.currency == 'USD' && (
                                                        <span>$</span>
                                                    )}
                                                    {adsData?.priceDetails
                                                        ?.currency == 'EUR' && (
                                                        <span>€</span>
                                                    )}
                                                    {adsData?.priceDetails
                                                        ?.currency == 'GBP' && (
                                                        <span>£</span>
                                                    )}
                                                    {
                                                        adsData?.priceDetails
                                                            ?.price
                                                    }
                                                </h1>
                                                <button className="bg-themeSecondary py-1 px-6 rounded text-white mt-3 uppercase">
                                                    {
                                                        adsData?.priceDetails
                                                            ?.priceType
                                                    }{' '}
                                                    PRICE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-themeWhiteLight">
                        <div className="container mx-auto pb-32">
                            <div className="grid">
                                <div className="grid grid-cols-5 lg:grid-cols-9 gap-8 pt-7  px-5 sm:px-0 sm:pb-16 xl:pb-0 relative">
                                    {/* left side */}
                                    <div className="col-span-5 lg:col-span-6 w-full">
                                        <div className="grid gap-7 bg-white p-6 w-full rounded-2xl">
                                            <div className="w-full">
                                                <Image
                                                    className="rounded"
                                                    src={galleryPreview}
                                                    width={1000}
                                                    height={640}
                                                    alt="gallery"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                {adsData?.adGallery?.map(
                                                    (image, index) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => {
                                                                setGalleryPreview(
                                                                    image?.url,
                                                                );
                                                            }}
                                                        >
                                                            <Image
                                                                className="rounded cursor-pointer"
                                                                src={image?.url}
                                                                width={100}
                                                                height={100}
                                                                alt="gallery"
                                                            />
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 my-7 w-full rounded-2xl">
                                            <h1 className="text-2xl font-bold text-themeBlackAlt">
                                                Description
                                            </h1>
                                            <p className="text-lg font-normal text-themeWhiteLighter pt-3">
                                                {adsData?.description}
                                            </p>
                                            <h1 className="text-2xl font-bold text-themeBlackAlt pt-6">
                                                Specification
                                            </h1>
                                            <ul className="space-y-2 pt-5">
                                                {_.map(
                                                    adsData?.specifications,
                                                    (item, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex gap-4 items-center"
                                                        >
                                                            <CgChevronRightO className="text-themeSecondary text-xl" />
                                                            <p className="text-base font-normal text-themeBlackAlt">
                                                                {item}
                                                            </p>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>

                                            <div className="pt-10">
                                                <h2 className="text-2xl font-bold text-themeBlackAlt">
                                                    Tags
                                                </h2>

                                                <div className="flex flex-wrap gap-3 pt-4">
                                                    {_.map(
                                                        adsData?.tags,
                                                        (item, index) => (
                                                            <p
                                                                key={index}
                                                                className="text-sm font-normal text-themeWhiteLighter border p-1 rounded"
                                                            >
                                                                {item}
                                                            </p>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 pt-10">
                                                {/* favourite  button */}
                                                {loggedIn ? (
                                                    bookmarkData?.isBookmark ? (
                                                        <button
                                                            disabled={
                                                                saveLoading
                                                            }
                                                            className="bg-themePrimary hover:bg-themeSecondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                                                            onClick={() => {
                                                                removeBookmarkHandler(
                                                                    adsData?._id,
                                                                );
                                                            }}
                                                        >
                                                            <RiHeartFill className="text-lg sm:text-xl text-white" />
                                                            {!saveLoading && (
                                                                <p className="text-sm sm:text-base font-normal text-white">
                                                                    Saved
                                                                </p>
                                                            )}
                                                            {/* spinner */}
                                                            {saveLoading && (
                                                                <div className="flex items-center justify-center ">
                                                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                                                </div>
                                                            )}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled={
                                                                saveLoading
                                                            }
                                                            className="bg-themePrimary hover:bg-themeSecondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                                                            onClick={() => {
                                                                addBookmarkHandler(
                                                                    adsData?._id,
                                                                );
                                                            }}
                                                        >
                                                            <BiHeart className="text-lg sm:text-xl text-white" />
                                                            {!saveLoading && (
                                                                <p className="text-sm sm:text-base font-normal text-white">
                                                                    Save
                                                                </p>
                                                            )}
                                                            {/* spinner */}
                                                            {saveLoading && (
                                                                <div className="flex items-center justify-center ">
                                                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                                                </div>
                                                            )}
                                                        </button>
                                                    )
                                                ) : (
                                                    <button
                                                        className="bg-themePrimary hover:bg-themeSecondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                                                        onClick={
                                                            LoginPopupHandler
                                                        }
                                                    >
                                                        <BiHeart className="text-lg sm:text-xl text-white" />
                                                        <p className="text-sm sm:text-base font-normal text-white">
                                                            Save
                                                        </p>
                                                    </button>
                                                )}

                                                {/* share button */}
                                                <button
                                                    className="bg-themePrimary hover:bg-themeSecondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                                                    onClick={() => {
                                                        setShareUp(!shareUp);
                                                    }}
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10.5 2.48633C9.07031 2.48633 7.91146 3.62575 7.85417 5.03449C5.45052 6.04961 3.83333 8.4139 3.83333 11.1045C3.83333 11.2184 3.82813 11.3427 3.83333 11.4774C3.04427 11.9383 2.5 12.7851 2.5 13.7562C2.5 15.2142 3.70052 16.408 5.16667 16.408C5.54948 16.408 5.91927 16.3277 6.25 16.1801C7.40625 17.146 8.91146 17.7338 10.5 17.7338C12.0885 17.7338 13.5938 17.146 14.75 16.1801C15.0807 16.3277 15.4505 16.408 15.8333 16.408C17.2995 16.408 18.5 15.2142 18.5 13.7562C18.5 12.7748 17.9505 11.915 17.1458 11.4567C17.1563 11.3505 17.1667 11.2417 17.1667 11.1045C17.1667 8.4139 15.5495 6.04961 13.1458 5.03449C13.0885 3.62575 11.9297 2.48633 10.5 2.48633ZM10.5 3.8122C11.2448 3.8122 11.8333 4.39745 11.8333 5.13807C11.8333 5.87869 11.2448 6.46394 10.5 6.46394C9.75521 6.46394 9.16667 5.87869 9.16667 5.13807C9.16667 4.39745 9.75521 3.8122 10.5 3.8122ZM8.14583 6.36036C8.59375 7.20456 9.47917 7.78981 10.5 7.78981C11.5208 7.78981 12.4063 7.20456 12.8542 6.36036C14.6406 7.22269 15.8333 9.03541 15.8333 11.1045C14.3672 11.1045 13.1667 12.2983 13.1667 13.7562C13.1667 14.3492 13.3724 14.8879 13.7083 15.3307C12.8177 16.0014 11.6719 16.408 10.5 16.408C9.32813 16.408 8.18229 16.0014 7.29167 15.3307C7.6276 14.8879 7.83333 14.3492 7.83333 13.7562C7.83333 12.2983 6.63281 11.1045 5.16667 11.1045C5.16667 9.03541 6.35938 7.22269 8.14583 6.36036ZM5.16667 12.4304C5.91146 12.4304 6.5 13.0156 6.5 13.7562C6.5 14.4969 5.91146 15.0821 5.16667 15.0821C4.42188 15.0821 3.83333 14.4969 3.83333 13.7562C3.83333 13.0156 4.42188 12.4304 5.16667 12.4304ZM15.8333 12.4304C16.5781 12.4304 17.1667 13.0156 17.1667 13.7562C17.1667 14.4969 16.5781 15.0821 15.8333 15.0821C15.0885 15.0821 14.5 14.4969 14.5 13.7562C14.5 13.0156 15.0885 12.4304 15.8333 12.4304Z"
                                                            fill="white"
                                                        />
                                                    </svg>

                                                    <span className="text-sm sm:text-base font-normal text-white">
                                                        Share
                                                    </span>
                                                </button>

                                                {/* report  button */}
                                                <button
                                                    className="bg-themePrimary hover:bg-themeSecondary transition-all ease-in-out duration-300 py-2 px-4 flex gap-2 items-center rounded-md"
                                                    onClick={() => {
                                                        setReportUp(!reportUp);
                                                    }}
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10 2.01172L9.45312 2.94922L1.95312 15.9375L1.42578 16.875H18.5742L18.0469 15.9375L10.5469 2.94922L10 2.01172ZM10 4.51172L16.4062 15.625H3.59375L10 4.51172ZM9.375 8.75V12.5H10.625V8.75H9.375ZM9.375 13.125V14.375H10.625V13.125H9.375Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                    <span className="text-sm sm:text-base font-normal text-white">
                                                        Report
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* right side  */}
                                    <div className="col-span-5 lg:col-span-3 w-full lg:-mt-52 h-full sm:relative">
                                        <div className="">
                                            {/* <!-- posted by information --> */}
                                            <div className="bg-white p-7 rounded-2xl ">
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-themePrimaryLighter p-3 rounded-lg">
                                                            <AiOutlineUser className="h-8 w-8 text-themePrimary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-themeBlackDarker">
                                                                POSTED BY
                                                            </p>
                                                            <span className="text-lg font-normal text-themeBlackAlt">
                                                                {
                                                                    adsData
                                                                        ?.personalInfo
                                                                        ?.fullName
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-themePrimaryLighter p-3 rounded-lg">
                                                            <VscCalendar className="h-8 w-8 text-themePrimary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-themeBlackDarker">
                                                                POST DATE
                                                            </p>
                                                            <span className="text-lg font-normal text-themeBlackAlt">
                                                                {date}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-themePrimaryLighter p-3 rounded-lg">
                                                            <svg
                                                                className="h-8 w-8 text-themePrimary"
                                                                viewBox="0 0 18 27"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9 0C4.04297 0 0 4.04297 0 9C0 10.4062 0.570313 12.0195 1.34375 13.7812C2.11719 15.543 3.11328 17.4141 4.125 19.1562C6.14844 22.6445 8.1875 25.5625 8.1875 25.5625L9 26.75L9.8125 25.5625C9.8125 25.5625 11.8516 22.6445 13.875 19.1562C14.8867 17.4141 15.8828 15.543 16.6562 13.7812C17.4297 12.0195 18 10.4062 18 9C18 4.04297 13.957 0 9 0ZM9 2C12.8789 2 16 5.12109 16 9C16 9.80078 15.5703 11.3164 14.8438 12.9688C14.1172 14.6211 13.1133 16.4531 12.125 18.1562C10.5547 20.8672 9.57812 22.3008 9 23.1562C8.42188 22.3008 7.44531 20.8672 5.875 18.1562C4.88672 16.4531 3.88281 14.6211 3.15625 12.9688C2.42969 11.3164 2 9.80078 2 9C2 5.12109 5.12109 2 9 2ZM9 7C7.89453 7 7 7.89453 7 9C7 10.1055 7.89453 11 9 11C10.1055 11 11 10.1055 11 9C11 7.89453 10.1055 7 9 7Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-themeBlackDarker">
                                                                LOCATION
                                                            </p>
                                                            <span className="text-lg font-normal text-themeBlackAlt">
                                                                {
                                                                    adsData
                                                                        ?.personalInfo
                                                                        ?.location
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-themePrimaryLighter p-3 rounded-lg">
                                                            <RiBriefcaseLine className="h-8 w-8 text-themePrimary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-themeBlackDarker">
                                                                ACCOUNT
                                                            </p>
                                                            <span className="text-lg font-normal text-themeBlackAlt uppercase">
                                                                {
                                                                    adsData
                                                                        ?.user
                                                                        ?.packageDetails
                                                                        ?.packageName
                                                                }{' '}
                                                                User
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-themePrimaryLighter p-3 rounded-lg">
                                                            <BsShield className="h-8 w-8 text-themePrimary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-themeBlackDarker">
                                                                USER TYPE
                                                            </p>
                                                            <span className="text-lg font-normal text-themeBlackAlt">
                                                                {adsData?.user
                                                                    ?.isConfirmed
                                                                    ? 'VERIFIED'
                                                                    : 'NON-VERIFIED'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* <!-- button --> */}
                                                    <div>
                                                        <button className="bg-themeSecondary rounded-md w-full py-3">
                                                            <Link href="#">
                                                                <a
                                                                    className="text-lg font-semibold text-white"
                                                                    href=""
                                                                >
                                                                    SEE PHONE
                                                                </a>
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* seller profile */}
                                            <div className="bg-white p-4 sm:p-10 rounded-2xl mt-9">
                                                <div className="flex gap-6">
                                                    <Image
                                                        src={sellerImageUrl}
                                                        width={70}
                                                        height={70}
                                                        alt="Image"
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <p className="text-xl font-semibold text-themeBlackAlt">
                                                            {
                                                                adsData?.user
                                                                    ?.fullName
                                                                    ?.firstName
                                                            }{' '}
                                                            {
                                                                adsData?.user
                                                                    ?.fullName
                                                                    ?.lastName
                                                            }
                                                        </p>
                                                        <div className="flex gap-1 pt-1">
                                                            {/* <HiStar className="text-themeYellowLight text-lg" />
                                                            <HiStar className="text-themeYellowLight text-lg" />
                                                            <HiStar className="text-themeYellowLight text-lg" />
                                                            <HiStar className="text-themeYellowLight text-lg" />
                                                            <IoIosStarHalf className="text-themeYellowLight text-lg" />
                                                            <p className="text-sm font-normal text-themeBlackAlt">
                                                                123
                                                            </p> */}
                                                            <div>
                                                                <Rating
                                                                    initialRating={
                                                                        userData
                                                                            ?.ratingDetails
                                                                            ?.averageRating
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
                                                        <Link
                                                            href={
                                                                adsData
                                                                    ? adsData?.user
                                                                        ? `/seller/${adsData?.user?.userName}`
                                                                        : '#'
                                                                    : '#'
                                                            }
                                                        >
                                                            <a className="text-xs sm:text-sm font-semibold text-themePrimary">
                                                                <button className="bg-themePrimaryLighter rounded-lg py-3 px-7 mt-4">
                                                                    View Seller
                                                                    Profile
                                                                </button>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <!-- Location on Google Map 1 --> */}
                                            <div className="bg-themePrimary mt-9 rounded-2xl py-48 p-7 flex flex-wrap items-center justify-center">
                                                <p className="text-4xl font-bold text-white text-center">
                                                    Location on Google Map
                                                </p>
                                            </div>

                                            {/* <!-- Safety  tips --> */}
                                            <div className="bg-white mt-9 rounded-2xl p-7">
                                                <h1 className="text-2xl font-bold text-themeBlackAlt">
                                                    Safety Tips For Deal
                                                </h1>
                                                <div className="pt-6 w-full">
                                                    <div className="flex">
                                                        <div className="flex flex-col items-center mr-4">
                                                            <div>
                                                                <div className="flex items-center justify-center  rounded-full bg-themePrimary w-4 h-4"></div>
                                                            </div>
                                                            <div className="w-px h-full bg-themePrimary"></div>
                                                        </div>
                                                        <div className="pb-4">
                                                            <p className="text-base font-normal text-themeBlackAlt lg:whitespace-nowrap">
                                                                Use a safe
                                                                location to meet
                                                                seller
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex">
                                                        <div className="flex flex-col items-center mr-4 relative">
                                                            <div>
                                                                <div className="flex items-center justify-center  rounded-full bg-themePrimary w-4 h-4"></div>
                                                            </div>
                                                            <div className="w-px h-14 sm:h-16 md:h-14 bg-themePrimary absolute"></div>
                                                        </div>
                                                        <div className="pb-4">
                                                            <p className="text-base font-normal text-themeBlackAlt lg:whitespace-nowrap">
                                                                Avoid cash
                                                                transactions
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex lg:items-center">
                                                        <div className="flex flex-col items-center mr-4">
                                                            <div className="flex items-center justify-center rounded-full bg-themePrimary w-4 h-4"></div>
                                                        </div>
                                                        <div>
                                                            <p className="text-base font-normal text-themeBlackAlt lg:whitespace-nowrap">
                                                                Beware of
                                                                unrealistic
                                                                offers
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <!-- form section --> */}
                                            <div className="bg-white p-7 rounded-2xl mt-9 h-full">
                                                <p className="text-2xl font-bold text-themeBlackAlt pb-8">
                                                    Contact With Seller
                                                </p>
                                                <form
                                                    className="w-full"
                                                    onSubmit={handleSubmit(
                                                        messageHandleSubmit,
                                                    )}
                                                >
                                                    <textarea
                                                        className={`py-4 px-3 w-full border border-themeWhiteLight2 focus:outline-none rounded h-32 ${
                                                            messageErrors?.message
                                                                ? 'border-red-500'
                                                                : ''
                                                        }`}
                                                        id="note"
                                                        {...register(
                                                            'message',
                                                            {
                                                                required: true,
                                                            },
                                                        )}
                                                        onKeyDown={(e) => {
                                                            // control + enter shortcut for submit
                                                            if (
                                                                e.key ===
                                                                    'Enter' &&
                                                                e.ctrlKey
                                                            ) {
                                                                handleSubmit(
                                                                    messageHandleSubmit,
                                                                )();
                                                            }
                                                        }}
                                                        placeholder="Write your message, press ctrl+enter to send"
                                                        disabled={!loggedIn}
                                                    />
                                                    {messageErrors?.message && (
                                                        <span className="text-red-500 text-xss italic">
                                                            This field is
                                                            required
                                                        </span>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        className="text-base font-normal text-white bg-themePrimary rounded py-4 w-full mt-2"
                                                        onClick={() => {
                                                            if (!loggedIn) {
                                                                LoginPopupHandler();
                                                            }
                                                        }}
                                                        disabled={
                                                            messageIsSubmitting
                                                        }
                                                    >
                                                        {messageIsSubmitting
                                                            ? 'Please wait...'
                                                            : 'Send Message'}
                                                        {/* spinner */}
                                                        {messageIsSubmitting && (
                                                            <div className="flex items-center justify-center ">
                                                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                                                            </div>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>

                                            {/* <!-- Advertisement Banner --> */}
                                            <div className="bg-themePrimary mt-9 rounded-2xl py-56 p-7 flex flex-wrap items-center justify-center">
                                                <p className="text-4xl text-center font-bold text-white">
                                                    Advertisement <br />
                                                    Banner
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Top Ads --> */}
                                <div className="px-5 py-10">
                                    <div className="text-center">
                                        <h2 className="font-bold text-4xl text-themeBlackAlt">
                                            Recommended{' '}
                                            <span className="text-themeSecondary">
                                                Ads
                                            </span>
                                        </h2>
                                        <p className="text-lg text-themeBlackAlt lg:w-[38%] w-full mx-auto mt-5">
                                            Lorem ipsum the dit adipiscing
                                            Aenean adicinging kiliuy scope
                                            mentin scope mentin. scope mentin
                                            aenan.
                                        </p>
                                    </div>
                                    {relatedAdsData?.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 mt-12">
                                            {_.map(
                                                _.slice(relatedAdsData, 0, 8),
                                                (item, index) => (
                                                    <AdsItem
                                                        key={index}
                                                        item={item}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}

                                    {relatedAdsData?.length == 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-7 mt-12 text-center">
                                            <h3 className="text-3xl font-semibold pt-10 pb-40">
                                                No Data Found
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

            {/* Message popup */}
            {/* <PopupModule
                PopupTitle="Message"
                Popup={messageUp}
                PopupHandler={() => {
                    setMessageUp(!messageUp);
                }}
            >
                {loggedIn && userData ? (
                    <form
                        className="grid grid-cols-1 gap-4"
                        onSubmit={handleSubmit(messageHandleSubmit)}
                    >
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker font-normal"
                                htmlFor="note"
                            >
                                Message:
                            </label>
                            <textarea
                                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border "border-gray"
                                    placeholder:font-normal h-40 placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50`}
                                id="note"
                                {...register('message', { required: true })}
                                placeholder="Write your message"
                            />
                            {messageErrors?.message && (
                                <span className="text-red-500 text-xss italic">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md`}
                            type="submit"
                            disabled={messageIsSubmitting}
                        >
                            {messageIsSubmitting
                                ? 'Please wait...'
                                : 'Send Message'}
                            {messageIsSubmitting && (
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
                                You must be logged in to send message.
                            </p>
                            <button
                                className="bg-themePrimary text-white px-10 !py-3 hover:bg-themeSecondary transition-all duration-300 ease-in-out rounded text-base font-normal"
                                onClick={() => {
                                    LoginPopupHandler();
                                    setMessageUp(!messageUp);
                                }}
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                )}
            </PopupModule> */}

            {/* Share popup */}
            <PopupModule
                PopupTitle="Share"
                Popup={shareUp}
                PopupHandler={() => {
                    setShareUp(!shareUp);
                }}
            >
                <div className="text-center grid justify-center items-center h-40">
                    <div className="flex gap-3">
                        <FacebookShareButton
                            url={`http://localhost:3000//ads/${slug}`}
                            // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
                            quote={`${adsData?.adTitle}`}
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-themePrimary w-10 h-10 flex items-center justify-center rounded-full hover:bg-themeSecondary transition duration-300"
                            >
                                <FaFacebookF className="text-white" />
                            </a>
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`http://localhost:3000//ads/${slug}`}
                            // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
                            title={`${adsData?.adTitle}`}
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-themePrimary w-10 h-10 flex items-center justify-center rounded-full hover:bg-themeSecondary transition duration-300"
                            >
                                <FaTwitter className="text-white" />
                            </a>
                        </TwitterShareButton>
                        <LinkedinShareButton
                            url={`http://localhost:3000//ads/${slug}`}
                            // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
                            title={`${adsData?.adTitle}`}
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-themePrimary w-10 h-10 flex items-center justify-center rounded-full hover:bg-themeSecondary transition duration-300"
                            >
                                <FaLinkedinIn className="text-white" />
                            </a>
                        </LinkedinShareButton>
                        <PinterestShareButton
                            url={`http://localhost:3000//ads/${slug}`}
                            // url={`${process.env.NEXT_PUBLIC_BASE_URL}/ads/${slug}`}
                            media={socialShareImageUrl}
                            description={`${adsData?.adTitle}`}
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-themePrimary w-10 h-10 flex items-center justify-center rounded-full hover:bg-themeSecondary transition duration-300"
                            >
                                <FaPinterest className="text-white" />
                            </a>
                        </PinterestShareButton>
                    </div>
                </div>
            </PopupModule>

            {/* Report popup */}
            <PopupModule
                PopupTitle="Report"
                Popup={reportUp}
                PopupHandler={() => {
                    setReportUp(!reportUp);
                }}
            >
                {loggedIn && userData ? (
                    <form
                        className="grid grid-cols-1 gap-4"
                        onSubmit={repportSubmit(reportHandleSubmit)}
                    >
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker font-normal"
                                htmlFor="note"
                            >
                                Reason:
                            </label>
                            <textarea
                                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border "border-gray"
                                    placeholder:font-normal h-40 placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50`}
                                id="note"
                                {...reportRegister('reason', {
                                    required: true,
                                })}
                                placeholder="Write your message"
                            />
                            {reportErrors?.reason && (
                                <span className="text-red-500 text-xss italic">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button
                            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md`}
                            type="submit"
                            disabled={reportIsSubmitting}
                        >
                            {reportIsSubmitting
                                ? 'Please wait...'
                                : 'Send Report'}
                            {/* spinner */}
                            {reportIsSubmitting && (
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
                                You must be logged in to report this ad.
                            </p>
                            <button
                                className="bg-themePrimary text-white px-10 !py-3 hover:bg-themeSecondary transition-all duration-300 ease-in-out rounded text-base font-normal"
                                onClick={() => {
                                    LoginPopupHandler();
                                    setReportUp(!reportUp);
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

export default SingleAds;
