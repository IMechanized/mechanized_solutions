import useSWR from 'swr';
import Image from '../../../optimize/image';
import { Axios } from '../../../utils/axiosKits';
import Search from '../search/index';

const fetcher = (url) => Axios(url).then((res) => res.data.data);

const Header = () => {
    const { data: totalCountData, error: totalCountError } = useSWR(
        '/public/totalcount',
        fetcher,
        {
            refreshInterval: 0,
        },
    );

    return (
        <header className="relative bg-gradient-to-b from-white to-themePrimary/10 overflow-hidden pt-12 xl:pt-0">
            <div className="container mx-auto  ">
                <div className="grid grid-cols-2 items-center justify-between z-20 relative px-5 sm:px-0">
                    <div className="col-span-2 lg:col-span-1 w-full ">
                        <h1 className="text-3xl lg:text-5xl  text-themeBlackAlt mt-16 mb-7 text-center sm:text-left font-bold">
                            {' '}
                            <span className="text-themeSecondary leading-tight	">
                                Mechanized
                            </span>{' '}
                            Solutions
                        </h1>
                        <p className="text-themeWhiteLighter text-lg lg:text-xl pb-11">
                            Welcome to Mechanized Solutions – your one-stop destination for cutting-edge mechanization equipment,
                            including top-tier agricultural machinery. Elevate your industrial processes with our high-performance solutions,
                            carefully curated for efficiency and precision. Explore the future of advanced mechanization with us – where innovation meets quality.
                        </p>

                        <Search />

                        <div className="pt-16 pb-14 grid sm:flex justify-center items-center sm:justify-between">
                            <div>
                                <div className="flex justify-center items-center space-x-2">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-themeSecondary"
                                    >
                                        <path
                                            d="M26.6667 5.33301H5.33333C4.59695 5.33301 4 5.92996 4 6.66634V19.9997C4 20.7361 4.59695 21.333 5.33333 21.333H26.6667C27.403 21.333 28 20.7361 28 19.9997V6.66634C28 5.92996 27.403 5.33301 26.6667 5.33301Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.33331 26.667H22.6666"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 21.333V26.6663"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M20 21.333V26.6663"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.6667 16.0003L14.6667 12.0003L17.3334 14.667L21.3334 10.667"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h4 className="text-2xl font-bold text-themePrimary">
                                        {totalCountData?.totalAds
                                            ? totalCountData.totalAds
                                            : '00'}
                                        {/* 10K */}
                                    </h4>
                                </div>
                                <p className="font-semibold text-lg text-themePrimary pt-2 sm:pt-0 text-center">
                                    Active Ads
                                </p>
                            </div>
                            <span className="border-t  border-themePrimary mt-2 sm:border h-6 sm:h-16 opacity-30"></span>
                            <div>
                                <div className="flex justify-center items-center space-x-2">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-themeSecondary"
                                    >
                                        <path
                                            d="M12 14.6667C14.9455 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9455 4 12 4C9.0545 4 6.66669 6.38781 6.66669 9.33333C6.66669 12.2789 9.0545 14.6667 12 14.6667Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 28V25.3333C4 23.9188 4.5619 22.5623 5.5621 21.5621C6.56229 20.5619 7.91885 20 9.33333 20H14.6667C16.0812 20 17.4377 20.5619 18.4379 21.5621C19.4381 22.5623 20 23.9188 20 25.3333V28"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21.3333 14.6667L24 17.3333L29.3333 12"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <h4 className="font-bold text-themePrimary text-2xl">
                                        {totalCountData?.totalSellers
                                            ? totalCountData.totalSellers
                                            : '00'}
                                        {/* 2K */}
                                    </h4>
                                </div>
                                <p className="font-semibold text-lg text-themePrimary pt-2 sm:pt-0 text-center">
                                    Active Sellers
                                </p>
                            </div>
                            <span className="border-t sm:border border-themePrimary mt-2 h-6 sm:h-16 opacity-30"></span>

                            <div>
                                <div className="flex justify-center items-center space-x-2">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-themeSecondary"
                                    >
                                        <path
                                            d="M12 14.6667C14.9455 14.6667 17.3333 12.2789 17.3333 9.33333C17.3333 6.38781 14.9455 4 12 4C9.05447 4 6.66666 6.38781 6.66666 9.33333C6.66666 12.2789 9.05447 14.6667 12 14.6667Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 28V25.3333C4 23.9188 4.5619 22.5623 5.5621 21.5621C6.56229 20.5619 7.91885 20 9.33333 20H14.6667C16.0812 20 17.4377 20.5619 18.4379 21.5621C19.4381 22.5623 20 23.9188 20 25.3333V28"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21.3333 4.17285C22.4806 4.46659 23.4974 5.13379 24.2235 6.06927C24.9497 7.00474 25.3438 8.15529 25.3438 9.33952C25.3438 10.5237 24.9497 11.6743 24.2235 12.6098C23.4974 13.5452 22.4806 14.2125 21.3333 14.5062"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M28 28.0002V25.3335C27.9932 24.1564 27.5972 23.0146 26.8737 22.0861C26.1502 21.1575 25.1398 20.4945 24 20.2002"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h4 className="text-2xl font-bold text-themePrimary">
                                        {totalCountData?.totalUser
                                            ? totalCountData.totalUser
                                            : '00'}

                                        {/* 50K */}
                                    </h4>
                                </div>
                                <p className="font-semibold text-lg text-themePrimary pt-2 sm:pt-0 text-center">
                                    Total Customers
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 hidden lg:block lg:mt-20 xl-mt-0">
                        <Image
                            src={`/HeaderImage.png`}
                            width={826}
                            height={840}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* <!-- Bottom Mask --> */}
            <div className="hidden lg:block absolute left-0 bottom-0">
                <svg
                    width="160"
                    height="360"
                    viewBox="0 0 160 360"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-themePrimary"
                >
                    <path
                        d="M-245.521 -92.7664C-210.581 -117.982 -163.419 -117.982 -128.479 -92.7664L117.931 85.0648C143.979 103.863 159.41 134.03 159.41 166.153V563.847C159.41 595.97 143.979 626.137 117.931 644.935L-128.479 822.766C-163.419 847.982 -210.581 847.982 -245.521 822.766L-491.931 644.935C-517.979 626.137 -533.41 595.97 -533.41 563.847V166.153C-533.41 134.03 -517.979 103.863 -491.931 85.0648L-245.521 -92.7664Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            {/* <!-- Top Mask --> */}

            <div className="hidden lg:block absolute -top-28 right-0">
                <svg
                    width="760"
                    height="870"
                    viewBox="0 0 760 870"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-themePrimary"
                >
                    <mask
                        id="mask0_787_4095"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="760"
                        height="870"
                    >
                        <rect width="760" height="870" fill="#EDB5B5" />
                    </mask>
                    <g mask="url(#mask0_787_4095)">
                        <path
                            d="M741 -996.831C818.35 -1041.49 913.65 -1041.49 991 -996.831L1607.03 -641.169C1684.38 -596.511 1732.03 -513.979 1732.03 -424.662V286.662C1732.03 375.979 1684.38 458.511 1607.03 503.169L991 858.831C913.65 903.489 818.35 903.489 741 858.831L124.975 503.169C47.6244 458.511 -0.0253906 375.979 -0.0253906 286.662V-424.662C-0.0253906 -513.979 47.6243 -596.511 124.975 -641.169L741 -996.831Z"
                            fill="currentColor"
                        />
                        <circle
                            opacity="0.8"
                            cx="184"
                            cy="256"
                            r="4"
                            fill="white"
                        />
                        <circle
                            opacity="0.8"
                            cx="630"
                            cy="412"
                            r="4"
                            fill="white"
                        />
                        <circle
                            opacity="0.4"
                            cx="319"
                            cy="228"
                            r="8"
                            fill="white"
                        />
                        <circle
                            opacity="0.4"
                            cx="638"
                            cy="614"
                            r="8"
                            fill="white"
                        />
                        <circle
                            opacity="0.4"
                            cx="719"
                            cy="299"
                            r="8"
                            fill="white"
                        />
                        <circle
                            opacity="0.6"
                            cx="194"
                            cy="422"
                            r="6"
                            fill="white"
                        />
                        <circle
                            opacity="0.6"
                            cx="733"
                            cy="502"
                            r="6"
                            fill="white"
                        />
                        <circle cx="303" cy="370" r="2" fill="white" />
                        <circle cx="573" cy="203" r="2" fill="white" />
                    </g>
                </svg>
            </div>
        </header>
    );
};

export default Header;
