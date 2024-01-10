import _ from "lodash";
import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import Skeleton from 'react-loading-skeleton';
import useSWR from "swr";
import { Axios } from "../../../utils/axiosKits";

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const priccingAPI = "/package/ads"

const Pricing = () => {
  const { data: pricingData, error: pricingError } = useSWR(priccingAPI, fetcher)
  return (
    <section className="pt-14 sm:pt-28 px-5 sm:px-0">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-themeBlackAlt">
            Pricing <span className="text-themeSecondary">Plan</span>
          </h2>
          <p className="text-lg text-themeBlackAlt md:w-[38%] w-full mx-auto mt-5">
            Lorem ipsum the dit adipiscing Aenean adicinging kiliuy scope mentin
            scope mentin. scope mentin aenan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-14">
          {/* loding skeleton */}
          {!pricingData && !pricingError && (
            _.map([1, 2, 3], (item, index) => (
              <div key={index} className="py-12 px-10 border rounded-2xl text-center">
                <h3 className="mb-6"><Skeleton width={80} /></h3>
                <h2 className="text-4xl font-bold">
                  <Skeleton width={50} />
                </h2>
                <p className="mb-6"><Skeleton width={60} /></p>
                <ul className="mb-5">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </ul>
                <button className="w-48 h-14 rounded-md">
                  <Skeleton height={60} />
                </button>
              </div>
            ))
          )}

          {pricingData && !pricingError && (
            _.map(pricingData, (item, index) => (
              <div key={index} className="py-12 px-10 border rounded-2xl text-center transition-all duration-300 ease-in-out hover:shadow-card">
                <h3 className={`font-bold text-3xl uppercase ${item?.packageColor == 'Secondary' ? `text-themeSecondary` : `text-themePrimary`} mb-6`}>{item?.packageName}</h3>
                <h2 className="text-4xl font-bold text-themePrimary">
                  {item?.currency == "USD" && <span>$</span>}
                  {item?.currency == "EUR" && <span>€</span>}
                  {item?.currency == "GBP" && <span>£</span>}
                  {item?.pricing}
                </h2>
                <p className="text-themeGrayWhite mb-6 lowercase">per {item?.frequency}</p>

                <ul>
                  <li className="flex items-center space-x-6 mb-5 relative">
                    <FiCheckCircle className="text-lg sm:text-2xl text-themePrimary" />
                    <p className="text-sm sm:text-lg text-themeBlackAlt">
                      Validity
                    </p>
                    <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
                      {item?.validity} Days
                    </p>
                  </li>
                  <li className="flex items-center space-x-6 mb-5 relative">
                    <FiCheckCircle className="text-lg sm:text-2xl text-themePrimary" />
                    <p className="text-sm sm:text-lg text-themeBlackAlt">
                      Ads
                    </p>
                    <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
                      {item?.totalAds}
                    </p>
                  </li>
                  <li className="flex items-center space-x-6 mb-5 relative">
                    <FiCheckCircle className="text-lg sm:text-2xl text-themePrimary" />
                    <p className="text-sm sm:text-lg text-themeBlackAlt">
                      Featured Ads
                    </p>
                    <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
                      {item?.featuredAds}
                    </p>
                  </li>
                  {
                    _.map(item?.services, (service, index) => (
                      <li key={index} className="flex items-center justify-start space-x-6 mb-5 relative">
                        {service.active ? <FiCheckCircle className="text-lg sm:text-2xl text-themePrimary" /> : <FaRegTimesCircle className="text-lg sm:text-2xl text-themeRedLight" />}
                        <p className="text-sm sm:text-lg text-themeBlackAlt">
                          {service?.name}
                        </p>
                        <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
                          {service?.details}
                        </p>
                      </li>
                    ))
                  }
                </ul>

                <button className={`font-semibold text-white w-48 h-14 rounded-md ${item?.packageColor == 'Secondary' ? `bg-themeSecondary` : `bg-themePrimary`} `}>
                  Upgrade
                </button>
              </div>
            ))
          )}
        </div>

        {pricingError && (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-16 mt-0">
            <div className="text-center">Error! {pricingError?.message}</div>
          </div>
        )}

        {pricingData?.length == 0 && (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-16 mt-0 text-center ">
            <h3 className="text-3xl font-semibold pt-10 pb-40">
              No Data Found
            </h3>
          </div>
        )}

      </div>
    </section>
  );
};

export default Pricing;
