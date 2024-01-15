import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import { ThemeContext } from '../../../context/ThemeContext';
import ImageOpt from '../../../optimize/image';

const Category = () => {
    const { adsCategoryData, adsCategoryError, adsCategoryMutate } =
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
        <section className="py-28 bg-themeWhiteLighterAlt px-5 sm:px-0">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="font-bold text-4xl text-themeBlackAlt">
                        Browse Ad{' '}
                        <span className="text-themeSecondary">Categories</span>
                    </h2>
                    <p className="text-lg text-themeBlackAlt md:w-[38%] w-full mx-auto mt-5">
                        Browse our equipment ad categories and find something right for you.
                    </p>
                </div>

                {/* Loading skeleton */}
                {!adsCategoryError && !adsCategoryData && (
                    <div className="grid grid-cols-2 gap-4 sm:gap-7 md:grid-cols-3 mt-14">
                        {_.map([1, 2, 3, 4, 5, 6, 7, 8, 9], (item, index) => (
                            <a key={index}>
                                <div className="group sm:flex items-center justify-between bg-white py-8 px-7 md:px-3 lg:px-7 rounded-2xl shadow-owlCard transition-all duration-300 ease-in-out cursor-pointer">
                                    <div className="flex items-center flex-col sm:flex-row space-x-2 md:space-x-4 lg:space-x-7 text-center">
                                        <>
                                            <Skeleton width={44} height={44} />
                                        </>
                                        <div className="pt-1 sm:pt-0">
                                            <h5 className=" text-base sm:text-lg font-semibold">
                                                <Skeleton />
                                            </h5>
                                            <p className="text-xs sm:text-sm group-hover:text-white whitespace-nowrap sm:whitespace-normal">
                                                <Skeleton width={100} />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border border-themeGrayLight w-9 h-9 lg:w-11 lg:h-11 sm:flex items-center justify-center rounded-full hidden">
                                        <Skeleton
                                            height={45}
                                            width={45}
                                            circle={50}
                                        />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Main category display here */}
                {!adsCategoryError && adsCategoryData && (
                    <div className="grid grid-cols-2 gap-4 sm:gap-7 md:grid-cols-3 mt-14">
                        {/* {_.map(_.slice(adsCategoryData ? adsCategoryData : loadingCategory, 0, 9), (item, index) => ( */}
                        {_.map(
                            _.slice(adsCategoryData, 0, 9),
                            (item, index) => (
                                <a
                                    key={index}
                                    onClick={() =>
                                        OnSearchHandler(item?.categoryTitle)
                                    }
                                >
                                    <div className="group sm:flex items-center justify-between bg-white py-8 px-7 md:px-3 lg:px-7 rounded-2xl shadow-owlCard transition-all duration-300 ease-in-out hover:bg-themePrimary cursor-pointer">
                                        <div className="flex items-center flex-col sm:flex-row space-x-2 md:space-x-4 lg:space-x-7 text-center">
                                            {item?.avatar ? (
                                                <>
                                                    {_.includes(
                                                        item.avatar,
                                                        '.svg',
                                                    ) ? (
                                                        <ImageOpt
                                                            width={44}
                                                            height={44}
                                                            noPlaceholder
                                                            src={item.avatar}
                                                            className="rounded transition duration-300 ease-in-out  group-hover:bg-white"
                                                            alt="icon"
                                                        />
                                                    ) : (
                                                        <ImageOpt
                                                            width={44}
                                                            height={44}
                                                            className="rounded transition duration-300 ease-in-out  group-hover:bg-white"
                                                            src={item.avatar}
                                                            alt="icon"
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <ImageOpt
                                                    width={44}
                                                    height={44}
                                                    className="rounded transition duration-300 ease-in-out  group-hover:bg-white"
                                                    src="/table.png"
                                                    alt="icon"
                                                />
                                            )}

                                            <div className="pt-1 sm:pt-0">
                                                <h5 className="text-themeBlackLight text-base sm:text-lg font-semibold group-hover:text-white transition duration-300 ease-in-out ">
                                                    {item.categoryTitle}
                                                </h5>
                                                <p className="text-xs sm:text-sm text-themeWhiteLighter group-hover:text-white transition duration-300 ease-in-out whitespace-nowrap sm:whitespace-normal">
                                                    {item.count} Ad
                                                    {item.count > 1 && (
                                                        <span>s</span>
                                                    )}{' '}
                                                    Posted
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border border-themeGrayLight w-9 h-9 lg:w-11 lg:h-11 group-hover:border-white sm:flex items-center justify-center rounded-full hidden">
                                            <HiOutlineArrowRight className="h-6 w-6 text-themePrimary group-hover:text-white" />
                                        </div>
                                    </div>
                                </a>
                            ),
                        )}
                    </div>
                )}

                {adsCategoryData && adsCategoryData.length < 1 && (
                    <div className="grid grid-cols-1  sm:gap-7 md:grid-cols-1 text-center">
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
                    <div className="grid grid-cols-1 gap-4 sm:gap-7 md:grid-cols-1 mt-14">
                        <div className="text-center">
                            Error! {adsCategoryError.message}
                        </div>
                    </div>
                )}

                <div className="mt-14 text-center">
                    <Link href="/all-categories" passHref>
                        <button className="bg-themeSecondary rounded-md text-white px-8 h-14">
                            Browse All Categories
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Category;
