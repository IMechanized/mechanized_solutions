import _ from 'lodash';
import React from 'react';
import useSWR from 'swr';
import useUser from '../../../lib/user';
import Image from '../../../optimize/image';
import { authAxios } from '../../../utils/axiosKits';

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

const Messages = ({ refreshInterval }) => {
    const [activeItem, setActiveItem] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [filterUsers, setFilterUsers] = React.useState([]);

    const { user } = useUser();

    const { data, error } = useSWR('/users/message/rooms', fetcher, {
        refreshInterval: 0,
    });

    React.useEffect(() => {
        if (data) {
            setActiveItem(data[activeIndex]);
            setFilterUsers(data);
        }
    }, [data, activeIndex]);

    return (
        <div className="bg-white p-7 rounded-xl shadow-boxShadow ">
            <h1 className="text-xl font-bold text-themeBlackDarker">
                Latest Message
            </h1>
            <div className="pt-6 space-y-1 overflow-auto  h-[489px]">
                {/* {data.map((item, index) => ( */}
                {filterUsers?.length > 0 ? (
                    _.map(filterUsers, (item, index) => {
                        const isBuyer =
                            item?.members?.buyer?._id === user?.data?._id;
                        const isSeller =
                            item?.members?.seller?._id === user?.data?._id;
                        const getTime = new Date(item.time);
                        const getTimeString = getTime.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        });
                        const latestMessage =
                            item?.messages?.length > 0
                                ? item?.messages?.[item?.messages?.length - 1]
                                      ?.message
                                : '';

                        return (
                            <div
                                key={index}
                                className="flex gap-4 bg-themeWhiteLight p-5 rounded "
                            >
                                <Image
                                    // src={'/NavPhoto.png'}
                                    src={
                                        (!isBuyer
                                            ? item?.members?.buyer?.avatar
                                            : !isSeller &&
                                              item?.members?.seller?.avatar) ||
                                        'https://via.placeholder.com/48x48'
                                    }
                                    width={50}
                                    height={50}
                                    layout="fixed"
                                    alt="user"
                                />
                                <div className="overflow-hidden w-11/12">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base text-themeBlackDarker font-normal">
                                            {/* Buyer Name */}
                                            {!isBuyer
                                                ? `${item?.members?.buyer?.fullName?.firstName} ${item?.members?.buyer?.fullName?.lastName}`
                                                : !isSeller &&
                                                  `${item?.members?.seller?.fullName?.firstName} ${item?.members?.seller?.fullName?.lastName}`}
                                        </p>
                                        <span className="text-xs font-normal text-themeGrayWhite">
                                            {/* 1h ago */}
                                            {getTimeString}
                                        </span>
                                    </div>
                                    <p className="text-sm font-normal text-themeWhiteLighter truncate">
                                        {/* Message Text Lorem Ipsum is simplte Dummy */}
                                        {latestMessage}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex items-center justify-center">
                        <p className="text-base text-themeBlackDarker font-normal">
                            No Message
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
