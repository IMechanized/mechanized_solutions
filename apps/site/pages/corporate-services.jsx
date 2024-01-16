import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import Layout from '../src/components/fronted/layout/layout';
import Search from '../src/components/fronted/search';
import { ThemeContext } from '../src/context/ThemeContext';
import ImageOpt from '../src/optimize/image';

const Category = () => {
    const { adsCategoryData, adsCategoryError } =
        React.useContext(ThemeContext);
    const router = useRouter();

    const OnSearchHandler = (title) => {
        const values = {
            category: title,
        };
        const filtered = _.pickBy(values, (value) => value !== '');
        router.push({
            pathname: '/all-ads',
            query: filtered,
        });
    };

    return (
        <>
            <Head>
                <title>Corporate Services</title>
                <meta name="viewport" content="" />
            </Head>

            <Layout>
                <section>
                    {/* <!-- search section --> */}
                    <div className="bg-themePrimary">
                        <div className="container mx-auto">
                            <div className="py-24 relative">
                                <h1 className="font-bold text-2xl sm:text-4xl text-[white] text-center mb-12">
                                    Corporate Services
                                </h1>
                                <div className="absolute md:-bottom-24 lg:-bottom-9 left-0 right-0 w-fit sm:w-full rounded-lg mx-5 sm:m-auto">
                                    <Search />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- category card section --> */}

                    <div className="bg-themeWhiteLight">
                        <div className="container mx-auto">
                            <div className="pb-24 pt-44 md:pt-36 lg:pt-24  px-5 sm:px-0">
                                {/* loading skeleton */}
                                {!adsCategoryError && !adsCategoryData && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                        {_.map(
                                            [
                                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                11, 12,
                                            ],
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white w-full text-center m-auto py-14 rounded-2xl transition ease-in-out duration-500 shadow group"
                                                >
                                                    <Skeleton
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <p className="text-themeBlackAlt font-semibold text-lg pt-6 group-hover:text-white">
                                                        <Skeleton width={120} />
                                                    </p>
                                                    <p className="text-sm font-normal text-themeWhiteLighter pt-3 group-hover:text-white">
                                                        <Skeleton width={100} />
                                                    </p>
                                                    <button className="flex  justify-center pt-6 m-auto">
                                                        <a className="flex items-center gap-4 text-lg font-normal text-themePrimary group-hover:text-white">
                                                            <Skeleton
                                                                width={100}
                                                                height={30}
                                                            />
                                                        </a>
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}

                                {!adsCategoryError && adsCategoryData && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                        {_.map(
                                            adsCategoryData,
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white w-full text-center m-auto py-14 rounded-2xl hover:bg-themePrimary transition ease-in-out duration-500 shadow group"
                                                >
                                                    {item?.avatar && (
                                                        <>
                                                            {_.includes(
                                                                item.avatar,
                                                                '.svg',
                                                            ) ? (
                                                                <ImageOpt
                                                                    width={60}
                                                                    height={60}
                                                                    noPlaceholder
                                                                    src={
                                                                        item.avatar
                                                                    }
                                                                    className="rounded transition duration-300 ease-in-out  group-hover:bg-white"
                                                                    alt="icon"
                                                                />
                                                            ) : (
                                                                <ImageOpt
                                                                    width={60}
                                                                    height={60}
                                                                    className="rounded transition duration-300 ease-in-out  group-hover:bg-white"
                                                                    src={
                                                                        item.avatar
                                                                    }
                                                                    alt="icon"
                                                                />
                                                            )}
                                                        </>
                                                    )}

                                                    <p className="text-themeBlackAlt font-semibold text-lg pt-6 group-hover:text-white">
                                                        {item.categoryTitle}
                                                    </p>
                                                    <p className="text-sm font-normal text-themeWhiteLighter pt-3 group-hover:text-white">
                                                        {item.count} Ad
                                                        {item.count > 1 && (
                                                            <span>s</span>
                                                        )}{' '}
                                                        Posted
                                                    </p>
                                                    <button className="flex  justify-center pt-6 m-auto">
                                                        <a
                                                            onClick={() =>
                                                                OnSearchHandler(
                                                                    item?.categoryTitle,
                                                                )
                                                            }
                                                            className="flex items-center gap-4 text-lg font-normal text-themePrimary group-hover:text-white"
                                                        >
                                                            View Ads
                                                            <HiOutlineArrowRight className="h-6 w-6" />
                                                        </a>
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}

                                {adsCategoryData &&
                                    adsCategoryData.length < 1 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-7 text-center pb-44">
                                            <div>
                                                {' '}
                                                Sorry,{' '}
                                                <span className="text-themePrimary bold">
                                                    0
                                                </span>{' '}
                                                Category Found
                                            </div>
                                        </div>
                                    )}

                                {adsCategoryError && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7 mb-44">
                                        <div className="text-center">
                                            Error! {adsCategoryError.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Category;
