import React from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { RiHeartFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import Image from "../../../optimize/image";
import useUser from "../../../lib/user";
import { authAxios } from "../../../utils/axiosKits";
import useSWR, { useSWRConfig } from "swr";
import { ThemeContext } from "../../../context/ThemeContext";
import { useToasts } from "react-toast-notifications";

const authFetcher = (url) => authAxios(url).then((res) => res.data.data);

const AdsItem = ({ item }) => {
  const [saveLoading, setSaveLoading] = React.useState(false);
  const { user, loggedIn } = useUser();
  // const userData = user?.data;
  const { LoginPopupHandler } = React.useContext(ThemeContext);

  const { addToast } = useToasts();
  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  });

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
  };

  return (
    <div className="shadow-owlCard bg-white p-5 rounded-2xl hover:shadow-card transition ease-in-out duration-300 group">
      <div className="relative ">
        <Link href={item ? (item?.slug ? `/ads/${item?.slug}` : "#") : "#"}>
          <a>
            {item?.adGallery && item?.adGallery.length > 0 ? (
              <Image
                src={item?.adGallery[0].url}
                alt="ads-gallery"
                width={400}
                height={300}
                className="mb-5 w-full group-hover:scale-110 transition duration-300 ease-in-out"
                layout="responsive"
              />
            ) : (
              <Image
                src={`/avatar.png`}
                alt="ads-gallery"
                width={400}
                height={300}
                className="mb-5 w-full group-hover:scale-110 transition duration-300 ease-in-out"
                layout="responsive"
              />
            )}

            {item.status?.isFeatured && (
              <div className="absolute top-3 right-3 bg-themePrimary py-1 px-2 text-white text-sm rounded">
                Featured
              </div>
            )}
          </a>
        </Link>
      </div>
      <p className="text-xs font-normal text-themeWhiteLighter pb-4 pt-5">
        {item?.category}
      </p>
      <span className="border-b border-themeGrayBorder block mb-3"></span>
      <h4 className="text-lg font-semibold text-themeBlackAlt truncate">
        <Link href={item ? (item?.slug ? `/ads/${item?.slug}` : "#") : "#"}>
          <a className="hover:text-themePrimary transition duration-300 ease-in-out">{item?.adTitle}</a>
        </Link>
      </h4>
      <p className="flex items-center text-themeWhiteLighter text-sm  pb-4 pt-1">
        <span className="mr-1.5">
          <MdOutlineLocationOn className="text-xl" />
        </span>
        {item?.location}
      </p>
      <span className="border-b border-themeGrayBorder block mb-4"></span>
      <div className="flex justify-between items-center">
        <h5 className={`text-xl font-bold ${item?.loding ? "text-themeWhiteLighter" : "text-themePrimary"}`}>
          {item?.priceDetails?.currency == "USD" && <span>$</span>}
          {item?.priceDetails?.currency == "EUR" && <span>€</span>}
          {item?.priceDetails?.currency == "GBP" && <span>£</span>}
          {item?.priceDetails?.price}
        </h5>
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
  );
};

export default AdsItem;
