import styled from '@emotion/styled';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import Moment from 'react-moment';
import { useToasts } from 'react-toast-notifications';
import { useSWRConfig } from 'swr';
import useUser from '../../../../lib/user';
import ImageOpt from '../../../../optimize/image';
import { authAxios } from '../../../../utils/axiosKits';

const MessageBox = ({ data }) => {
    const { user, isSeller, isAdmin, isSuperAdmin } = useUser();
    const adminEntry = isAdmin || isSuperAdmin;
    const { mutate } = useSWRConfig({
        refreshInterval: 0,
    });
    const { addToast } = useToasts();
    const [filter, setFilterData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const isBuyer = data?.members?.buyer?._id === user?.data?._id;
    const Seller = data?.members?.seller?._id === user?.data?._id;
    const { register, handleSubmit, watch, reset } = useForm({
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (data) setFilterData(data.messages);
    }, [data]);

    const onSendMessage = async (item) => {
        setLoading(true);
        const date = new Date();
        const newData = {
            sender: user?.data?._id,
            reciver:
                user?.data?._id === data?.members?.buyer?._id
                    ? data?.members?.seller?._id
                    : data?.members?.buyer?._id,
            message: item?.message,
            timestamp: date,
        };
        try {
            await authAxios({
                method: 'PUT',
                url: `/users/message/room/${data?._id}`,
                data: newData,
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    mutate(`/users/message/rooms`).then(() => {
                        addToast('Message sent', {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        reset();
                    });
                }
            });
        } catch (error) {
            addToast('Error sending message', {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        }
    };

    // sort messages by timestamp
    const sortedMessages = _.sortBy(filter, (item) => {
        const date = new Date(item?.timestamp);
        return date.getTime() * -1;
    });

    const searchHandler = (value) => {
        const filtered = _.filter(data?.messages, (item) => {
            return item.message.toLowerCase().includes(value.toLowerCase());
        });

        if (value === '') {
            setFilterData(data?.messages);
        } else {
            // update filter message data
            setFilterData(filtered);
        }
    };

    return (
        <div className="grid content-between h-full">
            {!data && (
                <div className="text-lg2 text-themeLighter h-52 grid justify-center items-center">
                    No Messages
                </div>
            )}
            {data && (
                <>
                    {/* header bar */}
                    <div className="flex justify-between flex-wrap border-b border-themeLighter !pb-3">
                        <div className="flex flex-wrap items-center gap-x-4">
                            <div>
                                <ImageOpt
                                    width={48}
                                    height={48}
                                    alt="image"
                                    className="inline-block object-cover rounded-full"
                                    src={
                                        (!isBuyer
                                            ? data?.members?.buyer?.avatar
                                            : !Seller &&
                                              data?.members?.seller?.avatar) ||
                                        'https://via.placeholder.com/48x48'
                                    }
                                />
                            </div>
                            <div className="grid gap-1 sm:gap-0">
                                <div className="flex gap-2 items-center">
                                    <p className="text-xl font-bold text-themeDark leading-8">
                                        {!isBuyer
                                            ? `${data?.members?.buyer?.fullName?.firstName} ${data?.members?.buyer?.fullName?.lastName}`
                                            : !Seller &&
                                              `${data?.members?.seller?.fullName?.firstName} ${data?.members?.seller?.fullName?.lastName}`}
                                    </p>
                                    {/* <span className="text-xs font-normal text-deep border-l-2 border-deep pl-2">
                Last seen: 9 hours ago
              </span>
              <span className="">
                <HiOutlineStar className="text-deep" />
              </span> */}
                                </div>
                                {data?.job && (
                                    <p className="text-themePrimary font-normal text-xxs">
                                        {data?.job?.jobTitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center relative my-2 w-auto">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                onChange={(e) => searchHandler(e.target.value)}
                                // className="bg-themeLighterAlt rounded-lg border-0 h-12 w-full px-5 focus:outline-none "
                                className="border-2 border-themeGrayLight bg-white py-2 rounded text-sm focus:outline-none pl-12 pr-3 placeholder:text-themeWhiteAlt w-full text"
                            />
                            <div className="absolute px-3">
                                <FiSearch className="text-lg text-gray-600" />
                            </div>
                        </div>
                    </div>
                    {/*end header bar */}

                    <div className="flex flex-col bg-white">
                        {/* message box area    */}
                        <MessagesContents
                            id="chat"
                            className="flex mt-2 flex-col-reverse space-y-3 pb-3 pr-4"
                        >
                            {sortedMessages?.length > 0 ? (
                                _.map(sortedMessages, (item, index) => {
                                    const isSender =
                                        item?.sender === user?.data?._id;
                                    return isSeller || adminEntry ? (
                                        isSender ? (
                                            <From
                                                item={item}
                                                image={
                                                    user?.data?.avatar ||
                                                    'https://via.placeholder.com/48x48'
                                                }
                                                key={index}
                                            />
                                        ) : (
                                            <To
                                                item={item}
                                                image={
                                                    data?.members?.buyer
                                                        ?.avatar ||
                                                    'https://via.placeholder.com/48x48'
                                                }
                                                key={index}
                                            />
                                        )
                                    ) : isSender ? (
                                        <From
                                            item={item}
                                            image={
                                                user?.data?.avatar ||
                                                'https://via.placeholder.com/48x48'
                                            }
                                            key={index}
                                        />
                                    ) : (
                                        <To
                                            item={item}
                                            image={
                                                data?.members?.seller?.avatar ||
                                                'https://via.placeholder.com/48x48'
                                            }
                                            key={index}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-lg2 text-themeLighter h-52 grid justify-center items-center">
                                    No Messages
                                </div>
                            )}
                            {/* date line */}
                            {/* <ChatDate item={{}} /> */}
                        </MessagesContents>
                        {/* end message box area    */}

                        {/* send box area */}

                        <form
                            onSubmit={handleSubmit(onSendMessage)}
                            className="relative"
                        >
                            {loading && (
                                <div className="flex items-center absolute left-2 -top-4 justify-start">
                                    <div className="spinner-grow w-4 h-4 text-themePrimary" />
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3 items-center bottom-0 my-2 w-full">
                                {/* Image upload icon hidden */}
                                {/* <div>
                <button
                  className="flex  items-center justify-center h-12 w-12 rounded-full 
                   text-white focus:outline-none border border-themeDark"
                >
                  <FiImage className="text-xl text-themeDark" />
                </button>
              </div> */}
                                <div className={`w-full`}>
                                    <textarea
                                        id="message"
                                        disabled={loading}
                                        placeholder="Type your message here"
                                        {...register('message', {
                                            required: {
                                                value: true,
                                                message: 'Message is required',
                                            },
                                        })}
                                        className={`border-gray h-20 border !px-4 !py-3 rounded-lg w-full focus:outline-none text-sm items-center`}
                                    />
                                    {/* emoji icon hidden */}
                                    {/* <div className="flex flex-row">
                  <button
                    id="capture"
                    className="focus:outline-none flex items-center justify-center h-10 w-8 ml-1 mr-2"
                  >
                    <HiOutlineEmojiHappy className="text-lg" />
                  </button>
                </div> */}
                                </div>
                                {/* send button */}
                                {watch('message') && (
                                    <div>
                                        <button
                                            button="submit"
                                            disabled={loading}
                                            className="flex items-center justify-center h-11 w-11 rounded-full bg-themePrimary text-white focus:outline-none"
                                        >
                                            <AiOutlineSend className="text-lg text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                        {/* end send box area */}
                    </div>
                </>
            )}
        </div>
    );
};

const To = ({ item, image }) => {
    return (
        <div className="flex flex-lg-nowrap flex-wrap-reverse justify-start items-start gap-x-4 gap-y-2 mr-auto pb-4">
            <div className="block w-12">
                <ImageOpt
                    width={48}
                    height={48}
                    alt="image"
                    className="inline-block object-cover rounded-full"
                    src={image ? image : 'https://via.placeholder.com/48x48'}
                />
            </div>
            <div className="w-fit">
                <p className="!py-2 !px-3 bg-slate-200 text-themeDarker rounded-lg">
                    {item?.message ?? ''}
                </p>
                {item?.timestamp && (
                    <span className="text-xsss font-normal text-deep">
                        <Moment fromNow>{item?.timestamp}</Moment>
                    </span>
                )}
            </div>
        </div>
    );
};

const From = ({ item, image }) => {
    return (
        <div className="flex flex-lg-nowrap flex-wrap-reverse justify-end items-start gap-x-4 gap-y-2 ml-auto pb-4">
            <div className="w-fit">
                <p className="!py-2 !px-3 bg-themePrimary text-white rounded-lg">
                    {item?.message ?? ''}
                </p>
                {item?.timestamp && (
                    <span className="text-xsss w-fit font-normal text-deep">
                        <Moment fromNow>{item?.timestamp}</Moment>
                    </span>
                )}
            </div>
            <div className="block w-12">
                <ImageOpt
                    width={48}
                    height={48}
                    alt="image"
                    className="block object-cover rounded-full"
                    src={`${
                        image ? image : 'https://via.placeholder.com/48x48'
                    }`}
                />
            </div>
        </div>
    );
};

export default MessageBox;
const MessagesContents = styled.div`
    height: calc(100vh - 48vh);
    min-height: calc(100vh - 48vh);
    overflow-y: auto;
    overflow-x: hidden;
    /* scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`;
