import _ from "lodash";
import React from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { ThemeContext } from "../../../../context/ThemeContext";

const SearchFilter = () => {
  const { adsCategoryData, adsCategoryError, adsCategoryMutate, } = React.useContext(ThemeContext);
  const router = useRouter();

  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const OnSubmitHandler = (data) => {
    const values = {
      adTitle: data.adTitle,
      category: data.category,
    }
    const filteredData = _.pickBy(values, (value) => value !== "" && value !== null && value !== undefined);
    router.push({
      query: filteredData,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmitHandler)} className="w-full" action="">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
          <div className="flex items-center relative mx-auto w-full">
            <input
              className="bg-white h-11 px-5 pl-12 rounded text-sm focus:outline-none w-full"
              type="text"
              name="search"
              placeholder="Search Ads"
              {...register("adTitle")}
            />
            <button type="submit" className="absolute left-0 ml-4">
              <FiSearch className="text-themeWhiteAlt h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center bg-white rounded w-full relative pr-1 ">
            <select
              name="Currency"
              className="h-11 pl-3 rounded-lg text-base text-themeWhiteLighter focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
              {...register("category")}
            >
              <option value="">
                Select a Category
              </option>
              {adsCategoryData && _.map(adsCategoryData, (item, index) => (
                <option key={item.categoryTitle} value={item.categoryTitle}>{item.categoryTitle}</option>
              ))}
            </select>
            
          </div>

          <div className="w-full sm:w-auto">
            <button className="bg-themePrimary py-3 px-5 rounded text-sm font-semibold text-white  w-full sm:w-auto">
              Apply
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchFilter;
