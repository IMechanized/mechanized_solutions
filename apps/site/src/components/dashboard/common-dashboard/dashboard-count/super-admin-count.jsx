import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { RiStickyNoteLine } from "react-icons/ri";

const SuperAdminCount = ({ stat }) => {

  const themeData = {
    ads: {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H9C9.26522 12 9.51957 11.8946 9.70711 11.7071C9.89464 11.5196 10 11.2652 10 11V5C10 4.73478 9.89464 4.48043 9.70711 4.29289C9.51957 4.10536 9.26522 4 9 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V11C2 11.2652 2.10536 11.5196 2.29289 11.7071C2.48043 11.8946 2.73478 12 3 12ZM4 6H8V10H4V6ZM13 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H13C12.7348 6 12.4804 6.10536 12.2929 6.29289C12.1054 6.48043 12 6.73478 12 7C12 7.26522 12.1054 7.51957 12.2929 7.70711C12.4804 7.89464 12.7348 8 13 8ZM13 18H3C2.73478 18 2.48043 18.1054 2.29289 18.2929C2.10536 18.4804 2 18.7348 2 19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H13C13.2652 20 13.5196 19.8946 13.7071 19.7071C13.8946 19.5196 14 19.2652 14 19C14 18.7348 13.8946 18.4804 13.7071 18.2929C13.5196 18.1054 13.2652 18 13 18ZM21 14H3C2.73478 14 2.48043 14.1054 2.29289 14.2929C2.10536 14.4804 2 14.7348 2 15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14ZM21 10H13C12.7348 10 12.4804 10.1054 12.2929 10.2929C12.1054 10.4804 12 10.7348 12 11C12 11.2652 12.1054 11.5196 12.2929 11.7071C12.4804 11.8946 12.7348 12 13 12H21C21.2652 12 21.5196 11.8946 21.7071 11.7071C21.8946 11.5196 22 11.2652 22 11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10Z"
            fill="white"
          />
        </svg>
      ),
      bg: "bg-themePrimary",
    },
    seller: {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 20.9984V18.9984C20.9949 18.1156 20.6979 17.2592 20.1553 16.5628C19.6126 15.8664 18.8548 15.3691 18 15.1484"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bg: "bg-themeSecondary",
    },
    buyer: {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 20.9984V18.9984C20.9949 18.1156 20.6979 17.2592 20.1553 16.5628C19.6126 15.8664 18.8548 15.3691 18 15.1484"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bg: "bg-themeRedLight",
    },
    feature: {
      icon: <RiStickyNoteLine className="w-6 h-6 text-white" />,
      bg: "bg-themeGreenLight",
    },
    favourite: {
      icon: <FaRegHeart className="w-6 h-6 text-white" />,
      bg: "bg-themeYellowLight",
    },
  };


  return (
    <>
      <div

        className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-5 bg-white p-6 rounded-xl shadow-boxShadow"
      >
        <div
          className={`rounded-lg w-12 h-12 flex items-center justify-center ${stat?.title == 'Total Ads' ? themeData.ads.bg : stat?.title == 'Total Sellers' ? themeData.seller.bg : stat?.title == 'Total Buyers' ? themeData.buyer.bg : stat?.title == 'Feature Ads' ? themeData.feature.bg : stat?.title == 'Favourite Ads' ? themeData.favourite.bg : 'bg-themePrimary'}`}
        >
          {stat?.title == 'Total Ads' && themeData.ads.icon}
          {stat?.title == 'Total Sellers' && themeData.seller.icon}
          {stat?.title == 'Total Buyers' && themeData.buyer.icon}
          {stat?.title == 'Feature Ads' && themeData.feature.icon}
          {stat?.title == 'Favourite Ads' && themeData.favourite.icon}
        </div>
        <div>
          <span className="text-sm font-normal text-themeBlackDarker">
            {stat?.title}
          </span>
          <p className="text-base sm:text-xl font-bold text-themePrimary">
            {stat?.count}
          </p>
        </div>
      </div>
    </>
  );
};

export default SuperAdminCount;