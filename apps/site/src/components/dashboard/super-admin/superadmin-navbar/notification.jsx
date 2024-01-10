import _ from 'lodash';
import Link from 'next/link';
import React from 'react';
import Moment from 'react-moment';
import useSWR from 'swr';
import { ThemeContext } from '../../../../context/ThemeContext';
import useUser from '../../../../lib/user';
import { authAxios } from '../../../../utils/axiosKits';

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

const Notification = () => {
    const [active, setActive] = React.useState(0);
    const [activeItem, setActiveItem] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [filterUsers, setFilterUsers] = React.useState([]);

    const { user } = useUser();

    const { recentNotification, recentNotificationError } =
        React.useContext(ThemeContext);
    const notificationData = recentNotification?.notification;

    const { data, messageError } = useSWR('/users/message/rooms', fetcher, {
        refreshInterval: 0,
    });

    React.useEffect(() => {
        if (data) {
            setActiveItem(data[activeIndex]);
            setFilterUsers(data);
        }
    }, [data, activeIndex]);

    const toggle = (index) => {
        if (active === index) {
            return setActive(null);
        }
        setActive(index);
    };

    const data2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    return (
        <div>
            <div className="flex items-center gap-4 sm:gap-7 relative">
                {/* bell notification */}
                <button className="relative z-20">
                    <div className="relative">
                        <svg
                            onClick={() => toggle(1)}
                            className={`w-4 h-4 sm:w-5 sm:h-5 hover:text-themePrimary ${
                                active === 1 ? 'text-themePrimary' : ''
                            }`}
                            viewBox="0 0 16 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 11.18V8C13.9986 6.58312 13.4958 5.21247 12.5806 4.13077C11.6655 3.04908 10.3971 2.32615 9 2.09V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V2.09C5.60294 2.32615 4.33452 3.04908 3.41939 4.13077C2.50425 5.21247 2.00144 6.58312 2 8V11.18C1.41645 11.3863 0.910998 11.7681 0.552938 12.2729C0.194879 12.7778 0.00173951 13.3811 0 14V16C0 16.2652 0.105357 16.5196 0.292893 16.7071C0.48043 16.8946 0.734784 17 1 17H4.14C4.37028 17.8474 4.873 18.5954 5.5706 19.1287C6.26819 19.6621 7.1219 19.951 8 19.951C8.8781 19.951 9.73181 19.6621 10.4294 19.1287C11.127 18.5954 11.6297 17.8474 11.86 17H15C15.2652 17 15.5196 16.8946 15.7071 16.7071C15.8946 16.5196 16 16.2652 16 16V14C15.9983 13.3811 15.8051 12.7778 15.4471 12.2729C15.089 11.7681 14.5835 11.3863 14 11.18ZM4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8V11H4V8ZM8 18C7.65097 17.9979 7.30857 17.9045 7.00683 17.7291C6.70509 17.5536 6.45451 17.3023 6.28 17H9.72C9.54549 17.3023 9.29491 17.5536 8.99317 17.7291C8.69143 17.9045 8.34903 17.9979 8 18ZM14 15H2V14C2 13.7348 2.10536 13.4804 2.29289 13.2929C2.48043 13.1054 2.73478 13 3 13H13C13.2652 13 13.5196 13.1054 13.7071 13.2929C13.8946 13.4804 14 13.7348 14 14V15Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="absolute top-0 left-3 transform -translate-y-1/2 w-1.5 h-1.5 border-1 border-white rounded-full bg-themeRedLight"></span>
                    </div>

                    {/*bell  menu here */}
                    <div
                        className={`bg-white fixed md:absolute top-20 md:top-16 w-full md:w-80 pt-3 left-0 right-0 md:-left-32 rounded shadow-xl space-y-2 md:scale-125	overflow-x-auto max-h-96 transition duration-300 ease-in-out ${
                            active === 1
                                ? 'visible opacity-100'
                                : 'opacity-0 invisible'
                        }`}
                    >
                        <div>
                            {notificationData &&
                                _.map(notificationData, (item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 md:gap-5 justify-between py-2 px-4 border-b last-of-type:border-b-0 border-themeGrayLight hover:bg-themeGrayLight/50"
                                    >
                                        <Link href="#">
                                            <a className="text-sm capitalize truncate text-themeBlack">
                                                {/* you have a new message from seller you have a new message
                      from seller */}
                                                {item.message}
                                            </a>
                                        </Link>
                                        <span className="text-xs text-themePrimary whitespace-nowrap	">
                                            {/* 5 hours ago */}
                                            <Moment fromNow>
                                                {item.timestamp}
                                            </Moment>
                                        </span>
                                    </div>
                                ))}
                            {(notificationData?.length === 0 ||
                                !notificationData) && (
                                <div className="flex items-center justify-center pb-4">
                                    <p className="text-base text-themeBlack font-normal">
                                        No Notification
                                    </p>
                                </div>
                            )}
                        </div>
                        {notificationData?.length > 0 && (
                            <div className="flex justify-between items-center px-4 py-2 bg-themeBlackDarker text-themeWhiteLight">
                                <p className="text-sm">
                                    {notificationData?.length} new notification
                                    {notificationData?.length > 1 && 's'}
                                </p>
                                <Link href="/dashboard/notifications">
                                    <a className="text-sm capitalize bg-themePrimary py-0.5 px-3 rounded">
                                        View all
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                </button>

                {/* message notification */}
                <button className="relative z-20">
                    <div className="relative top-0.5">
                        <svg
                            onClick={() => toggle(2)}
                            className={`w-4 h-4 sm:w-5 sm:h-5 hover:text-themePrimary ${
                                active === 2 ? 'text-themePrimary' : ''
                            }`}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 7C9.80222 7 9.60888 7.05865 9.44443 7.16853C9.27998 7.27841 9.15181 7.43459 9.07612 7.61732C9.00043 7.80004 8.98063 8.00111 9.01921 8.19509C9.0578 8.38907 9.15304 8.56725 9.29289 8.70711C9.43275 8.84696 9.61093 8.9422 9.80491 8.98078C9.99889 9.01937 10.2 8.99957 10.3827 8.92388C10.5654 8.84819 10.7216 8.72002 10.8315 8.55557C10.9414 8.39112 11 8.19778 11 8C11 7.73478 10.8946 7.48043 10.7071 7.29289C10.5196 7.10536 10.2652 7 10 7ZM17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H14.59L18.29 19.71C18.3834 19.8027 18.4943 19.876 18.6161 19.9258C18.7379 19.9755 18.8684 20.0008 19 20C19.1312 20.0034 19.2613 19.976 19.38 19.92C19.5626 19.845 19.7189 19.7176 19.8293 19.5539C19.9396 19.3901 19.999 19.1974 20 19V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 16.59L15.71 14.29C15.6166 14.1973 15.5057 14.124 15.3839 14.0742C15.2621 14.0245 15.1316 13.9992 15 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V16.59ZM6 7C5.80222 7 5.60888 7.05865 5.44443 7.16853C5.27998 7.27841 5.15181 7.43459 5.07612 7.61732C5.00043 7.80004 4.98063 8.00111 5.01921 8.19509C5.0578 8.38907 5.15304 8.56725 5.29289 8.70711C5.43275 8.84696 5.61093 8.9422 5.80491 8.98078C5.99889 9.01937 6.19996 8.99957 6.38268 8.92388C6.56541 8.84819 6.72159 8.72002 6.83147 8.55557C6.94135 8.39112 7 8.19778 7 8C7 7.73478 6.89464 7.48043 6.70711 7.29289C6.51957 7.10536 6.26522 7 6 7ZM14 7C13.8022 7 13.6089 7.05865 13.4444 7.16853C13.28 7.27841 13.1518 7.43459 13.0761 7.61732C13.0004 7.80004 12.9806 8.00111 13.0192 8.19509C13.0578 8.38907 13.153 8.56725 13.2929 8.70711C13.4327 8.84696 13.6109 8.9422 13.8049 8.98078C13.9989 9.01937 14.2 8.99957 14.3827 8.92388C14.5654 8.84819 14.7216 8.72002 14.8315 8.55557C14.9414 8.39112 15 8.19778 15 8C15 7.73478 14.8946 7.48043 14.7071 7.29289C14.5196 7.10536 14.2652 7 14 7Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="absolute top-0 left-4 transform -translate-y-1/2 w-1.5 h-1.5 border-1 border-white  rounded-full bg-themeRedLight"></span>
                    </div>

                    {/* message menu here */}
                    <div
                        className={`bg-white fixed md:absolute top-20 md:top-16 w-full md:w-80 left-0 pt-2 right-0 md:-left-32 rounded shadow-xl space-y-2 md:scale-125 overflow-x-auto max-h-96 transition duration-300 ease-in-out ${
                            active === 2
                                ? 'visible opacity-100'
                                : 'opacity-0 invisible'
                        }`}
                    >
                        {/* {data.map((item, index) => ( */}
                        <div>
                            {filterUsers?.length > 0 ? (
                                _.map(filterUsers, (item, index) => {
                                    const isBuyer =
                                        item?.members?.buyer?._id ===
                                        user?.data?._id;
                                    const isSeller =
                                        item?.members?.seller?._id ===
                                        user?.data?._id;
                                    const getTime = new Date(item.time);
                                    const getTimeString =
                                        getTime.toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        });
                                    const latestMessage =
                                        item?.messages?.length > 0
                                            ? item?.messages?.[
                                                  item?.messages?.length - 1
                                              ]?.message
                                            : '';

                                    return (
                                        <>
                                            <div
                                                key={index}
                                                className="flex gap-3 md:gap-5 justify-between py-2 px-4 border-b last-of-type:border-b-0 border-themeGrayLight hover:bg-themeGrayLight/50"
                                            >
                                                <Link href="#">
                                                    <a className="text-sm capitalize truncate text-themeBlack">
                                                        {latestMessage}
                                                    </a>
                                                </Link>
                                                <span className="text-xs text-themePrimary whitespace-nowrap	">
                                                    {getTimeString}
                                                </span>
                                            </div>
                                        </>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center">
                                    <p className="text-base text-themeBlack font-normal">
                                        No Message
                                    </p>
                                </div>
                            )}
                            {(filterUsers?.length === 0 || !filterUsers) && (
                                <div className="flex items-center justify-center pb-4">
                                    <p className="text-base text-themeBlack font-normal">
                                        No Notification
                                    </p>
                                </div>
                            )}
                        </div>
                        {filterUsers?.length > 0 && (
                            <div className="flex justify-between items-center px-4 py-2 bg-themeBlackDarker text-themeWhiteLight">
                                <p className="text-sm">
                                    {' '}
                                    {filterUsers?.length} new message
                                    {filterUsers?.length > 1 && 's'}
                                </p>
                                <Link href="/dashboard/messages">
                                    <a className="text-sm capitalize bg-themePrimary py-0.5 px-3 rounded">
                                        View all
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                </button>

                {/* overlay */}
            </div>
            <div
                onClick={() => setActive(!active)}
                className={`bg-red-500 fixed left-0 right-0 h-screen w-full z-10 opacity-0 ${
                    active ? 'block' : 'hidden'
                }`}
            ></div>
        </div>
    );
};

export default Notification;
