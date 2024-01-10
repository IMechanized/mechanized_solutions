import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';
import AdsFilter from '../src/components/fronted/ads-filter';
import AdsItem from '../src/components/fronted/ads/ads-item';
import Layout from '../src/components/fronted/layout/layout';
import Pagination from '../src/components/fronted/pagination';
import Search from '../src/components/fronted/search';
import { Axios } from '../src/utils/axiosKits';

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const adsAPI = '/user/search/ads';

const SearchPage = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [adssPerPage] = React.useState(12);

    const router = useRouter();
    const API =
        router.pathname == router.asPath
            ? adsAPI + `?page=${currentPage}`
            : adsAPI +
              router.asPath.replace(router.pathname, '') +
              `&page=${currentPage}`;
    const { data: totalAdsData, error: adsError } = useSWR(API, fetcher);
    const ads = totalAdsData?.ads;
    const totalAdsCount = totalAdsData?.totalAdsCount;

    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <>
            <Head>
                <title>All Ads</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <Layout>
                <section>
                    {/* {!totalAdsData && !adsError &&
            < LoaderPage />
          } */}
                    {/* <!-- search section --> */}
                    <div className="bg-themePrimary">
                        <div className="container mx-auto">
                            <div className="py-24 relative ">
                                <h1 className="mb-12 font-bold text-2xl sm:text-4xl text-white text-center">
                                    Find Anything Around You
                                </h1>
                                <div className="absolute md:-bottom-24 lg:-bottom-9 left-0 right-0 w-fit sm:w-full rounded-lg mx-5 sm:m-auto">
                                    <Search />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-themeWhiteLight pt-44 md:pt-36 lg:pt-24">
                        <div className="container mx-auto  px-5 sm:px-0">
                            {/* <!-- filter section --> */}
                            <div className="bg-white p-7 rounded-lg shadow-filterShadow">
                                <h1 className="text-themeBlackAlt text-base md:text-2xl font-bold text-center">
                                    <span className="text-themePrimary">
                                        {totalAdsCount}
                                    </span>{' '}
                                    Product{totalAdsCount > 1 && <span>s</span>}{' '}
                                    Found
                                </h1>

                                <hr className="mt-5 md:hidden" />

                                {/* <!-- form area --> */}
                                <AdsFilter setCurrentPage={setCurrentPage} />
                            </div>

                            {/* Loading skeleton */}
                            {!totalAdsData && !adsError && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 mt-12">
                                    {_.map(Array(16), (item, index) => (
                                        <div className="shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300">
                                            <div className="relative">
                                                <Skeleton height={190} />
                                                <div className="absolute top-3 right-3 text-white text-sm rounded z-20">
                                                    <SkeletonTheme
                                                        baseColor="#2020201f"
                                                        highlightColor="#f5f5f5"
                                                    >
                                                        <Skeleton
                                                            height={32}
                                                            width={60}
                                                        />
                                                    </SkeletonTheme>
                                                </div>
                                            </div>
                                            <p className="text-xs font-normal text-themeWhiteLighter pb-4 pt-5">
                                                <Skeleton width={60} />
                                            </p>
                                            <span className="border-b border-themeGrayBorder block mb-3"></span>
                                            <h4 className="text-lg font-semibold text-themeBlackAlt truncate">
                                                <a>
                                                    <Skeleton />
                                                </a>
                                            </h4>
                                            <p className="flex items-center text-themeWhiteLighter text-sm  pb-4 pt-1">
                                                <span className="mr-1.5">
                                                    <MdOutlineLocationOn className="text-xl" />
                                                </span>
                                                <Skeleton width={100} />
                                            </p>
                                            <span className="border-b border-themeGrayBorder block mb-4"></span>
                                            <div className="flex justify-between items-center">
                                                <h5 className="text-themePrimary text-xl font-bold">
                                                    <Skeleton
                                                        height={25}
                                                        width={40}
                                                    />
                                                </h5>
                                                <Skeleton
                                                    height={25}
                                                    width={25}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* <!-- card section --> */}
                            {ads && !adsError && ads.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-7 mt-12">
                                    {ads.map((item, index) => (
                                        <AdsItem key={index} item={item} />
                                    ))}
                                </div>
                            )}
                            {adsError && (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1  gap-7 mt-12 pb-40">
                                    <div className="text-center">
                                        Error! {adsError.message}
                                    </div>
                                </div>
                            )}

                            {ads && ads.length == 0 && !adsError && (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-7 mt-12 text-center ">
                                    <h3 className="text-3xl font-semibold pt-10 pb-40">
                                        No Data Found
                                    </h3>
                                </div>
                            )}

                            {/* <!-- pagination --> */}
                            {totalAdsCount > adssPerPage && (
                                <Pagination
                                    totalCount={totalAdsCount}
                                    showPerPage={adssPerPage}
                                    handlePageChange={handlePageChange}
                                />
                            )}

                            {/* Spacer */}
                            {totalAdsCount < adssPerPage && (
                                <div className="pb-24"></div>
                            )}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default SearchPage;
