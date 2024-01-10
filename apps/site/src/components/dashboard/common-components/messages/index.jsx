import styled from '@emotion/styled';
import React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import useSWR from 'swr';
import { LoaderPage } from '../../../../lib/loader';
import useUser from '../../../../lib/user';
import ImageOpt from '../../../../optimize/image';
import { authAxios } from '../../../../utils/axiosKits';
import MessageBox from './message-box';

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

const Messages = () => {
    const { user } = useUser();
    const { data, error } = useSWR('/users/message/rooms', fetcher, {
        refreshInterval: 3000,
    });
    const [activeItem, setActiveItem] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [filterUsers, setFilterUsers] = React.useState([]);

    const returnMessage = (id) => {
        if (data) {
            const ChooseMessage = _.filter(data, (item) => {
                return item._id === id;
            });
            setActiveItem(ChooseMessage[0]);
        }
    };

    React.useEffect(() => {
        if (data) {
            setActiveItem(data[activeIndex]);
            setFilterUsers(data);
        }
    }, [data, activeIndex]);

    const searchHandler = (value) => {
        const filtered = _.filter(data, (item) => {
            const values =
                item?.members?.buyer?.fullName?.firstName +
                ' ' +
                item?.members?.buyer?.fullName?.lastName +
                ' ' +
                item?.members?.seller?.fullName?.firstName +
                ' ' +
                item?.members?.seller?.fullName?.lastName +
                ' ' +
                item?.ads?.adTitle;
            return values.toLowerCase().includes(value.toLowerCase());
        });

        if (value === '') {
            setFilterUsers(data);
        } else {
            // update filter message data
            setFilterUsers(filtered);
        }
    };

    return (
        <section className="mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-14 justify-center">
                <div className="col-span-1 mb-4">
                    <div className="bg-white rounded-lg shadow-lg h-full relative">
                        {!data && (
                            <div className="h-80 flex justify-center items-center text-center">
                                <LoaderPage />
                            </div>
                        )}
                        {error && (
                            <div className="h-80 flex justify-center items-center text-center text-lg2">
                                <div>{error?.message}</div>
                            </div>
                        )}
                        {data && !error && (
                            <div className="mx-3">
                                <div className="pt-6 mb-3">
                                    <div className="pt-2 relative text-gray-600 mx-auto">
                                        <input
                                            // className="border-1 border-gray bg-white h-10 px-5 pl-10 pr-16 rounded-lg text-sm focus:outline-none w-full"
                                            className="border-2 border-themeGrayLight bg-white py-2 rounded text-sm focus:outline-none pl-12 pr-3 placeholder:text-themeWhiteAlt w-full text"
                                            type="search"
                                            name="search"
                                            onChange={(e) =>
                                                searchHandler(e.target.value)
                                            }
                                            placeholder="Search"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute left-0 top-0 mt-5 ml-4"
                                        >
                                            <RiSearchLine className="text-xl w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <UsersList>
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
                                                getTime.toLocaleString(
                                                    'en-US',
                                                    {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true,
                                                    },
                                                );
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        returnMessage(
                                                            item?._id,
                                                        );
                                                        setActiveIndex(index);
                                                    }}
                                                    className={`flex cursor-pointer items-center justify-between ${
                                                        activeItem?._id ===
                                                        item._id
                                                            ? 'bg-themePrimary/10'
                                                            : 'hover:bg-themeLighterAlt'
                                                    } py-2.5 px-2.5 sm:px-3 !mb-1 rounded-lg`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative inline-block">
                                                            <ImageOpt
                                                                className="inline-block object-cover rounded-full"
                                                                width={48}
                                                                height={48}
                                                                src={
                                                                    (!isBuyer
                                                                        ? item
                                                                              ?.members
                                                                              ?.buyer
                                                                              ?.avatar
                                                                        : !isSeller &&
                                                                          item
                                                                              ?.members
                                                                              ?.seller
                                                                              ?.avatar) ||
                                                                    'https://via.placeholder.com/48x48'
                                                                }
                                                                alt="Profile image"
                                                            />
                                                            <span className="absolute bottom-1 right-1 inline-block w-3 h-3 bg-themePrimary border-2 border-white rounded-full"></span>
                                                            {/* unActive user profile
                      <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-gray-600 border-2 border-white rounded-full"></span> */}
                                                        </div>

                                                        <div>
                                                            <div className="text-xxs font-medium text-arsenic">
                                                                {!isBuyer
                                                                    ? `${item?.members?.buyer?.fullName?.firstName} ${item?.members?.buyer?.fullName?.lastName}`
                                                                    : !isSeller &&
                                                                      `${item?.members?.seller?.fullName?.firstName} ${item?.members?.seller?.fullName?.lastName}`}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    item?.ads
                                                                        ?.adTitle
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center lg:mt-0">
                                                        <p className="themeDark text-xss1">
                                                            {getTimeString}
                                                        </p>
                                                        <p className="text-xsss float-right mt-2 mx-auto bg-themePrimary text-white w-6 h-6 rounded-full">
                                                            2
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="py-2.5 px-2.5 sm:px-3 mb-3 text-lg2 text-themeLighter text-center">
                                            No Users
                                        </div>
                                    )}
                                </UsersList>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2 mb-4">
                    <div className="bg-white rounded-lg shadow-lg h-full p-8 relative">
                        {!data && (
                            <div className="h- flex justify-center items-center text-center">
                                <LoaderPage />
                            </div>
                        )}
                        {error && (
                            <div className="h-80 flex justify-center items-center text-center text-lg2">
                                <div>{error?.message}</div>
                            </div>
                        )}
                        {data && !error && <MessageBox data={activeItem} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Messages;

const UsersList = styled.div`
    height: calc(100vh - 30vh);
    min-height: calc(100vh - 30vh);
    overflow-y: auto;
    overflow-x: hidden;
    /* scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`;
