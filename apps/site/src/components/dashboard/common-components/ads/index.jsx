import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsEyeSlash } from 'react-icons/bs';
import { HiOutlineTrash } from 'react-icons/hi';
import { useToasts } from 'react-toast-notifications';
import sweetAlert from 'sweetalert';
import AdsTable from './ads-table';
import AdsTableSmall from './ads-table-small';
import SearchFilter from './search-filter';
// import Pagination from "../pagination";
import useSWR, { useSWRConfig } from 'swr';
import { authAxios } from '../../../../utils/axiosKits';
import Pagination from '../../../fronted/pagination';

const itemData = [
    {
        id: 1,
        title: 'My Ads',
        adsType: 'all',
    },
    {
        id: 2,
        title: 'Featured Ads',
        adsType: 'featured',
    },
    {
        id: 3,
        title: 'Rejected Ads',
        adsType: 'rejected',
    },
    {
        id: 4,
        title: 'Inactive Ads',
        adsType: 'inactive',
    },
    {
        id: 5,
        title: 'Expired / Sold Ads',
        adsType: 'expired',
    },
];
const fetcher = (url) => authAxios(url).then((res) => res.data.data);
const adsAPI = '/user/ads';

const AllAds = () => {
    const [active, setActive] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [adsPerPage] = React.useState(9);
    const [adsIds, setAdsIds] = React.useState([]);

    const router = useRouter();
    const API =
        router.pathname == router.asPath
            ? adsAPI + `?page=${currentPage}`
            : adsAPI +
              router.asPath.replace(router.pathname, '') +
              `&page=${currentPage}`;

    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });
    const { data: adsDataTotal, error: adsError } = useSWR(API, fetcher, {
        refreshInterval: 0,
    });
    const adsData = adsDataTotal?.ads;
    const adsCount = adsDataTotal?.adsCount;

    const adsTypeChangeHandler = (adsType) => {
        router.push({
            query: {
                adsType: adsType,
            },
        });
    };

    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
    };

    // delete multi-ads function start
    const deleteMultiAds = (ids) => {
        if (ids.length < 1) {
            addToast('Please select at least one Ad', {
                appearance: 'warning',
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });
            return;
        }

        sweetAlert({
            title: 'Are you sure?',
            text: 'You want to delete these Ad list?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // setLoading(true);
                try {
                    authAxios({
                        method: 'DELETE',
                        url: `/user/multiselect/ads`,
                        data: {
                            adIDs: `${ids}`,
                        },
                    })
                        .then((res) => {
                            addToast(res.data.message, {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                            mutate(`/user/ads`).then(() => {
                                // setLoading(false);
                            }, 1000);
                        })
                        .catch((err) => {
                            addToast(err?.response?.data?.message, {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            });
                            // setLoading(false);
                        });
                } catch (error) {
                    addToast(error?.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                    // setLoading(false);
                }
            }
        });
    };

    // disable multi-ads function start
    const disableMultiAds = (ids) => {
        if (ids.length < 1) {
            addToast('Please select at least one Ad', {
                appearance: 'warning',
                autoDismiss: true,
                autoDismissTimeout: 3000,
            });
            return;
        }
        sweetAlert({
            title: 'Are you sure?',
            text: 'You want to disble these Ad list?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // setLoading(true);
                try {
                    authAxios({
                        method: 'PUT',
                        url: `/seller/multiple/status/ads`,
                        data: {
                            adIds: `${ids}`,
                        },
                    })
                        .then((res) => {
                            mutate(`/user/ads`).then(() => {
                                addToast(res.data.message, {
                                    appearance: 'success',
                                    autoDismiss: true,
                                });
                                // setLoading(false);
                            }, 700);
                        })
                        .catch((err) => {
                            addToast(err.response?.data?.message, {
                                appearance: 'error',
                                autoDismiss: true,
                            });
                            // setLoading(false);
                        });
                } catch (error) {
                    addToast(error.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    // setLoading(false);
                }
            }
        });
    };

    React.useEffect(() => {}, [adsIds]);

    return (
        <section className="bg-themeWhiteLight">
            <div className="pb-36">
                <div className="flex flex-wrap xl:flex-nowrap gap-4 xl:gap-0 items-center justify-between">
                    <h1 className="text-3xl font-bold text-themeBlackDarker">
                        Manage Ads
                    </h1>
                    {/* ads type button  */}
                    <ul className="flex flex-wrap lg:flex-nowrap gap-3">
                        {itemData.map((item, index) => (
                            <li
                                onClick={() => {
                                    setActive(index);
                                    adsTypeChangeHandler(item.adsType);
                                }}
                                key={index}
                                className={`flex items-center gap-4 py-3 px-5 rounded-md group cursor-pointer transition duration-300 ease-in-out ${
                                    active === index
                                        ? 'bg-themePrimaryLighter'
                                        : 'bg-white'
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full border  text-themeBlackDarker group-hover:border-themePrimary transition duration-300 ease-in-out ${
                                        active === index
                                            ? 'bg-themePrimary border-themePrimary'
                                            : 'bg-white border-themeGray'
                                    }`}
                                ></span>
                                <span
                                    className={`text-sm font-normal border-themeGray  group-hover:text-themePrimary transition duration-300 ease-in-out ${
                                        active === index
                                            ? 'text-themePrimary'
                                            : 'text-themeBlackDarker'
                                    }`}
                                >
                                    {item.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* header search and filter */}
                <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-0 items-center justify-between pt-10">
                    <div className="flex flex-wrap sm:flex-nowrap gap-6 items-center w-full">
                        <div className="flex gap-2">
                            <button
                                className="bg-white p-3 rounded hover:bg-themePrimary group"
                                onClick={() => {
                                    disableMultiAds(adsIds);
                                }}
                            >
                                <BsEyeSlash className="text-themeWhiteLighter text-xl group-hover:text-white" />
                            </button>
                            <button
                                className="bg-white p-3 rounded hover:bg-themeRedLight group"
                                onClick={() => {
                                    deleteMultiAds(adsIds);
                                }}
                            >
                                <HiOutlineTrash className="text-themeWhiteLighter text-xl group-hover:text-white" />
                            </button>
                        </div>
                        <div className="w-full md:w-8/12">
                            <SearchFilter />
                        </div>
                    </div>
                    <button className="bg-themeSecondary rounded px-7 py-3 w-full sm:w-auto">
                        <Link href="/dashboard/ads/new-ads">
                            <a className="text-base font-semibold text-white whitespace-nowrap">
                                Create a New Ad
                            </a>
                        </Link>
                    </button>
                </div>

                {/* table for large device*/}
                <div className="hidden overflow-hidden lg:flex flex-col pt-6">
                    {active === 0 && (
                        <AdsTable
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 1 && (
                        <AdsTable
                            adsData={adsData}
                            featured={true}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 2 && (
                        <AdsTable
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 3 && (
                        <AdsTable
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 4 && (
                        <AdsTable
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                </div>

                {/* table for small device */}
                <div className="lg:hidden !pt-16 sm:pt-10">
                    {active === 0 && (
                        <AdsTableSmall
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 1 && (
                        <AdsTableSmall
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 2 && (
                        <AdsTableSmall
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 3 && (
                        <AdsTableSmall
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                    {active === 4 && (
                        <AdsTableSmall
                            adsData={adsData}
                            adsIds={adsIds}
                            setAdsIds={setAdsIds}
                        />
                    )}
                </div>

                {/* pagination */}
                {adsData && adsData?.length > 0 && (
                    <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-0 items-center justify-center sm:justify-between mt-7">
                        <div>
                            {adsCount > adsPerPage && (
                                <Pagination
                                    totalCount={adsCount}
                                    showPerPage={adsPerPage}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                            {/* <Pagination /> */}
                        </div>

                        <p className="text-sm font-normal text-themeBlackDarker">
                            {/* Total 123 Ads Available */}
                            Total {adsCount} Ad{adsData?.length > 1 && 's'}{' '}
                            Available
                        </p>
                    </div>
                )}

                {adsData && adsData?.length == 0 && (
                    <div className="bg-white mb-3 border-b-8 border-themeWhiteLight py-12">
                        <p className="text-base font-semibold text-themeBlackAlt  text-center">
                            No Data Found
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllAds;
