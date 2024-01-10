import React from 'react';
import _ from 'lodash';
import { useSWRConfig } from 'swr';
import sweetAlert from "sweetalert";
import { useToasts } from 'react-toast-notifications';
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { authAxios } from '../../../../utils/axiosKits';
import { LoaderPage } from '../../../../lib/loader';

const AlertTableLarge = ({ adAlerts, adAlertsError, alertIds, setAlertIds, loadingTop, checked, setChecked, setCheckedValues, getAllAdAlertIdsHandler }) => {
  const [state, setState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { addToast } = useToasts();
  const { mutate } = useSWRConfig({ refreshInterval: 0 });


  // const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];


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

  const handleIdChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAlertIds([...alertIds, value]);
    } else {
      setAlertIds(alertIds?.filter((id) => id !== value));
    }
  };


  return (
    <div className="sm:-mx-6 lg:-mx-8 ">
      <div className="py-2 inline-block w-full sm:px-6 lg:px-8 overflow-y-auto xl:overflow-visible">
        <table className="w-full">
          <thead>
            <tr className="bg-white border-b-8 border-themeWhiteLight">
              <th
                scope="col"
                className="text-sm font-semibold px-6 py-4 text-left rounded-lg"
              >
                <input
                  type="checkbox"
                  className="accent-themePrimary w-4 h-4"
                // onClick={() => {
                //   setChecked((c) => !c)
                //   getAllAdAlertIdsHandler()
                // }}
                />
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Alert Name
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Keywords
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Category
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Tags
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Location
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Email Me
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-themeBlackAlt px-6 py-4 text-left rounded-lg"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className='relative'>
            {loading && (
              <LoaderPage />
            )}
            {loadingTop && (
              <LoaderPage />
            )}

            {adAlerts && adAlerts.length < 1 && (
              <tr className="text-center">
                <td colSpan="9">
                  <p className="text-center text-sm font-semibold text-themeBlack">
                    No Ad Alerts Found
                  </p>
                </td>
              </tr>
            )}


            {adAlerts &&
              _.map(adAlerts, (item, index) => (
                <tr
                  key={index}
                  className="bg-white  mb-3 border-b-8 border-themeWhiteLight"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-themeBlackAlt rounded-lg">
                    <input
                      type="checkbox"
                      className="accent-themePrimary w-4 h-4"
                      value={item._id}
                      name="alertIds"
                      onChange={
                        handleIdChecked
                      }
                    // checked={checked}
                    // onChange={(e) => setChecked(e.target.checked)}
                    // onChange={ (e) => {
                    //   if (e.target.checked) {
                    //     setAlertIds([...alertIds, e.target.value]);
                    //   } else {
                    //     setAlertIds(alertIds?.filter((id) => id !== e.target.value));
                    //   }
                    // }
                    //  }
                    // onChange={(e) => {
                    //   handleIdChecked(e)
                    //   // setChecked(e.target.checked)
                    //   // setCheckedValues(e.target.value)
                    // }}
                    />
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.name}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.keyword}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.category}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.tags.join(", ")}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.location}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap">
                    {item?.emailFrequency}
                  </td>
                  <td className={`text-base ${item?.active ? 'text-themePrimary' : 'text-themeSecondary'} font-semibold px-6 py-4 whitespace-nowrap`}>
                    {item?.active ? "Enabled" : "Disabled"}
                  </td>
                  <td className="text-sm font-normal text-themeBlackAlt px-6 py-4 whitespace-nowrap rounded-lg">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setState(index === state ? false : index)
                        }
                        className="p-2 border border-themeWhiteLight2 rounded"
                      >
                        <HiOutlineDotsVertical className="text-xl" />
                      </button>

                      <div
                        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${state === index ? "block" : "hidden"
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
                          {item?.active ?
                            <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                              onClick={() => disableAlert(item._id)}
                            >
                              <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                              <p className="text-sm font-normal text-themeWhiteLighter">
                                Disable
                              </p>
                            </button>
                            :
                            <button className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                              onClick={() => enableAlert(item._id)}
                            >
                              <AiOutlineEye className="text-xl text-themePrimary" />
                              <p className="text-sm font-normal text-themePrimary">
                                Enable
                              </p>
                            </button>
                          }

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
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertTableLarge;