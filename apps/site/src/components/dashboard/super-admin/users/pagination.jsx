import React from 'react';

const Pagination = () => {
    return (
        <div className="flex gap-1 items-center text-center ">
        <button
          className="text-base font-normal text-themeWhiteLow hover:text-white bg-white shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          1
        </button>
        <button
          className="text-base font-normal text-white hover:text-white bg-themePrimary shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          2
        </button>
        <button
          className="text-base font-normal text-themeWhiteLow hover:text-white bg-white shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          3
        </button>
        <button
          className="text-base font-normal text-themeWhiteLow hover:text-white bg-white shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          4
        </button>
        <button
          className="text-base font-normal text-themeWhiteLow hover:text-white bg-white shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          ...
        </button>
        <button
          className="text-base font-normal text-themeWhiteLow hover:text-white bg-white shadow py-2 px-4 hover:bg-themePrimary rounded-lg"
        >
          6
        </button>
      </div>
    );
};

export default Pagination;