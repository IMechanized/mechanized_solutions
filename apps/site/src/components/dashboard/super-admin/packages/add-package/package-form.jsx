import React from 'react';
import { RiArrowDownSLine } from "react-icons/ri";

const PackageForm = ({ register, errors, featurePreview, setFeaturePreview }) => {

  return (
    <div className="pt-10">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 w-full">
        {/* package title  */}
        <div className="w-full sm:w-4/12">
          <label className="w-full" htmlFor="">
            <p className="text-sm font-semibold text-themeGrayWhite pb-2">Package Title</p>
            <input type="text" className="py-3 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeBlackAlt placeholder:text-sm placeholder:font-normal w-full" placeholder="Standard"
              {...register("packageName", { required: true })}
              onChange={(e) => {
                setFeaturePreview({
                  ...featurePreview,
                  ["packageName"]: e.target.value,
                });
              }}
            />
            {errors.packageName && (
              <span className="text-red-400 text-sm italic">
                This field is required
              </span>
            )}
          </label>
        </div>

        {/* package color */}
        <div className="w-full sm:w-4/12">
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            Package Color
          </p>
          <div className="border border-themeGrayLight rounded-md w-full relative">
            <select
              name="packageColor"
              className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
              {...register("packageColor", { required: true })}
              onChange={(e) => {
                setFeaturePreview({
                  ...featurePreview,
                  ["packageColor"]: e.target.value,
                });
              }}
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>

            </select>
          </div>
        </div>
        <span className="w-full sm:w-4/12"></span>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 pt-6 w-full ">
        {/* package currency */}
        <div className="w-full sm:w-4/12">
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            Currency
          </p>
          <div className="border border-themeGrayLight rounded-md w-full relative">
            <select
              name="currency"
              className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
              {...register("currency", { required: true })}
              onChange={(e) => {
                setFeaturePreview({
                  ...featurePreview,
                  ["currency"]: e.target.value,
                });
              }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        {/* package price */}
        <div className="w-full sm:w-4/12">
          <label className="w-full" htmlFor="">
            <p className="text-sm font-semibold text-themeGrayWhite pb-2">Price</p>
            <input type="text" className="py-3 px-3 focus:outline-none border border-themeGrayLight rounded-md placeholder:text-themeBlackAlt placeholder:text-sm placeholder:font-normal w-full" placeholder="25.45"
              {...register("pricing", { required: true })}
              onChange={(e) => {
                setFeaturePreview({
                  ...featurePreview,
                  ["pricing"]: e.target.value,
                });
              }}
            />
            {errors.pricing && (
              <span className="text-red-400 text-sm italic">
                This field is required
              </span>
            )}
          </label>
        </div>

        {/* package subscription duration */}
        <div className="w-full sm:w-4/12">
          <p className="text-sm font-semibold text-themeGrayWhite pb-2">
            Subscription
          </p>
          <div className="border border-themeGrayLight rounded-md w-full relative">
            <select
              name="frequency"
              className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
              {...register("frequency", { required: true })}
              onChange={(e) => {
                setFeaturePreview({
                  ...featurePreview,
                  ["frequency"]: e.target.value,
                });
              }}
            >
              <option value="Month">Monthly</option>
              <option value="Week">Weekly</option>
              <option value="Year">Yearly </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageForm;