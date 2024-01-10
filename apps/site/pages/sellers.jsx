import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiStar } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import Rating from 'react-rating';
import useSWR from 'swr';
import Layout from '../src/components/fronted/layout/layout';
import Pagination from '../src/components/fronted/pagination';
import SellerFilter from '../src/components/fronted/seller-filter';
import Image from '../src/optimize/image';
import { Axios } from '../src/utils/axiosKits';

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const sellersAPI = 'user/search/sellers';

const SellerPage = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [adssPerPage] = React.useState(12);

    const router = useRouter();
    const API =
        router.pathname == router.asPath
            ? sellersAPI + `?page=${currentPage}`
            : sellersAPI +
              router.asPath.replace(router.pathname, '') +
              `&page=${currentPage}`;
    const { data: sellersAllData, error: sellersError } = useSWR(API, fetcher);
    const sellersData = sellersAllData?.seller;
    const sellerCount = sellersAllData ? sellersAllData.sellerCount : 0;

    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <>
            <Head>
                <title>Sellers</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <Layout>
                <div className="bg-themeWhiteLight">
                    <div className="bg-themePrimary">
                        <div className="container mx-auto">
                            <div className="py-28 relative ">
                                <h1 className="font-bold text-2xl sm:text-4xl text-white text-center">
                                    Our Best Sellers
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto pt-14 px-5 ">
                        {/* <!-- filter section --> */}
                        <div className="bg-white p-7 rounded-lg shadow-filterShadow">
                            <h1 className="text-themeBlackAlt text-lg md:text-2xl font-bold text-center">
                                We Have Total{' '}
                                <span className="text-themePrimary">
                                    {sellerCount}
                                </span>{' '}
                                Exclusive Seller{sellerCount > 1 && 's'}
                            </h1>

                            <hr className="mt-5 md:hidden" />

                            <div className="pt-6 h-full">
                                <SellerFilter setCurrentPage={setCurrentPage} />
                            </div>
                        </div>

                        <div className="pt-12">
                            {/* Loading skeleton */}
                            {!sellersData && !sellersError && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                    {_.map(Array(12), (item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl shadow pt-10 pb-8 hover:shadow-card transition ease-in-out duration-300"
                                        >
                                            <div className="m-auto text-center px-7">
                                                <Skeleton
                                                    height={100}
                                                    width={100}
                                                    circle={50}
                                                />
                                                <h3 className="text-xl font-normal text-themeBlackAlt pt-6 truncate">
                                                    <Skeleton width={100} />
                                                </h3>
                                                <p className="text-sm font-normal text-themeWhiteLighter pt-1">
                                                    <Skeleton width={80} />
                                                </p>
                                                <div className="flex gap-1 justify-center pt-3">
                                                    <Skeleton width={150} />
                                                </div>
                                                <div className="w-full block rounded-lg mt-7 py-3 group transition ease-in-out duration-500">
                                                    <Skeleton height={50} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {sellersData &&
                                !sellersError &&
                                sellersData?.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                        {_.map(sellersData, (item, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl shadow pt-10 pb-8 hover:shadow-card transition ease-in-out duration-300"
                                            >
                                                <div className="m-auto text-center px-7">
                                                    <Image
                                                        className="m-auto rounded-full"
                                                        src={
                                                            item?.avatar
                                                                ? item.avatar
                                                                : `https://ui-avatars.com/api/?name=${item?.fullName?.firstName}&background=random&length=1&bold=true`
                                                        }
                                                        width={100}
                                                        height={100}
                                                        alt="seller"
                                                    />
                                                    <h3 className="text-xl font-normal text-themeBlackAlt pt-6 truncate">
                                                        {
                                                            item?.fullName
                                                                ?.firstName
                                                        }{' '}
                                                        {
                                                            item?.fullName
                                                                ?.lastName
                                                        }
                                                    </h3>
                                                    <p className="text-sm font-normal text-themeWhiteLighter pt-1">
                                                        {item?.adsCount} Ad
                                                        {item?.adsCount > 1 &&
                                                            's'}{' '}
                                                        Posted
                                                    </p>
                                                    <div className="flex gap-1 justify-center pt-3">
                                                        {/* <HiStar className="text-themeYellowLight h-6 w-6" />
                          <HiStar className="text-themeYellowLight h-6 w-6" />
                          <HiStar className="text-themeYellowLight h-6 w-6" />
                          <HiStar className="text-themeYellowLight h-6 w-6" />
                          <IoIosStarHalf className="text-themeYellowLight h-6 w-6" /> */}
                                                        <Rating
                                                            initialRating={
                                                                item?.averageRating
                                                            }
                                                            readonly
                                                            // emptySymbol={<HiStar className="text-themeGrayLight text-base" />}
                                                            emptySymbol={
                                                                <HiStar className="text-themeGrayLight h-6 w-6" />
                                                            }
                                                            fullSymbol={
                                                                <HiStar className="text-themeYellowLight h-6 w-6" />
                                                            }
                                                        />
                                                    </div>
                                                    <Link
                                                        href={`/seller/${item?.userName}`}
                                                    >
                                                        <a className="w-full block text-themePrimary hover:text-white bg-themePrimaryLighter rounded-lg mt-7 py-3 hover:bg-themePrimary group transition ease-in-out duration-500">
                                                            View Seller Profile
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            {sellersData &&
                                !sellersError &&
                                sellersData?.length == 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-7 mt-12 text-center ">
                                        <h3 className="text-3xl font-semibold pt-10 pb-40">
                                            No Data Found
                                        </h3>
                                    </div>
                                )}

                            {sellersError && (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7 pb-40">
                                    <div className="text-center">
                                        Error! {sellersError.message}
                                    </div>
                                </div>
                            )}

                            {/* <!-- pagination --> */}
                            {sellerCount > adssPerPage && (
                                <Pagination
                                    totalCount={sellerCount}
                                    showPerPage={adssPerPage}
                                    handlePageChange={handlePageChange}
                                />
                            )}

                            {/* Spacer */}
                            {sellerCount < adssPerPage && (
                                <div className="pb-24"></div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerPage;
