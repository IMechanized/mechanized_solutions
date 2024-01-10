import _ from 'lodash';
import Link from "next/link";
import React from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

// const preview = [
//   {
//     id: 1,
//     name: "Validity",
//     value: "30 Days",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 2,
//     name: "Ads",
//     value: "10",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 3,
//     name: "Featured Ads",
//     value: "3",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 4,
//     name: "No Of Images",
//     value: "3",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 5,
//     name: "Allow Bidding",
//     value: "1",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 6,
//     name: "Allow Tags",
//     value: "Yes",
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 7,
//     name: "Categories",
//     value: "All",
//     icon: (
//       <FaRegTimesCircle className="text-xl sm:text-2xl text-themeRedLight" />
//     ),
//   },
// ];

const InstantPreview = ({ featurePreview }) => {
  return (
    <section>
      <div className="text-center">
        <h1 className={`text-3xl font-bold ${featurePreview?.packageColor === "Primary" ? "text-themePrimary" : "text-themeSecondary"} pt-2 uppercase`}>{featurePreview.packageName}</h1>
        <h2 className="text-4xl font-bold text-themePrimary pt-6">
          {featurePreview?.currency == "USD" && <span>$</span>}
          {featurePreview?.currency == "EUR" && <span>€</span>}
          {featurePreview?.currency == "GBP" && <span>£</span>}
          {featurePreview.pricing}
        </h2>
        <p className="text-base font-normal text-themeGrayWhite pt-1 lowercase">
          per {featurePreview.frequency}
        </p>
      </div>
      <ul className="space-y-5 pt-7">
        <li className="flex items-center gap-6 relative">
          <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
          <span className="text-base sm:text-lg font-normal text-themeBlackDarker">
            Validity
          </span>
          <p className="text-base sm:text-lg font-semibold text-themeBlackDarker absolute right-0">
            {featurePreview.validity} Days
          </p>
        </li>
        <li className="flex items-center gap-6 relative">
          <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
          <span className="text-base sm:text-lg font-normal text-themeBlackDarker">
            Ads
          </span>
          <p className="text-base sm:text-lg font-semibold text-themeBlackDarker absolute right-0">
            {featurePreview.totalAds}
          </p>
        </li>
        <li className="flex items-center gap-6 relative">
          <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
          <span className="text-base sm:text-lg font-normal text-themeBlackDarker">
            Featured Ads
          </span>
          <p className="text-base sm:text-lg font-semibold text-themeBlackDarker absolute right-0">
            {featurePreview.featuredAds}
          </p>
        </li>

        {_.map(featurePreview?.featureDatas, (item, index) => (
          <li key={index} className="flex items-center gap-6 relative">
            {item?.active ?
              <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
              :
              <FaRegTimesCircle className="text-xl sm:text-2xl text-themeRedLight" />
            }
            <span className="text-base sm:text-lg font-normal text-themeBlackDarker">
              {item.name}
            </span>
            <p className="text-base sm:text-lg font-semibold text-themeBlackDarker absolute right-0">
              {item.details}
            </p>
          </li>
        ))}
      </ul>
      <div className="pt-10 text-center w-full">
        <Link href="/">
          <a>
            <button className={`text-base font-semibold text-white rounded ${featurePreview?.packageColor === "Primary" ? "bg-themePrimary" : "bg-themeSecondary"} py-4 w-10/12`}>
              Upgrade
            </button>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default InstantPreview;