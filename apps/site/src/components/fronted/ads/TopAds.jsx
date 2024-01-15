import _ from 'lodash';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';
import { Axios } from '../../../utils/axiosKits';
import AdsItem from './ads-item';

const data = [
    {
        id: 1,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 2,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 3,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 4,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 5,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 6,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 7,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
    {
        id: 8,
        category: 'Category Name',
        title: 'Simple and Short Product Title',
        location: '3836 Lunetta Street, Florida',
        price: '$1,000',
    },
];

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const latestAdsAPI = '/ads/latest';

const TopAds = () => {
    const { data: latestAdsData, error: adsError } = useSWR(
        latestAdsAPI,
        fetcher,
    );

    return (
        <section className="bg-gradient-to-b from-white to-themePrimary/10 pb-28 px-5 sm:px-0">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="font-bold text-4xl text-themeBlackAlt">
                        Latest{' '}
                        <span className="text-themeSecondary">Equipment Ads</span>
                    </h2>
                    <p className="text-lg text-themeBlackAlt lg:w-[38%] w-full mx-auto mt-5">
                        See the latest top of the line equipment from our advertisers. Curated just for you.
                    </p>
                </div>

                {/* loading skeleton */}
                {!adsError && !latestAdsData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-7 mt-12 ">
                        {_.map([1, 2, 3, 4, 5, 6, 7, 8], (item, index) => (
                            <div
                                key={index}
                                className="shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300"
                            >
                                <div className="relative">
                                    <Skeleton height={190} />
                                    <div className="absolute top-3 right-3 text-white text-sm rounded z-20">
                                        <SkeletonTheme
                                            baseColor="#2020201f"
                                            highlightColor="#f5f5f5"
                                        >
                                            <Skeleton height={32} width={60} />
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
                                        {/* <MdOutlineLocationOn className="text-xl" /> */}
                                    </span>
                                    <Skeleton width={100} />
                                </p>
                                <span className="border-b border-themeGrayBorder block mb-4"></span>
                                <div className="flex justify-between items-center">
                                    <h5 className="text-themePrimary text-xl font-bold">
                                        <Skeleton height={25} width={40} />
                                    </h5>
                                    <Skeleton height={25} width={25} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!adsError && latestAdsData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-7 mt-12 ">
                        {/* Ads number (8) is limited from backend  */}
                        {_.map(latestAdsData, (item, index) => (
                            <AdsItem key={index} item={item} />
                        ))}
                    </div>
                )}

                {adsError && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1  gap-7 mt-12 ">
                        <div className="text-center">
                            Error! {adsError.message}
                        </div>
                    </div>
                )}

                <div className="mt-14 text-center">
                    <Link href="/all-ads" passHref>
                        <button className="bg-themeSecondary rounded-md text-white w-[200px] h-14">
                            See All Ads
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopAds;
