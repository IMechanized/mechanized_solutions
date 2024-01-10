import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiStar } from 'react-icons/bi';
import { BsEyeSlash, BsStarFill } from 'react-icons/bs';
import {
    HiOutlineArrowNarrowDown,
    HiOutlineArrowNarrowUp,
    HiOutlineDotsVertical,
    HiOutlineTrash,
} from 'react-icons/hi';
import Moment from 'react-moment';
import { useToasts } from 'react-toast-notifications';
import sweetAlert from 'sweetalert';
import { mutate } from 'swr';
import { LoaderPage } from '../../../../lib/loader';
import useUser from '../../../../lib/user';
import Image from '../../../../optimize/image';
import { authAxios } from '../../../../utils/axiosKits';

const AdsTable = ({ adsData, featured, adsIds, setAdsIds }) => {
    const [sortTitle, setSortTitle] = React.useState('none');
    const [sortCategory, setSortCategory] = React.useState('none');
    const [sortStatus, setSortStatus] = React.useState('none');
    const [sortFeatured, setSortFeatured] = React.useState('none');
    const [sortDate, setSortDate] = React.useState('none');
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState(false);

    const { user, isAdmin, isSuperAdmin } = useUser();
    const adminEntry = isSuperAdmin || isAdmin;
    const adsData3 = false;

    const { addToast } = useToasts();
    const router = useRouter();

    // [x] title sort handler
    const titleSortHandler = () => {
        if (sortTitle === 'none') {
            setSortTitle('asc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyTitle: 'ascending',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortTitle === 'asc') {
            setSortTitle('desc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyTitle: 'descending',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortTitle === 'desc') {
            setSortTitle('none');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyTitle: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        }
    };

    // [x] category sort handler
    const categorySortHandler = () => {
        if (sortCategory === 'none') {
            setSortCategory('asc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyCategory: 'ascending',
                sortbyTitle: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortCategory === 'asc') {
            setSortCategory('desc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyCategory: 'descending',
                sortbyTitle: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortCategory === 'desc') {
            setSortCategory('none');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyCategory: '',
                sortbyTitle: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        }
    };

    // [x] status sort handler
    const statusSortHandler = () => {
        if (sortStatus === 'none') {
            setSortStatus('asc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyStatus: 'ascending',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortStatus === 'asc') {
            setSortStatus('desc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyStatus: 'descending',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortStatus === 'desc') {
            setSortStatus('none');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        }
    };

    // [x] featured sort handler
    const statusFeaturedHandler = () => {
        if (sortFeatured === 'none') {
            setSortFeatured('asc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyFeatured: 'ascending',
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortFeatured === 'asc') {
            setSortFeatured('none');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyFeatured: '',
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        }
    };

    // [x] date sort handler
    const dateSortHandler = () => {
        if (sortDate === 'none') {
            setSortDate('asc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyDate: 'ascending',
                sortbyFeatured: '',
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortDate === 'asc') {
            setSortDate('desc');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyDate: 'descending',
                sortbyFeatured: '',
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        } else if (sortDate === 'desc') {
            setSortDate('none');
            const values = {
                adTitle: router.query.adTitle,
                category: router.query.category,
                sortbyDate: '',
                sortbyFeatured: '',
                sortbyStatus: '',
                sortbyTitle: '',
                sortbyCategory: '',
            };
            const filtered = _.pickBy(
                values,
                (value) =>
                    value !== '' &&
                    value !== null &&
                    value !== undefined &&
                    value.length > 0,
            );
            router.push({
                query: filtered,
            });
        }
    };

    // [x] delete ads function here
    const deleteAd = async (id) => {
        sweetAlert({
            title: 'Are you sure?',
            text: 'You want to delete this Ad?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                try {
                    authAxios
                        .delete(`/user/ads/${id}`)
                        .then((res) => {
                            mutate('/user/ads').then(() => {
                                addToast(res.data.message, {
                                    appearance: 'success',
                                    autoDismiss: true,
                                    autoDismissTimeout: 3000,
                                });
                                setLoading(false);
                                setState(false);
                            }, 1000);
                        })
                        .catch((err) => {
                            addToast(err?.response?.data?.message, {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            });
                            setLoading(false);
                        });
                } catch (error) {
                    addToast(error?.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                    setLoading(false);
                }
            }
        });
    };

    // [x] enable ads function start
    const enableAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/seller/status/ads/${id}`,
                data: {
                    status: 'published',
                },
            })
                .then((res) => {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    mutate(`/user/ads`).then(() => {
                        setLoading(false);
                        setState(false);
                    }, 1000);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] disable ads function start
    const disableAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/seller/status/ads/${id}`,
                data: {
                    status: 'draft',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] feature ads function start
    const featureAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/seller/status/ads/${id}`,
                data: {
                    status: 'featured',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] non-feature ads function start
    const nonFeatureAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/seller/status/ads/${id}`,
                data: {
                    status: 'nonFeatured',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] approve ads function start
    const approveAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/admin/status/ads/${id}`,
                data: {
                    status: 'approved',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                    setState(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] reject ads function start
    const rejectAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/admin/status/ads/${id}`,
                data: {
                    status: 'rejected',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] active ads function start
    const activeAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/admin/status/ads/${id}`,
                data: {
                    status: 'active',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] expire ads function start
    const expireAd = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: 'PUT',
                url: `/admin/status/ads/${id}`,
                data: {
                    status: 'expired',
                },
            })
                .then((res) => {
                    mutate(`/user/ads`).then(() => {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setState(false);
                    }, 700);
                })
                .catch((err) => {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                });
        } catch (error) {
            addToast(error.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // [x] handle id checked
    const handleIdChecked = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAdsIds([...adsIds, value]);
        } else {
            setAdsIds(adsIds?.filter((id) => id !== value));
        }
    };

    return (
        <div className="py-2 inline-block overflow-x-auto ">
            <table className="w-full">
                <thead>
                    <tr className="bg-white border-b-8 border-themeWhiteLight ">
                        <th
                            scope="col"
                            className="text-sm font-semibold px-6 py-4 text-left rounded-lg "
                        >
                            <input
                                type="checkbox"
                                className="accent-themePrimary w-4 h-4"
                            />
                        </th>
                        <th scope="col" className="px-6 py-4 text-left">
                            <div
                                className="flex items-center gap-3"
                                onClick={titleSortHandler}
                            >
                                <span className="text-base font-semibold text-themeBlackAlt ">
                                    Ads Title
                                </span>
                                <div className="flex relative cursor-pointer">
                                    <HiOutlineArrowNarrowDown
                                        className={` ${
                                            sortTitle == 'asc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } `}
                                    />
                                    <HiOutlineArrowNarrowUp
                                        className={`${
                                            sortTitle == 'desc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } left-2 absolute`}
                                    />
                                </div>
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-6 py-4 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-themeBlackAlt">
                                    Category
                                </span>
                                <div
                                    className="flex relative cursor-pointer"
                                    onClick={categorySortHandler}
                                >
                                    <HiOutlineArrowNarrowDown
                                        className={` ${
                                            sortCategory == 'asc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } `}
                                    />
                                    <HiOutlineArrowNarrowUp
                                        className={`${
                                            sortCategory == 'desc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } left-2 absolute`}
                                    />
                                </div>
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-6 py-4 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-themeBlackAlt">
                                    Status
                                </span>
                                <div
                                    className="flex relative cursor-pointer"
                                    onClick={statusSortHandler}
                                >
                                    <HiOutlineArrowNarrowDown
                                        className={` ${
                                            sortStatus == 'asc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } `}
                                    />
                                    <HiOutlineArrowNarrowUp
                                        className={`${
                                            sortStatus == 'desc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } left-2 absolute`}
                                    />
                                </div>
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-6 py-4 text-left cursor-pointer"
                            onClick={statusFeaturedHandler}
                        >
                            {sortFeatured === 'asc' || featured ? (
                                <BsStarFill className="text-base text-themePrimary" />
                            ) : (
                                <BiStar className="text-base text-themeBlackAlt" />
                            )}
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-6 py-4 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-base font-semibold text-themeBlackAlt">
                                    Date Posted
                                </span>
                                <div
                                    className="flex relative cursor-pointer"
                                    onClick={dateSortHandler}
                                >
                                    <HiOutlineArrowNarrowDown
                                        className={` ${
                                            sortDate == 'asc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } `}
                                    />
                                    <HiOutlineArrowNarrowUp
                                        className={`${
                                            sortDate == 'desc'
                                                ? 'text-themePrimary'
                                                : 'text-themeWhiteLighter'
                                        } left-2 absolute`}
                                    />
                                </div>
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-6 py-4 text-left rounded-lg"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className={` ${loading && 'relative'} `}>
                    {!adsData && <LoaderPage />}
                    {loading && <LoaderPage />}

                    {adsData &&
                        _.map(adsData, (item, index) => (
                            <tr
                                key={index}
                                className={`mb-3 border-b-8 border-themeWhiteLight ${
                                    !item.status.isPublished
                                        ? ' bg-neutral-200'
                                        : !item.status.isActive
                                        ? ' bg-red-100'
                                        : 'bg-white'
                                }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-themeBlackAlt rounded-lg align-top xl:align-middle ">
                                    <input
                                        type="checkbox"
                                        className="accent-themePrimary w-4 h-4"
                                        value={item?._id}
                                        name="adsIds"
                                        onChange={handleIdChecked}
                                    />
                                </td>
                                <td className=" px-6 py-4  w-4/12 ">
                                    <div className="flex gap-5">
                                        {item?.adGallery &&
                                        item?.adGallery.length > 0 ? (
                                            <Image
                                                src={item?.adGallery[0].url}
                                                alt="seller"
                                                width={80}
                                                height={80}
                                                layout="fixed"
                                            />
                                        ) : (
                                            <Image
                                                src={'/sellerImg.png'}
                                                alt="seller"
                                                width={80}
                                                height={80}
                                                layout="fixed"
                                            />
                                        )}
                                        <div>
                                            <p className="text-base font-semibold text-themeBlackAlt 2xl:w-9/12 max-h-7 overflow-hidden hover:text-themePrimary transition duration-300 ease-in-out">
                                                <Link
                                                    href={
                                                        item
                                                            ? item?.slug
                                                                ? `/ads/${item?.slug}`
                                                                : '#'
                                                            : '#'
                                                    }
                                                    passHref
                                                >
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item?.adTitle}
                                                    </a>
                                                </Link>
                                            </p>
                                            <div className="flex items-center gap-3 pt-1">
                                                <p className="text-xl font-bold text-themePrimary">
                                                    {item?.priceDetails
                                                        ?.currency == 'USD' && (
                                                        <span>$</span>
                                                    )}
                                                    {item?.priceDetails
                                                        ?.currency == 'EUR' && (
                                                        <span>€</span>
                                                    )}
                                                    {item?.priceDetails
                                                        ?.currency == 'GBP' && (
                                                        <span>£</span>
                                                    )}
                                                    {item?.priceDetails?.price}
                                                </p>
                                                <span className="text-sm font-normal text-themeSecondary mt-1">
                                                    {
                                                        item?.priceDetails
                                                            ?.priceType
                                                    }
                                                </span>
                                                {item?.adsReport &&
                                                    item?.adsReport?.length >
                                                        0 && (
                                                        <Link
                                                            href={`/dashboard/ads/reports?active_id=${item._id}`}
                                                            passHref
                                                        >
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="text-sm text-white font-bold bg-red-500 px-2 py-1 rounded">
                                                                    Reported (
                                                                    {
                                                                        item
                                                                            ?.adsReport
                                                                            ?.length
                                                                    }
                                                                    )
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-base font-normal text-themeBlackDarker px-6 py-4 whitespace-nowrap">
                                    {item?.category}
                                </td>
                                <td className="px-6 py-4 ">
                                    <span
                                        className={`text-sm font-semibold ${
                                            item?.status?.isApproved
                                                ? 'text-themePrimary bg-themePrimaryLighter'
                                                : 'text-themeSecondary bg-orange-100'
                                        } whitespace-nowrap uppercase py-px px-2 rounded`}
                                    >
                                        {' '}
                                        {item?.status?.isApproved
                                            ? 'APPROVED'
                                            : 'PENDING'}
                                    </span>
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                                    {item?.status?.isFeatured ? (
                                        <BsStarFill className="text-base text-themePrimary" />
                                    ) : (
                                        <BiStar className="text-base text-themeBlackAlt" />
                                    )}
                                </td>
                                <td className="text-base text-themeBlackDarker font-normal px-6 py-4 whitespace-nowrap">
                                    <Moment format="MMMM DD, YYYY">
                                        {item.createdAt}
                                    </Moment>
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap rounded-lg">
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                setState(
                                                    index === state
                                                        ? false
                                                        : index,
                                                )
                                            }
                                            className={`p-2 border border-themeWhiteLight2 rounded relative ${
                                                state === index ? 'z-20' : ''
                                            }`}
                                        >
                                            <HiOutlineDotsVertical className="text-xl text-themeGrayWhite hover:text-themePrimary" />
                                        </button>

                                        <div
                                            className={`${
                                                // last 2 items in the list will be shown in the top
                                                index > adsData.length - 3
                                                    ? 'bottom-10 right-7'
                                                    : 'right-7'
                                            } ${
                                                adsData.length <= 2
                                                    ? ' max-h-28 overflow-y-auto'
                                                    : ''
                                            } origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus: outline-none z-30 ${
                                                state === index
                                                    ? 'block'
                                                    : 'hidden'
                                            } `}
                                        >
                                            <div
                                                className="py-1 z-20 px-2"
                                                role="none"
                                            >
                                                {/* edit ads button  */}
                                                <Link
                                                    href={`/dashboard/ads/edit-ads?active_id=${item._id}`}
                                                    passHref
                                                >
                                                    <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded">
                                                        <svg
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10 12.5001L16.9875 5.48759C17.3157 5.15938 17.5001 4.71424 17.5001 4.25009C17.5001 3.78594 17.3157 3.34079 16.9875 3.01259C16.6593 2.68438 16.2142 2.5 15.75 2.5C15.2858 2.5 14.8407 2.68438 14.5125 3.01259L7.5 10.0001V12.5001H10Z"
                                                                stroke="#1A2B3A"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M13.334 4.16602L15.834 6.66602"
                                                                stroke="#1A2B3A"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M7.50074 5.89258C6.04328 6.10614 4.72052 6.86305 3.79794 8.01138C2.87536 9.15971 2.42123 10.6145 2.52671 12.0837C2.63218 13.553 3.28945 14.928 4.36659 15.9327C5.44374 16.9375 6.86105 17.4977 8.33408 17.5009C9.73669 17.5008 11.0923 16.9954 12.1527 16.0773C13.2131 15.1592 13.9073 13.8899 14.1082 12.5017"
                                                                stroke="#1A2B3A"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>

                                                        <p className="text-sm font-normal text-themeBlackAlt">
                                                            Edit
                                                        </p>
                                                    </button>
                                                </Link>

                                                {/* publish-draft ads button */}
                                                {item.status?.isPublished ? (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => {
                                                            disableAd(item._id);
                                                            setState(false);
                                                        }}
                                                    >
                                                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                                                        <p className="text-sm font-normal text-themeWhiteLighter">
                                                            Disable
                                                        </p>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => {
                                                            enableAd(item._id);
                                                            setState(false);
                                                        }}
                                                    >
                                                        <AiOutlineEye className="text-xl text-themePrimary" />
                                                        <p className="text-sm font-normal text-themePrimary">
                                                            Enable
                                                        </p>
                                                    </button>
                                                )}

                                                {/* featured-/non-featured ads button */}
                                                {item.status?.isFeatured ? (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => {
                                                            nonFeatureAd(
                                                                item._id,
                                                            );
                                                            setState(false);
                                                        }}
                                                    >
                                                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                                                        <p className="text-sm font-normal text-themeWhiteLighter">
                                                            Non-feature
                                                        </p>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => {
                                                            featureAd(item._id);
                                                            setState(false);
                                                        }}
                                                    >
                                                        <AiOutlineEye className="text-xl text-themePrimary" />
                                                        <p className="text-sm font-normal text-themePrimary">
                                                            Feature
                                                        </p>
                                                    </button>
                                                )}

                                                {/* approve-reject ads button */}
                                                {adminEntry &&
                                                    (item?.status
                                                        ?.isApproved ? (
                                                        <button
                                                            className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                            onClick={() => {
                                                                rejectAd(
                                                                    item._id,
                                                                );
                                                                setState(false);
                                                            }}
                                                        >
                                                            <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                                                            <p className="text-sm font-normal text-themeWhiteLighter">
                                                                Reject
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                            onClick={() => {
                                                                approveAd(
                                                                    item._id,
                                                                );
                                                                setState(false);
                                                            }}
                                                        >
                                                            <AiOutlineEye className="text-xl text-themePrimary" />
                                                            <p className="text-sm font-normal text-themePrimary">
                                                                Approve
                                                            </p>
                                                        </button>
                                                    ))}

                                                {/* active-expire ads button */}
                                                {adminEntry &&
                                                    (item?.status?.isActive ? (
                                                        <button
                                                            className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                            onClick={() => {
                                                                expireAd(
                                                                    item._id,
                                                                );
                                                                setState(false);
                                                            }}
                                                        >
                                                            <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                                                            <p className="text-sm font-normal text-themeWhiteLighter">
                                                                Expire
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                            onClick={() => {
                                                                activeAd(
                                                                    item._id,
                                                                );
                                                                setState(false);
                                                            }}
                                                        >
                                                            <AiOutlineEye className="text-xl text-themePrimary" />
                                                            <p className="text-sm font-normal text-themePrimary">
                                                                Activate
                                                            </p>
                                                        </button>
                                                    ))}

                                                {/* delete ads button */}
                                                <button
                                                    className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                    onClick={() => {
                                                        deleteAd(item._id);
                                                        setState(false);
                                                    }}
                                                >
                                                    <HiOutlineTrash className="text-xl text-themeWhiteLighter" />
                                                    <p className="text-sm font-normal text-themeWhiteLighter">
                                                        Delete
                                                    </p>
                                                </button>
                                            </div>
                                        </div>

                                        {/* overlay */}
                                        {state === index && (
                                            <div
                                                className="fixed inset-0 z-10 backdrop-blur-sm cursor-default"
                                                onClick={() => setState(false)}
                                            ></div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdsTable;
