import _ from "lodash";
import Link from "next/link";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiStar } from "react-icons/bi";
import { BsEyeSlash, BsStarFill } from "react-icons/bs";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import Moment from "react-moment";
import { useToasts } from "react-toast-notifications";
import sweetAlert from "sweetalert";
import { mutate } from "swr";
import useUser from "../../../../lib/user";
import Image from "../../../../optimize/image";
import { authAxios } from "../../../../utils/axiosKits";

const AdsTableSmall = ({ adsData, adsIds, setAdsIds }) => {
  // const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState(false);

  const { user, isAdmin, isSuperAdmin } = useUser();
  const adminEntry = isSuperAdmin || isAdmin;

  const { addToast } = useToasts();

  // delete ads function here
  const deleteAd = (id) => {
    sweetAlert({
      title: "Are you sure?",
      text: "You want to delete this Ad?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        try {
          authAxios
            .delete(`/user/ads/${id}`)
            .then((res) => {
              mutate("/user/ads").then(() => {
                addToast(res.data.message, {
                  appearance: "success",
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });
                setLoading(false);
                setState(false);
              }, 1000);
            })
            .catch((err) => {
              addToast(err?.response?.data?.message, {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              setLoading(false);
            });
        } catch (error) {
          addToast(error?.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setLoading(false);
        }
      }
    });
  };

  // enable ads function start
  const enableAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/seller/status/ads/${id}`,
        data: {
          status: "published",
        },
      })
        .then((res) => {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          mutate(`/user/ads`).then(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // disable ads function start
  const disableAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/seller/status/ads/${id}`,
        data: {
          status: "draft",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // feature ads function start
  const featureAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/seller/status/ads/${id}`,
        data: {
          status: "featured",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            setState(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // non-feature ads function start
  const nonFeatureAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/seller/status/ads/${id}`,
        data: {
          status: "nonFeatured",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            setState(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // approve ads function start
  const approveAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/admin/status/ads/${id}`,
        data: {
          status: "approved",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
          setState(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // reject ads function start
  const rejectAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/admin/status/ads/${id}`,
        data: {
          status: "rejected",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            setState(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // active ads function start
  const activeAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/admin/status/ads/${id}`,
        data: {
          status: "active",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            setState(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  // expire ads function start
  const expireAd = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/admin/status/ads/${id}`,
        data: {
          status: "expired",
        },
      })
        .then((res) => {
          mutate(`/user/ads`).then(() => {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setLoading(false);
            setState(false);
          }, 700);
        })
        .catch((err) => {
          addToast(err.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
        });
    } catch (error) {
      addToast(error.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const handleIdChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAdsIds([...adsIds, value]);
    } else {
      setAdsIds(adsIds?.filter((id) => id !== value));
    }
  };

  return (
    <div className="grid gap-y-6">
      <div className="w-fit">
        <label htmlFor="select">
          <p className="text-base font-bold text-white bg-themePrimary py-3 px-6 rounded-lg cursor-pointer">
            Select all
          </p>
          <input
            value="select"
            id="select"
            type="checkbox"
            className="hidden"
          />
        </label>
      </div>
      {/* {data.map((item, index) => ( */}
      {_.map(adsData, (item, index) => (
        <div key={index} className={`rounded p-4 shadow-card ${!item.status.isActive ? 'bg-red-100' : 'bg-white'}`}>
          <div className="flex justify-between items-center ">
            <input
              type="checkbox"
              className="accent-themePrimary w-4 h-4"
              value={item?._id}
              name="adsIds"
              onChange={handleIdChecked}
            />
            <div className="flex items-center gap-3 pt-1">
              <p className="text-lg font-bold text-themePrimary">
                {item?.priceDetails?.currency == "USD" && <span>$</span>}
                {item?.priceDetails?.currency == "EUR" && <span>€</span>}
                {item?.priceDetails?.currency == "GBP" && <span>£</span>}
                {item?.priceDetails?.price}
              </p>
              <span className="text-base font-normal text-themeSecondary">
                {item?.priceDetails?.priceType}
              </span>
            </div>

            <div className="flex items-center gap-8">
              {item?.status?.isFeatured ? (
                <BsStarFill className="text-base text-themePrimary" />
              ) : (
                <BiStar className="text-base text-themeBlackAlt" />
              )}
              <div className="relative">
                <button
                  onClick={() => setState(index === state ? false : index)}
                  className="p-1 border border-themeWhiteLight2 rounded"
                >
                  <HiOutlineDotsVertical className="text-lg" />
                </button>

                <div
                  className={`origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 right-0 ${state === index ? "block" : "hidden"
                    }`}
                >
                  <div className="py-1 z-20 px-2" role="none">
                    {/* edit ads button  */}
                    <Link
                      href={`/dashboard/ads/edit-ads?active_id=${item._id}`}
                      passHref
                    >
                      <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 12.5001L16.9875 5.48759C17.3157 5.15938 17.5001 4.71424 17.5001 4.25009C17.5001 3.78594 17.3157 3.34079 16.9875 3.01259C16.6593 2.68438 16.2142 2.5 15.75 2.5C15.2858 2.5 14.8407 2.68438 14.5125 3.01259L7.5 10.0001V12.5001H10Z"
                            stroke="#1A2B3A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.334 4.16602L15.834 6.66602"
                            stroke="#1A2B3A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.50074 5.89258C6.04328 6.10614 4.72052 6.86305 3.79794 8.01138C2.87536 9.15971 2.42123 10.6145 2.52671 12.0837C2.63218 13.553 3.28945 14.928 4.36659 15.9327C5.44374 16.9375 6.86105 17.4977 8.33408 17.5009C9.73669 17.5008 11.0923 16.9954 12.1527 16.0773C13.2131 15.1592 13.9073 13.8899 14.1082 12.5017"
                            stroke="#1A2B3A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <p className="text-sm font-normal text-themeBlackAlt">
                          Edit
                        </p>
                      </button>
                    </Link>

                    {/* publish-draft ads button */}
                    {item.status?.isPublished ? (
                      <button
                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => disableAd(item._id)}
                      >
                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                        <p className="text-sm font-normal text-themeWhiteLighter">
                          Disable
                        </p>
                      </button>
                    ) : (
                      <button
                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => enableAd(item._id)}
                      >
                        <AiOutlineEye className="text-xl text-themePrimary" />
                        <p className="text-sm font-normal text-themeWhiteLighter">
                          Enabled
                        </p>
                      </button>
                    )}

                    {/* featured-/non-featured ads button  */}
                    {item.status?.isFeatured ? (
                      <button
                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => nonFeatureAd(item._id)}
                      >
                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                        <p className="text-sm font-normal text-themeWhiteLighter">
                          Non-feature
                        </p>
                      </button>
                    ) : (
                      <button
                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => featureAd(item._id)}
                      >
                        <AiOutlineEye className="text-xl text-themePrimary" />
                        <p className="text-sm font-normal text-themeWhiteLighter">
                          Feature
                        </p>
                      </button>
                    )}

                    {/* approve-reject ads button  */}
                    {adminEntry &&
                      (item.status?.isApproved ? (
                        <button
                          className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                          onClick={() => rejectAd(item._id)}
                        >
                          <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                          <p className="text-sm font-normal text-themeWhiteLighter">
                            Reject
                          </p>
                        </button>
                      ) : (
                        <button
                          className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                          onClick={() => approveAd(item._id)}
                        >
                          <AiOutlineEye className="text-xl text-themePrimary" />
                          <p className="text-sm font-normal text-themeWhiteLighter">
                            Approve
                          </p>
                        </button>
                      ))}

                    {/* active-expire ads button  */}
                    {adminEntry &&
                      (item.status?.isActive ? (
                        <button
                          className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                          onClick={() => expireAd(item._id)}
                        >
                          <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                          <p className="text-sm font-normal text-themeWhiteLighter">
                            Expire
                          </p>
                        </button>
                      ) : (
                        <button
                          className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                          onClick={() => activeAd(item._id)}
                        >
                          <AiOutlineEye className="text-xl text-themePrimary" />
                          <p className="text-sm font-normal text-themeWhiteLighter">
                            Activate
                          </p>
                        </button>
                      ))}

                    <button
                      className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                      onClick={() => deleteAd(item._id)}
                    >
                      <HiOutlineTrash className="text-xl text-themeWhiteLighter" />
                      <p className="text-sm font-normal text-themeWhiteLighter">
                        Delete
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mx-auto gap-5 py-6">
            {item?.adGallery && item?.adGallery.length > 0 ? (
              <Image
                src={item?.adGallery[0].url}
                alt="seller"
                width={80}
                height={80}
                layout="fixed"
              />
            ) : (
              <Image
                src={"/sellerImg.png"}
                alt="seller"
                width={80}
                height={80}
                layout="fixed"
              />
            )}
            <div className="space-y-2 ">
              <p className="text-base font-normal text-themeBlackDarker">
                <strong className="text-themeWhiteLighter">Category: </strong>
                {item?.category}
              </p>
              <div className="pt-1">
                <strong className="text-themeWhiteLighter">Status: </strong>
                <span
                  className={`text-sm font-semibold ${item?.status?.isApproved
                    ? "text-themePrimary bg-themePrimaryLighter"
                    : "text-themeSecondary bg-orange-100"
                    } whitespace-nowrap uppercase py-px px-2 rounded`}
                >
                  {item?.status?.isApproved ? "APPROVED" : "PENDING"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-base font-semibold text-themeBlackAlt 2xl:w-9/12 max-h-36 overflow-hidden hover:text-themePrimary transition duration-300 ease-in-out">
            <Link href={item ? (item?.slug ? `/ads/${item?.slug}` : "#") : "#"} passHref>
              <a target="_blank" rel="noopener noreferrer">
                {item?.adTitle}
              </a>
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-8 py-6">
            <p className="bg-themeSecondary py-2 px-5 rounded-lg text-white text-sm">
              <Moment format="MMMM DD, YYYY">{item.createdAt}</Moment>
            </p>
            {!item.status.isPublished && (
              <p className="bg-themeYellowLight py-2 px-5 rounded-lg text-themeBlackDarker text-base">
                Drafted
              </p>
            )}
            {item?.adsReport && item?.adsReport?.length > 0 && (
              <Link href={`/dashboard/ads/reports?active_id=${item._id}`} passHref>
                <a target="_blank" rel="noopener noreferrer"><span className="text-sm text-white font-bold bg-red-500 px-5 py-2 rounded-lg">Reported ({item?.adsReport?.length})</span></a>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdsTableSmall;
