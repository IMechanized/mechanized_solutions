import React from 'react';
import { FaRegHeart } from "react-icons/fa";

const BuyerCount = ({ stat }) => {
  return (
    <>
      <div
        className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-5 bg-white p-6 rounded-xl shadow-boxShadow"
      >
        <div
          className={`rounded-lg w-12 h-12 flex items-center justify-center bg-themeYellowLight`}
        >
          <FaRegHeart className="w-6 h-6 text-white" />
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

export default BuyerCount;