import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import Moment from 'react-moment';
import useSWR from 'swr';
import Layout from '../../src/components/fronted/layout/layout';
import ImageOpt from '../../src/optimize/image';
import { Axios } from '../../src/utils/axiosKits';

const fetcher = (url) => Axios(url).then((res) => res.data.data);

const News = () => {
    const { data: blogData, error: blogError } = useSWR(`/ads/blog`, fetcher, {
        refreshInterval: 0,
    });

    return (
        <>
            <Head>
                <title>News &amp; Blog</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <Layout>
                <section className="bg-themeWhiteLight ">
                    <div className="bg-themePrimary">
                        <div className="container mx-auto">
                            <div className="py-28 relative ">
                                <h1 className="font-bold text-2xl sm:text-4xl text-white text-center">
                                    News &amp; Blog
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="py-24">
                        <div className="container mx-auto">
                            {/* Loading skeleton */}
                            {!blogData && !blogError && (
                                <div className="grid grid-cols-6 gap-7 px-5 sm:px-0">
                                    {_.map(
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="col-span-6 md:col-span-3 lg:col-span-2 bg-white p-7 rounded-2xl transition duration-500 ease-in-out hover:shadow-card "
                                            >
                                                <Skeleton height={280} />
                                                <p className="text-lg text-themeBlackDarker pt-5 pb-2">
                                                    <Skeleton width={100} />
                                                </p>
                                                <h1 className="text-lg sm:text-xl text-themeBlackAlt font-bold text-ellipsis overflow-hidden max-h-14">
                                                    <Skeleton width={150} />
                                                </h1>
                                                <p className="text-base text-themeWhiteLighter pt-3 text-ellipsis overflow-hidden max-h-28">
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                </p>
                                                <a className="flex items-center gap-4 pt-2 group">
                                                    <span className="text-base font-semibold text-themePrimary group-hover:opacity-70 transition duration-300 ease-in-out">
                                                        <Skeleton width={100} />
                                                    </span>
                                                </a>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            {/* {img.map((item, index) => ( */}
                            {blogData && !blogError && blogData.length > 0 && (
                                <div className="grid grid-cols-6 gap-7 px-5 sm:px-0">
                                    {_.map(blogData, (item, index) => (
                                        <div
                                            key={index}
                                            className="col-span-6 md:col-span-3 lg:col-span-2 bg-white p-7 rounded-2xl transition duration-500 ease-in-out hover:shadow-card group"
                                        >
                                            <ImageOpt
                                                className="group-hover:scale-110 transition duration-300 ease-in-out"
                                                src={item?.avatar}
                                                width={370}
                                                height={280}
                                                layout="responsive"
                                            />
                                            <p className="text-lg text-themeBlackDarker pt-5 pb-2">
                                                {/* 14 SEP, 2020 */}
                                                <Moment format="DD MMM, YYYY">
                                                    {item.createdAt}
                                                </Moment>
                                            </p>
                                            <h1 className="text-lg sm:text-xl text-themeBlackAlt font-bold text-ellipsis overflow-hidden max-h-14 transition duration-300 ease-in-out hover:text-themePrimary">
                                                <Link
                                                    href={
                                                        item?.slug
                                                            ? `/news-blog/${item?.slug}`
                                                            : '#'
                                                    }
                                                >
                                                    <a>{item?.blogTitle}</a>
                                                </Link>
                                            </h1>
                                            <p className="text-base text-themeWhiteLighter pt-3 text-ellipsis overflow-hidden max-h-28">
                                                {/* {item?.description}... */}
                                                {/* Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s... */}
                                            </p>
                                            <div className="text-base text-themeWhiteLighter pt-3 text-ellipsis overflow-hidden max-h-28">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.description,
                                                    }}
                                                />
                                            </div>
                                            <Link
                                                href={
                                                    item?.slug
                                                        ? `/news-blog/${item?.slug}`
                                                        : '#'
                                                }
                                            >
                                                <a className="flex items-center gap-4 pt-2 group">
                                                    <span className="text-base font-semibold text-themePrimary group-hover:opacity-70 transition duration-300 ease-in-out">
                                                        Read More
                                                    </span>
                                                    <svg
                                                        className="group-hover:opacity-70 transition duration-300 ease-in-out"
                                                        width="16"
                                                        height="12"
                                                        viewBox="0 0 16 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.69922 11.7617L15.0117 6.44922L15.4414 6L15.0117 5.55078L9.69922 0.238282L8.80078 1.13672L13.0391 5.375L0.499999 5.375L0.5 6.625L13.0391 6.625L8.80078 10.8633L9.69922 11.7617Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {blogError && (
                                <div className="grid grid-cols-1 gap-7 px-5 sm:px-0">
                                    <div className="text-center">
                                        Error! {blogError.message}
                                    </div>
                                </div>
                            )}
                            {blogData && !blogError && blogData.length == 0 && (
                                <div className="grid grid-cols-1 gap-7 px-5 sm:px-0 text-center">
                                    <h3 className="text-3xl font-semibold pt-10 pb-40">
                                        No Data Found
                                    </h3>
                                </div>
                            )}

                            {/* <Pagination /> */}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default News;
