import Link from 'next/link';
import { BsShield } from 'react-icons/bs';
import { HiStar } from 'react-icons/hi';
import { RiBriefcaseLine } from 'react-icons/ri';
import { VscCalendar } from 'react-icons/vsc';
import Rating from 'react-rating';
import useUser from '../../../lib/user';
import Image from '../../../optimize/image';

const UserInfo = () => {
    const { user } = useUser();
    const userData = user?.data;
    const avatarUrl = userData?.avatar
        ? userData?.avatar
        : `https://ui-avatars.com/api/?name=${userData?.fullName?.firstName}&background=random&length=1&size=50`;
    const dateFormate = new Date(userData?.createdAt);
    const date = dateFormate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="bg-white p-10 rounded-xl shadow-boxShadow">
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-6">
                <Image
                    src={avatarUrl}
                    width={120}
                    height={120}
                    alt="Image"
                    className="rounded-full object-center object-cover"
                />

                <div className="grid justify-center sm:justify-start">
                    <p className="font-bold text-base sm:text-xl  text-themeBlackAlt text-center sm:text-left">
                        {userData?.fullName?.firstName}{' '}
                        {userData?.fullName?.lastName}
                    </p>
                    <div className="flex gap-1 justify-center sm:justify-start pt-1">
                        <div>
                            <Rating
                                initialRating={
                                    userData?.ratingDetails?.averageRating
                                }
                                readonly
                                emptySymbol={
                                    <HiStar className="text-themeGrayLight text-base" />
                                }
                                fullSymbol={
                                    <HiStar className="text-themeYellowLight text-base" />
                                }
                            />
                        </div>
                    </div>
                    <Link href="/dashboard/edit-profile">
                        <a className="m-auto sm:m-0">
                            <button className="bg-themePrimary  py-2 px-4 rounded mt-3 text-sm text-white">
                                Edit Profile
                            </button>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="space-y-6 pt-10">
                <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                    <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-themePrimary"
                        >
                            <path
                                d="M16 3C11.043 3 7 7.04297 7 12C7 13.4062 7.57031 15.0195 8.34375 16.7812C9.11719 18.543 10.1133 20.4141 11.125 22.1562C13.1484 25.6445 15.1875 28.5625 15.1875 28.5625L16 29.75L16.8125 28.5625C16.8125 28.5625 18.8516 25.6445 20.875 22.1562C21.8867 20.4141 22.8828 18.543 23.6562 16.7812C24.4297 15.0195 25 13.4062 25 12C25 7.04297 20.957 3 16 3ZM16 5C19.8789 5 23 8.12109 23 12C23 12.8008 22.5703 14.3164 21.8438 15.9688C21.1172 17.6211 20.1133 19.4531 19.125 21.1562C17.5547 23.8672 16.5781 25.3008 16 26.1562C15.4219 25.3008 14.4453 23.8672 12.875 21.1562C11.8867 19.4531 10.8828 17.6211 10.1562 15.9688C9.42969 14.3164 9 12.8008 9 12C9 8.12109 12.1211 5 16 5ZM16 10C14.8945 10 14 10.8945 14 12C14 13.1055 14.8945 14 16 14C17.1055 14 18 13.1055 18 12C18 10.8945 17.1055 10 16 10Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="w-9/12">
                        <p className="text-sm font-bold text-themeBlackAlt">
                            LOCATION
                        </p>
                        <p className="text-lg font-normal text-themeBlackAlt truncate">
                            {userData?.location?.street}{' '}
                            {userData?.location?.city},{' '}
                            {userData?.location?.state}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                    <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                        <RiBriefcaseLine className="h-8 w-8 text-themePrimary" />
                    </div>
                    <div className="w-9/12">
                        <p className="text-sm font-bold text-themeBlackAlt">
                            ACCOUNT
                        </p>
                        <p className="text-lg font-normal text-themeBlackAlt truncate">
                            {userData?.packageDetails?.packageName
                                ? userData?.packageDetails?.packageName
                                : `Basic`}{' '}
                            User
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                    <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                        <BsShield className="h-8 w-8 text-themePrimary" />
                    </div>
                    <div className="w-9/12">
                        <p className="text-sm font-bold text-themeBlackAlt">
                            USER TYPE
                        </p>
                        <p className="text-lg font-normal text-themeBlackAlt truncate">
                            {userData?.isConfirmed
                                ? 'VERIFIED'
                                : 'NON-VERIFIED'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-2 lg:gap-6">
                    <div className="bg-themePrimaryLighter p-4 my-auto rounded-lg">
                        <VscCalendar className="h-8 w-8 text-themePrimary" />
                    </div>
                    <div className="w-9/12">
                        <p className="text-sm font-bold text-themeBlackAlt">
                            MEMBER SINCE
                        </p>
                        <p className="text-lg font-normal text-themeBlackAlt truncate">
                            {date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
