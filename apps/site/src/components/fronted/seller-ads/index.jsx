import React from 'react';
import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import { useToasts } from 'react-toast-notifications';
import { MdOutlineLocationOn } from "react-icons/md";
import { RiHeartFill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import ImageOpt from '../../../optimize/image';
import useUser from '../../../lib/user';
import { authAxios } from '../../../utils/axiosKits';
import { ThemeContext } from '../../../context/ThemeContext';

const authFetcher = (url) => authAxios(url).then((res) => res.data.data);

function SellerAds({ item }) {
    const [saveLoading, setSaveLoading] = React.useState(false);
    const { LoginPopupHandler } = React.useContext(ThemeContext);
    const { user, loggedIn } = useUser();
    const userData = user?.data;

    const { addToast } = useToasts();
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    // check isBookmark true or false
    const { data: bookmarkData } = useSWR(
        item ? `/user/bookmark/${item?._id}` : null,
        authFetcher,
        {
            refreshInterval: 0,
        }
    );

    // ad bookmark submit handler
    const addBookmarkHandler = async (adId) => {
        setSaveLoading(true);
        try {
            await authAxios({
                method: "post",
                url: "/user/bookmark",
                data: {
                    ads: adId,
                },
            }).then((res) => {
                mutate(`/user/bookmark/${adId}`).then(() => {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    setSaveLoading(false);
                });
            });
        } catch (error) {
            addToast(error.responsive.data.message, {
                appearance: "error",
                autoDismiss: true,
            });
            setSaveLoading(false);
        }
    };

    // ad bookmark submit handler
    const removeBookmarkHandler = async (adId) => {
        setSaveLoading(true);
        try {
            await authAxios({
                method: "DELETE",
                url: `/user/bookmark/${adId}`,
            }).then((res) => {
                mutate(`/user/bookmark/${adId}`).then(() => {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    setSaveLoading(false);
                });
            });
        } catch (error) {
            addToast(error.responsive.data.message, {
                appearance: "error",
                autoDismiss: true,
            });
            setSaveLoading(false);
        }
    }

    return (
        <div
            className="sm:grid grid-cols-3 gap-7 shadow bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300"
        >
            <div className="relative rounded-lg col-span-1 my-auto grid justify-center">
                <ImageOpt
                    src={item?.adGallery ? item?.adGallery[0]?.url : "/avatar.png"}
                    width={275}
                    height={220}
                    alt="image"
                    className="rounded-lg w-fit h-full object-center object-cover transition duration-300 ease-in-out"
                />
                {item.status?.isFeatured && (
                    <div className="absolute top-3 right-3 bg-themePrimary py-1 px-2 text-white text-sm rounded">
                        Featured
                    </div>
                )}
            </div>

            <div className="col-span-2">
                <p className="text-xs font-normal text-themeWhiteLighter pt-4 sm:pt-0 pb-4">
                    {item?.category}
                </p>
                <span className="border-b border-themeGrayBorder block mb-3"></span>
                <h4 className="text-lg font-semibold text-themeBlackAlt h-8 overflow-hidden text-clip transition duration-300 ease-in-out hover:text-themePrimary">
                    <Link href={item ? (item?.slug ? `/ads/${item?.slug}` : "#") : "#"}>
                        <a href="">{item?.adTitle}</a>
                    </Link>
                </h4>
                <p className="flex items-center text-themeWhiteLighter text-sm  pb-3">
                    <span className="mr-1.5">
                        <MdOutlineLocationOn className="text-lg text-themeGray" />
                    </span>
                    {item?.location}
                </p>
                <p className="text-sm font-normal text-themeBlackAlt text-clip overflow-hidden h-10">
                    {item?.description}
                </p>
                <span className="border-b border-themeGrayBorder block mb-3 pt-4"></span>
                <div className="flex justify-between items-center">
                    <h5 className="text-themePrimary text-xl font-bold">
                        {item?.priceDetails?.currency == "USD" && <span>$</span>}
                        {item?.priceDetails?.currency == "EUR" && <span>€</span>}
                        {item?.priceDetails?.currency == "GBP" && <span>£</span>}
                        {item?.priceDetails?.price}
                    </h5>
                    {/* <FiHeart className="text-themeGray text-2xl" /> */}
                    {loggedIn ? (
                        bookmarkData?.isBookmark ? (
                            <button
                                onClick={() => {
                                    removeBookmarkHandler(item?._id);
                                }}
                            >
                                <RiHeartFill className="text-themePrimary text-2xl" />
                            </button>
                        ) : (
                            <button
                                disabled={saveLoading}
                                onClick={() => {
                                    addBookmarkHandler(item?._id);
                                }}
                            >
                                <FiHeart className="text-themeGray text-2xl" />
                            </button>
                        )
                    ) : (
                        <button
                            onClick={LoginPopupHandler}
                        >
                            <FiHeart className="text-themeGray text-2xl" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SellerAds