import _ from 'lodash';
import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { LoaderPage } from '../../../../lib/loader';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import { authAxios } from '../../../../utils/axiosKits';

const AlertTableSmall = ({ adAlerts, adAlertsError, alertIds, setAlertIds }) => {
  const [state, setState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { addToast } = useToasts();
  const { mutate } = useSWRConfig({ refreshInterval: 0 });

  // delete ad alert function
  const deleteAdAlert = (id) => {
    setLoading(true);
    sweetAlert({
      title: "Are you sure?",
      text: "You want to delete this alert?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          authAxios({
            method: "DELETE",
            url: `/user/alert/ads/${id}`,
          }).then((res) => {
            mutate("/user/alert/ads").then(() => {
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
              });
              setLoading(false);
              setState(false);
            }, 1000);
          });
        } catch (error) {
          if (error?.response?.data) {
            addToast(error.response.data.message, {
              appearance: "error",
              autoDismiss: true,
            });
          } else {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  };

  // enable ad alert function
  const enableAlert = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/user/alert/status/ads/${id}`,
        data: {
          active: true,
        },
      }).then((res) => {
        mutate(`/user/alert/ads`).then(() => {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setState(false);
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      if (error?.response) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      setLoading(false);
    }
  };

  // disable ad alert function
  const disableAlert = async (id) => {
    setLoading(true);
    try {
      await authAxios({
        method: "PUT",
        url: `/user/alert/status/ads/${id}`,
        data: {
          active: false,
        },
      }).then((res) => {
        mutate(`/user/alert/ads`).then(() => {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setState(false);
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      if (error.response.data.message) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-y-6 relative">

      {loading && (
        <LoaderPage />
      )}

      {_.map(adAlerts, (item, index) => (
        <div className="bg-white rounded p-4" key={index}>
          <div className="flex gap-3 items-center relative">
            <input type="checkbox" className="accent-themePrimary w-4 h-4" />
            <p className="text-lg overflow-hidden w-9/12 h-6">
              {item?.name}
            </p>
            <div className="absolute right-0 mr-4">
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

                    {item?.active ? (
                      <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => disableAlert(item._id)}
                      >
                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                        <p className="text-sm font-normal text-themeWhiteLighter">
                          Disable
                        </p>
                      </button>
                    ) : (

                      <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                        onClick={() => enableAlert(item._id)}
                      >
                        <AiOutlineEye className="text-xl text-themePrimary" />
                        <p className="text-sm font-normal text-themePrimary">
                          Enable
                        </p>
                      </button>
                    )}

                    <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                      onClick={() => deleteAdAlert(item._id)}
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

          <div className="pt-2 space-y-1">
            <p className=" text-base text-themeBlackAlt">
              <strong>Keywords: </strong>{item?.keyword}{" "}
            </p>
            <p className=" text-base text-themeBlackAlt">
              <strong>Category: </strong>{item?.category}{" "}
            </p>
            <p className=" text-base text-themeBlackAlt">
              <strong>Tags: </strong>{item?.tags.join(", ")}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {item?.active ? (
                <p className="flex items-center gap-3 bg-themeGreenLight w-fit px-4 py-2 rounded text-base text-themeBlackAlt">
                  <span>
                    <AiOutlineEye className="text-xl text-themeBlackAlt" />{" "}
                  </span>
                  Enabled
                </p>
              ) : (
                <p className="flex items-center gap-3 bg-red-300 w-fit px-4 py-2 rounded text-base text-themeBlackAlt">
                  <span>
                    <BsEyeSlash className="text-xl text-themeBlackAlt" />{" "}
                  </span>
                  Disabled
                </p>
              )}

              <p className="flex items-center gap-3 bg-indigo-300 w-fit px-4 py-2 rounded text-base text-themeBlackAlt">
                <span>
                  <GrMapLocation className="text-xl text-themeBlackAlt" />
                </span>
                {item?.location}
              </p>
              <p className="flex items-center gap-3 bg-green-300 w-fit px-4 py-2 rounded text-base text-themeBlackAlt">
                <span>
                  <AiOutlineMail className="text-xl text-themeBlackAlt" />
                </span>
                {item?.emailFrequency}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertTableSmall;