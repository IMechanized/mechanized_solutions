import Link from 'next/link';
import React from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { RiHeartFill } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';
import sweetAlert from 'sweetalert';
import useSWR, { useSWRConfig } from 'swr';
import { LoaderPage } from '../../../../lib/loader';
import useUser from '../../../../lib/user';
import Image from '../../../../optimize/image';
import { authAxios } from '../../../../utils/axiosKits';
import Pagination from '../pagination';

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

const Favourite = () => {
    const { addToast } = useToasts();
    const [loading, setLoading] = React.useState(false);
    const [adssPerPage] = React.useState(12);
    const {
        user,
        isBuyer,
        isSeller,
        isAdmin,
        isSuperAdmin,
        loggedIn,
        loggedOut,
    } = useUser();
    const { data, error } = useSWR('/user/bookmarks', fetcher, {
        refreshInterval: 0,
    });
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    // delete bookmarks by id and update data
    function removeFavouriteHandler(id) {
        setLoading(true);
        sweetAlert({
            title: 'Are you sure?',
            text: 'You want to delete this bookmark?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                try {
                    authAxios({
                        method: 'DELETE',
                        url: `/user/bookmark/${id}`,
                    }).then((res) => {
                        mutate('/user/bookmarks').then(() => {
                            addToast(res.data.message, {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                            setLoading(false);
                        });
                    });
                } catch (error) {
                    addToast(err.response?.data?.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
    }

    return (
        <section className="container mx-auto">
            <h1 className="text-2xl font-semibold text-themeBlackDarker">
                Favourite Ads
            </h1>
            {!data && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 pb-16 relative">
                    <LoaderPage />
                </div>
            )}

            {data && data.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 pb-16">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300"
                        >
                            <div className="relative">
                                {item?.ads?.adGallery &&
                                item?.ads?.adGallery.length > 0 ? (
                                    <Image
                                        src={item?.ads?.adGallery[0].url}
                                        alt="ads-image"
                                        width={400}
                                        height={300}
                                        className="mb-5 w-full"
                                        layout="responsive"
                                    />
                                ) : (
                                    <Image
                                        src={`/avatar.png`}
                                        alt="ads-image"
                                        width={400}
                                        height={300}
                                        className="mb-5 w-full"
                                        layout="responsive"
                                    />
                                )}
                                {item?.ads?.status?.isFeatured && (
                                    <div className="absolute top-3 right-3 bg-themePrimary py-1 px-2 text-white text-sm rounded">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <p className="text-xs font-normal text-themeWhiteLighter pb-4 pt-5">
                                {item?.ads?.category}
                            </p>
                            <span className="border-b border-themeGrayBorder block mb-3"></span>
                            <h4 className="text-lg font-semibold text-themeBlackAlt truncate">
                                <Link
                                    href={
                                        item?.ads?.slug
                                            ? `/ads/${item?.ads?.slug}`
                                            : '#'
                                    }
                                >
                                    <a>{item?.ads?.adTitle}</a>
                                </Link>
                            </h4>
                            <p className="flex items-center text-themeWhiteLighter text-sm  pb-4 pt-1">
                                <span className="mr-1.5">
                                    <MdOutlineLocationOn className="text-xl" />
                                </span>
                                {item?.ads?.location}
                            </p>
                            <span className="border-b border-themeGrayBorder block mb-4"></span>
                            <div className="flex justify-between items-center">
                                <h5 className="text-themePrimary text-xl font-bold">
                                    {item?.ads?.priceDetails?.currency ==
                                        'USD' && <span>$</span>}
                                    {item?.ads?.priceDetails?.currency ==
                                        'EUR' && <span>€</span>}
                                    {item?.ads?.priceDetails?.currency ==
                                        'GBP' && <span>£</span>}
                                    {item?.ads?.priceDetails?.price}
                                </h5>
                                <button
                                    onClick={() =>
                                        removeFavouriteHandler(item?.ads?._id)
                                    }
                                >
                                    {/* <FiHeart className="text-themeRedLight text-2xl" /> */}
                                    <RiHeartFill className="text-themeRedLight text-2xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {data && data.length < 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-7 mt-10 pb-16 text-center">
                    <h2 className="text-3xl font-semibold pt-10 pb-40">
                        No Favourite Ads Data Found
                    </h2>
                </div>
            )}

            {/* <!-- pagination --> */}
            {data && data.length > adssPerPage && <Pagination />}
        </section>
    );
};

export default Favourite;
