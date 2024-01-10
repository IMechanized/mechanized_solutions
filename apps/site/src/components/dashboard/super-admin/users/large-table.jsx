import _ from 'lodash';
import Link from 'next/link';
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import Moment from 'react-moment';
import { useToasts } from 'react-toast-notifications';
import sweetAlert from 'sweetalert';
import { useSWRConfig } from 'swr';
import { LoaderPage } from '../../../../lib/loader';
import Image from '../../../../optimize/image';
import { authAxios } from '../../../../utils/axiosKits';

const LargeTable = ({
    userData,
    userError,
    userIds,
    setUserIds,
    loadingTop,
}) => {
    // const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    const [state, setState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { addToast } = useToasts();

    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });

    // delete single user function
    const deleteSingleUser = (id) => {
        sweetAlert({
            title: 'Are you sure?',
            text: 'You want to delete this user?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                try {
                    authAxios
                        .delete(`/admin/manage/user/${id}`)
                        .then((res) => {
                            mutate('/admin/manage/user').then(() => {
                                addToast(res.data.message, {
                                    appearance: 'success',
                                    autoDismiss: true,
                                    autoDismissTimeout: 3000,
                                });
                                setLoading(false);
                            }, 1000);
                        })
                        .catch((err) => {
                            addToast(err?.response?.data?.message, {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            });
                            setLoading(false);
                        });
                } catch (error) {
                    addToast(error?.response?.data?.message, {
                        appearance: 'error',
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
            setUserIds([...userIds, value]);
        } else {
            setUserIds(userIds?.filter((id) => id !== value));
        }
    };

    return (
        <div className="pt-2 inline-block overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-white border-b-8 border-themeWhiteLight">
                        <th
                            scope="col"
                            className="text-sm font-semibold pl-6 py-4 text-left rounded-lg 2xl:w-20"
                        >
                            <input
                                type="checkbox"
                                className="accent-themePrimary w-4 h-4"
                            />
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt pl-4 py-4 text-left 2xl:w-36"
                        >
                            Member
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt py-4  text-left 2xl:pl-36 2xl:w-38"
                        >
                            Email
                        </th>

                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt px-8 2xl:pl-36 whitespace-nowrap "
                        >
                            Member Since
                        </th>
                        <th
                            scope="col"
                            className="text-base font-semibold text-themeBlackAlt rounded-lg  py-4 text-left 2xl:px-8 2xl:pl-32"
                        >
                            Role
                        </th>

                        <th
                            scope="col"
                            className="sr-only rounded-lg  py-4 2xl:px-8"
                        >
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody className="relative">
                    {/* {!userError && !userData && (
            <LoaderPage />
          )} */}

                    {loading && <LoaderPage />}

                    {loadingTop && <LoaderPage />}

                    {userData && userData?.length === 0 && (
                        <tr className="bg-white  mb-3 border-b-8 border-themeWhiteLight">
                            <td colSpan="5" className="py-4 text-center">
                                No data found
                            </td>
                        </tr>
                    )}

                    {userData &&
                        userData?.length > 0 &&
                        _.map(userData, (item, index) => (
                            <tr
                                key={index}
                                className="bg-white  mb-3 border-b-8 border-themeWhiteLight"
                            >
                                <td className="pl-6 py-4 whitespace-nowrap text-sm font-normal text-themeBlackAlt rounded-lg">
                                    <input
                                        type="checkbox"
                                        className="accent-themePrimary w-4 h-4"
                                        value={item?._id}
                                        name="userIds"
                                        onChange={handleIdChecked}
                                    />
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt py-4 whitespace-nowrap pl-5">
                                    <div className="flex items-center gap-4">
                                        {item?.avatar ? (
                                            <Image
                                                src={item?.avatar}
                                                width={40}
                                                height={40}
                                                layout="fixed"
                                                className={`rounded-md`}
                                                alt="user_avatar"
                                            />
                                        ) : (
                                            <Image
                                                src={`https://ui-avatars.com/api/?name=${item?.fullName?.firstName}&background=random&color=fff&size=40&length=1`}
                                                width={40}
                                                height={40}
                                                layout="fixed"
                                                className={`rounded-md`}
                                                alt="user_avatar"
                                            />
                                        )}
                                        <p className="text-base font-normal text-themeBlackAlt">
                                            {item?.fullName?.firstName}{' '}
                                            {item?.fullName?.lastName}
                                        </p>
                                    </div>
                                </td>
                                <td className="text-base font-normal text-themeBlackAlt py-4 2xl:pl-36 whitespace-nowrap">
                                    {item?.email}
                                </td>
                                <td className="text-base font-normal text-themeBlackAlt py-4 2xl:px-8 2xl:pl-32 whitespace-nowrap text-center">
                                    <Moment format=" DD MMM YYYY">
                                        {item.createdAt}
                                    </Moment>
                                </td>
                                <td
                                    className={`text-base font-semibold ${
                                        item?.role?.isSuperAdmin &&
                                        'text-themePrimary'
                                    } ${
                                        item?.role?.isAdmin &&
                                        'text-themeSecondary'
                                    } ${
                                        item?.role?.isBuyer &&
                                        'text-themeGreenLight'
                                    } ${
                                        item?.role?.isSeller &&
                                        'text-themeRedLight'
                                    } py-4 2xl:px-8 2xl:pl-32 whitespace-nowrap`}
                                >
                                    {item?.role?.isSuperAdmin === true
                                        ? 'Super Admin'
                                        : item?.role?.isAdmin === true
                                        ? 'Admin'
                                        : item?.role?.isBuyer === true
                                        ? 'Buyer'
                                        : item?.role?.isSeller === true
                                        ? 'Seller'
                                        : 'User'}
                                </td>
                                <td className="text-sm font-normal text-themeBlackAlt py-42xl: px-8 whitespace-nowrap text-right">
                                    <div className="flex gap-6">
                                        {/* edit an user */}
                                        <Link
                                            href={`/dashboard/superadmin/users/edit-user?active_id=${item._id}`}
                                            passHref
                                        >
                                            <svg
                                                className="cursor-pointer text-themeWhiteLighter hover:text-themePrimary"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9 11.2501L15.2888 4.93883C15.5841 4.64345 15.7501 4.24282 15.7501 3.82508C15.7501 3.40734 15.5841 3.00672 15.2888 2.71133C14.9934 2.41595 14.5927 2.25 14.175 2.25C13.7573 2.25 13.3566 2.41595 13.0613 2.71133L6.75 9.00008V11.2501H9Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 3.75L14.25 6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6.75184 5.30078C5.44012 5.49299 4.24964 6.1742 3.41932 7.2077C2.58899 8.2412 2.18028 9.55049 2.27521 10.8728C2.37013 12.1951 2.96167 13.4326 3.9311 14.3369C4.90054 15.2412 6.17612 15.7454 7.50184 15.7483C8.76419 15.7481 9.98425 15.2933 10.9386 14.467C11.893 13.6408 12.5178 12.4984 12.6986 11.249"
                                                    stroke="#5D6D7E"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Link>

                                        {/* delete single user */}
                                        <HiOutlineTrash
                                            className="text-themeWhiteLighter cursor-pointer text-lg hover:text-themePrimary"
                                            onClick={() =>
                                                deleteSingleUser(item._id)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default LargeTable;
