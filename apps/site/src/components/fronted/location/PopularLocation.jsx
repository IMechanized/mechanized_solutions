import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from '../../../context/ThemeContext';
import Image from '../../../optimize/image';

const data = [
    {
        id: 1,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 2,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 3,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 4,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 5,
        name: 'Destination',
        ads: '1234 Ads',
        img: '/location.png',
    },
    {
        id: 6,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 7,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
    {
        id: 8,
        name: 'Destination',
        ads: '1234',
        img: '/location.png',
    },
];

const PopularLocation = () => {
    const { topLocationData, topLocationError } =
        React.useContext(ThemeContext);
    const router = useRouter();

    const OnSearchHandler = (title) => {
        const values = {
            location: title,
        };
        const filtered = _.pickBy(values, (value) => value !== '');
        router.push({
            pathname: '/all-ads',
            query: filtered,
        });
    };
    return (
        <section className="pt-14 sm:pt-28 px-5 sm:px-0">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="font-bold text-4xl text-themeBlackAlt">
                        Popular{' '}
                        <span className="text-themeSecondary">Location</span>
                    </h2>
                    <p className="text-lg text-themeBlackAlt md:w-[38%] w-full mx-auto mt-5">
                        Lorem ipsum the dit adipiscing Aenean adicinging kiliuy
                        scope mentin scope mentin. scope mentin aenan.
                    </p>
                </div>

                {/* loading skeleton */}
                {!topLocationError && !topLocationData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-14">
                        {_.map([1, 2, 3, 4, 5, 6, 7, 8], (item, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-2xl cursor-pointer  group"
                            >
                                <a>
                                    <Skeleton height={280} />
                                    <div className="absolute top-0 left-0 bg-gradient-to-b from-[#06817900] to-themePrimary w-full h-full rounded-2xl "></div>
                                    <div className="absolute bottom-8 left-8">
                                        <h5 className="text-2xl text-white font-bold">
                                            <SkeletonTheme
                                                baseColor="#2020201f"
                                                highlightColor="#f5f5f5"
                                            >
                                                <Skeleton width={60} />
                                            </SkeletonTheme>
                                        </h5>
                                        <p className="text-white">
                                            <SkeletonTheme
                                                baseColor="#2020201f"
                                                highlightColor="#f5f5f5"
                                            >
                                                <Skeleton width={40} />
                                            </SkeletonTheme>
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* {topLocationError && */}
                {!topLocationError && topLocationData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-14">
                        {_.map(
                            _.slice(topLocationData, 0, 8),
                            (item, index) => (
                                <div
                                    onClick={() =>
                                        OnSearchHandler(item?.location)
                                    }
                                    key={index}
                                    className="relative overflow-hidden rounded-2xl cursor-pointer  group"
                                >
                                    <a>
                                        <Image
                                            className="w-full group-hover:scale-110 transition duration-300"
                                            src={item?.avatar}
                                            alt="location"
                                            width={500}
                                            height={420}
                                            layout="responsive"
                                        />
                                        <div className="absolute top-0 left-0 bg-gradient-to-b from-[#06817900] to-themePrimary w-full h-full rounded-2xl "></div>

                                        <div className="absolute bottom-8 left-8">
                                            <h5 className="text-2xl text-white font-bold">
                                                {item?.location}
                                            </h5>
                                            <p className="text-white">
                                                {item?.count} Ad
                                                {item?.count > 1 && (
                                                    <span>s</span>
                                                )}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            ),
                        )}
                    </div>
                )}

                {topLocationData && topLocationData.length < 1 && (
                    <div className="grid grid-cols-1  sm:gap-7 md:grid-cols-1 text-center">
                        <div>
                            {' '}
                            Sorry,{' '}
                            <span className="text-themePrimary bold">
                                0
                            </span>{' '}
                            Location Found
                        </div>
                    </div>
                )}

                {topLocationError && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7 mt-14">
                        <div className="text-center">
                            Error! {topLocationError.message}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularLocation;
