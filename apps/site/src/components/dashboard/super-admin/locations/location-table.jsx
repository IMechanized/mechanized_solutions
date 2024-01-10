import React from "react";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import sweetAlert from "sweetalert";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { authAxios } from "../../../../utils/axiosKits";
import { LoaderMain } from "../../../../lib/loader";
import ImageOpt from "../../../../optimize/image";

const LocationTable = ({ adsLocationData, adsLocationError, locationsIds, setLocationIds, loadingTop }) => {
    // const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    const [state, setState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [allSelected, setAllSelected] = React.useState(false)

    const { addToast } = useToasts();

    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    // enable category function
    const enableLocation = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: "PUT",
                url: `/admin/topLocations/status/${id}`,
                data: {
                    status: "enbable",
                },
            })
                .then((res) => {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    mutate(`/admin/topLocations`).then(() => {
                        setLoading(false);
                        setState(!state);
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

    // disable location function
    const disableLocation = async (id) => {
        setLoading(true);
        try {
            await authAxios({
                method: "PUT",
                url: `/admin/topLocations/status/${id}`,
                data: {
                    status: "disable",
                },
            })
                .then((res) => {
                    addToast(res.data.message, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    mutate(`/admin/topLocations`).then(() => {
                        setLoading(false);
                        setState(!state);
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

    // delete single Category function
    const deleteSingleLocation = (id) => {
        sweetAlert({
            title: "Are you sure?",
            text: "You want to delete this location?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                try {
                    authAxios
                        .delete(`/admin/topLocations/byId/${id}`)
                        .then((res) => {
                            mutate("/admin/topLocations").then(() => {
                                addToast(res.data.message, {
                                    appearance: "success",
                                    autoDismiss: true,
                                    autoDismissTimeout: 3000,
                                });
                                setLoading(false);
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

    //collect ids by single checked
    const handleIdChecked = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setLocationIds([...locationsIds, value]);
        } else {
            setLocationIds(locationsIds?.filter((id) => id !== value));
        }
    };

    const handleAllChecked = () => {
        setAllSelected(!allSelected)
    };

    return (
        <div className="py-2 inline-block w-[99%] sm:w-full overflow-x-auto xl:overflow-visible">
            <table className="w-full">
                <thead>
                    <tr className="bg-white border-b-8 border-themeWhiteLight">
                        <th
                            scope="col"
                            className="text-sm font-semibold pl-6 py-4 text-left rounded-lg w-36"
                        >
                            <input type="checkbox" className="accent-themePrimary w-4 h-4"
                                onClick={() => {
                                    handleAllChecked()
                                }}
                            />
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-4 sm:px-0 py-4 text-left w-36"
                        >
                            Icon
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt py-4 xl:w-28 text-left whitespace-nowrap"
                        >
                            Location Name
                        </th>

                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt py-4 text-center px-[52px] xl:text-right xl:pl-32"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt rounded-lg  py-4 text-right pr-10 xl:pr-20"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {/* {!adsLocationError && !adsLocationData &&
            <div className="absolute w-full h-full ">
              <LoaderMain />
            </div>
          } */}
                    {loading &&
                        <div className="absolute w-full h-full ">
                            <LoaderMain />
                        </div>
                    }
                    {loadingTop &&
                        <div className="absolute w-full h-full ">
                            <LoaderMain />
                        </div>
                    }
                    {adsLocationData &&
                        adsLocationData.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white  mb-3 border-b-8 border-themeWhiteLight"
                            >
                                <td className="pl-6 py-4 whitespace-nowrap text-sm font-normal text-themeBlackAlt rounded-lg">
                                    <input
                                        type="checkbox"
                                        className="accent-themePrimary w-4 h-4"
                                        value={item?._id}
                                        name="locationsIds"
                                        onChange={handleIdChecked}
                                    // checked={allSelected}
                                    />
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt py-4 whitespace-nowrap px-4 sm:px-0">
                                    {item?.avatar ?
                                        <ImageOpt src={item?.avatar} width={40} height={40} />
                                        :
                                        <ImageOpt src="/table.png" width={40} height={40} />
                                    }
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt py-4 whitespace-nowrap">
                                    {item.location}
                                </td>
                                <td
                                    className={`text-base ${item?.status?.isActive
                                        ? "text-themePrimary"
                                        : "text-themeSecondary"
                                        } font-semibold  py-4 whitespace-nowrap text-center px-12 xl:text-right xl:pl-32`}
                                >
                                    {item?.status?.isActive ? "Enabled" : "Disabled"}
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt  py-4 whitespace-nowrap rounded-lg text-right pr-10 xl:pr-20">
                                    <div className="relative">
                                        <button
                                            onClick={() => setState(index === state ? false : index)}
                                            className="p-2 border border-themeWhiteLight2 rounded"
                                        >
                                            <HiOutlineDotsVertical className="text-xl hover:text-themePrimary" />
                                        </button>

                                        <div
                                            className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${state === index ? "block" : "hidden"
                                                }`}
                                        >
                                            <div className="py-1 z-20 px-2" role="none">
                                                {/* edit location  button  */}
                                                <Link href={`/dashboard/superadmin/locations/edit-location?active_id=${item._id}`} passHref>
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

                                                {/* single location status change button  */}
                                                {item?.status?.isActive ? (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => disableLocation(item._id)}
                                                    >
                                                        <BsEyeSlash className="text-xl text-themeWhiteLighter" />
                                                        <p className="text-sm font-normal text-themeWhiteLighter">
                                                            Disable
                                                        </p>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                        onClick={() => enableLocation(item._id)}
                                                    >
                                                        <AiOutlineEye className="text-xl text-themePrimary" />
                                                        <p className="text-sm font-normal text-themePrimary">
                                                            Enable
                                                        </p>
                                                    </button>
                                                )}

                                                {/* delete single location button  */}
                                                <button
                                                    className="flex gap-2 pl-2 w-full py-2  hover:bg-themeWhiteLight hover:rounded"
                                                    onClick={() => deleteSingleLocation(item._id)}
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
    );
};

export default LocationTable;
