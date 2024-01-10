import _ from 'lodash';
import React from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import ImageToggle from './Toggle-item/image-toggle';

// const tableItem = [
//   {
//     id: 4,
//     name: "No Of Images",
//     value: "3",
//     toggle: <ImageToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 5,
//     name: "Allow Bidding",
//     value: "1",
//     toggle: <BiddingToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 6,
//     name: "Allow Tags",
//     value: "Yes",
//     toggle: <TagToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 7,
//     name: "Categories",
//     value: "Yes",
//     toggle: <CategoriesToggle />,
//     icon: (
//       <FaRegTimesCircle className="text-xl sm:text-2xl text-themeRedLight" />
//     ),
//   },
// ];

// const tableItem = [
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
//     toggle: <ImageToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 5,
//     name: "Allow Bidding",
//     value: "1",
//     toggle: <BiddingToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 6,
//     name: "Allow Tags",
//     value: "Yes",
//     toggle: <TagToggle />,
//     icon: <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />,
//   },
//   {
//     id: 7,
//     name: "Categories",
//     value: "Yes",
//     toggle: <CategoriesToggle />,
//     icon: (
//       <FaRegTimesCircle className="text-xl sm:text-2xl text-themeRedLight" />
//     ),
//   },
// ];

const PackageTable = ({ register, errors, features, setFeatures, setFeatureTitle, setFeatureText, featurePreview, setFeaturePreview }) => {
  const [state, setState] = React.useState(false);
  const featureData = features?.featureData

  // const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  const handleRemoveFeature = (name) => {
    const newData = featureData.filter((i) => i.name !== name);
    setFeatures({ featureData: newData });
  };

  const handleEditFeature = (item) => {
    const newData = featureData.filter((i) => i.name !== item?.name);
    setFeatures({ featureData: newData });
    setFeatureTitle(item?.name);
    setFeatureText(item?.details);
  };

  return (
    <div className="pt-8">
      <div className=" py-2 md:inline-block w-[99%] lg:w-full overflow-x-auto xl:overflow-visible">
        <table className="w-full">
          <tbody>

            {/* validity */}
            <tr className="bg-white mb-3 border-b border-themeGrayBorder  pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
              <td className="py-4 text-sm font-normal text-themeBlackAlt pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                <div className="flex gap-8 sm:gap-14">
                  <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
                  <p className="text-lg font-normal text-themeBlackDarker">
                    Validity
                  </p>
                </div>
              </td>
              {/* <td className="text-lg text-themeBlackDarker font-semibold py-4 pl-8 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap 2xl:w-44"> */}
              <td className="text-lg text-themeBlackDarker font-semibold  pl-8 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap 2xl:w-44">
                <div className="w-full sm:w-4/12">
                  <label className="w-full" htmlFor="">
                    <input
                      type="text"
                      className="py-1 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeGrayWhite placeholder:text-sm w-full"
                      placeholder="30"
                      name="validity"
                      {...register("validity", { required: true })}
                      onChange={(e) => {
                        setFeaturePreview({
                          ...featurePreview,
                          ["validity"]: e.target.value,
                        });
                      }}
                    /> Days
                    {errors.validity && (
                      <span className="ml-2 text-red-400 text-sm italic">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </td>
              {/* <td className="py-4 pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">A</td> */}
              {/* <td className="py-4 pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                <div className="flex items-center gap-3">
                </div>
              </td> */}
            </tr>

            {/* total Ads */}
            <tr className="bg-white mb-3 border-b border-themeGrayBorder  pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
              <td className="py-4 text-sm font-normal text-themeBlackAlt pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                <div className="flex gap-8 sm:gap-14">
                  <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
                  <p className="text-lg font-normal text-themeBlackDarker">
                    Ads
                  </p>
                </div>
              </td>
              <td className="text-lg text-themeBlackDarker font-semibold  pl-8 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap 2xl:w-44">
                <div className="w-full sm:w-4/12">
                  <label className="w-full" htmlFor="">
                    <input
                      type="text"
                      className="py-1 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeGrayWhite placeholder:text-sm w-full"
                      placeholder="10"
                      name="totalAds"
                      {...register("totalAds", { required: true })}
                      onChange={(e) => {
                        setFeaturePreview({
                          ...featurePreview,
                          ["totalAds"]: e.target.value,
                        });
                      }}
                    />
                    {errors.totalAds && (
                      <span className="ml-2 text-red-400 text-sm italic">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </td>
            </tr>

            {/* featured Ads */}
            <tr className="bg-white mb-3 border-b border-themeGrayBorder  pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
              <td className="py-4 text-sm font-normal text-themeBlackAlt pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                <div className="flex gap-8 sm:gap-14">
                  <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
                  <p className="text-lg font-normal text-themeBlackDarker">
                    Featured Ads
                  </p>
                </div>
              </td>
              <td className="text-lg text-themeBlackDarker font-semibold  pl-8 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap 2xl:w-44">
                <div className="w-full sm:w-4/12">
                  <label className="w-full" htmlFor="">
                    <input
                      type="text"
                      className="py-1 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeGrayWhite placeholder:text-sm w-full"
                      placeholder="3"
                      name="featuredAds"
                      {...register("featuredAds", { required: true })}
                      onChange={(e) => {
                        setFeaturePreview({
                          ...featurePreview,
                          ["featuredAds"]: e.target.value,
                        });
                      }}
                    />
                    {errors.featuredAds && (
                      <span className="ml-2 text-red-400 text-sm italic">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </td>
            </tr>

            {_.map(featureData, (item, index) => (
              <tr
                key={index}
                className="bg-white mb-3 border-b border-themeGrayBorder  pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap"
              >
                <td className="py-4 text-sm font-normal text-themeBlackAlt pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                  <div className="flex gap-8 sm:gap-14">
                    {item.active ? (
                      <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
                    ) : (
                      <FaRegTimesCircle className="text-xl sm:text-2xl text-themeRedLight" />
                    )}
                    <p className="text-lg font-normal text-themeBlackDarker">
                      {item.name}
                    </p>
                  </div>
                </td>

                <td className="text-lg text-themeBlackDarker font-semibold py-4 pl-8 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap 2xl:w-44">
                  {item.details}
                </td>
                <td className="py-4 pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                  <ImageToggle item={item} features={features} setFeatures={setFeatures} />
                </td>
                <td className="py-4 pl-6 sm:pl-0 whitespace-nowrap sm:whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <svg
                      className="cursor-pointer text-themeWhiteLighter hover:text-themePrimary"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        handleEditFeature(item);
                      }}
                    >
                      <path
                        d="M9 11.2501L15.2888 4.93883C15.5841 4.64345 15.7501 4.24282 15.7501 3.82508C15.7501 3.40734 15.5841 3.00672 15.2888 2.71133C14.9934 2.41595 14.5927 2.25 14.175 2.25C13.7573 2.25 13.3566 2.41595 13.0613 2.71133L6.75 9.00008V11.2501H9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 3.75L14.25 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.75184 5.30078C5.44012 5.49299 4.24964 6.1742 3.41932 7.2077C2.58899 8.2412 2.18028 9.55049 2.27521 10.8728C2.37013 12.1951 2.96167 13.4326 3.9311 14.3369C4.90054 15.2412 6.17612 15.7454 7.50184 15.7483C8.76419 15.7481 9.98425 15.2933 10.9386 14.467C11.893 13.6408 12.5178 12.4984 12.6986 11.249"
                        stroke="#5D6D7E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <HiOutlineTrash className="text-themeWhiteLighter cursor-pointer text-lg hover:text-themePrimary"
                      onClick={() => {
                        handleRemoveFeature(item?.name);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default PackageTable;