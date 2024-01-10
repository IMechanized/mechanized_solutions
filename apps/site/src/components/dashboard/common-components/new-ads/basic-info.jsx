import _ from 'lodash';
import React from 'react';
import { MultiSelect } from '../form/multi-select-dropdown';

const BasicInfo = ({
    register,
    errors,
    setValue,
    adsCategoryData,
    topLocationData,
    filtersData,
    adData,
    selectedTags,
    setSelectedTags,
    newTags,
    setNewTags,
}) => {
    const filterTags = filtersData?.tags;

    React.useEffect(() => {
        setSelectedTags(newTags);
    }, [newTags, adData]);

    return (
        <div>
            <h3 className="text-lg font-bold text-themeBlackDarker">
                Basic Info
            </h3>
            {/* <div className="w-10/12 sm:w-6/12 pt-10">
        <p className="text-sm font-semibold text-themeGrayWhite pb-2">
          Category
        </p>
        <div className="flex items-center py-3 border border-themeGrayLight rounded w-full px-3 relative">
          <select
            name="location"
            className=" rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full"
            {...register("category")}
          >
            <option value="">Select Category</option>
            {_.map(adsCategoryData, (item, index) => (
              <option key={index} value={item.categoryTitle}>
                {item.categoryTitle}
              </option>
            ))}
          </select>
          <RiArrowDownSLine className="h-5 w-5 text-themeGrayWhite absolute right-5" />
        </div>
      </div> */}
            <div className="flex flex-wrap sm:flex-nowrap gap-6 pt-10">
                <div className="w-full">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Category
                    </p>
                    <div
                        className={`flex items-center  border rounded w-full relative ${
                            errors?.category
                                ? 'border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                    >
                        <select
                            name="location"
                            className={`py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard`}
                            {...register('category', {
                                required: 'Category is required',
                            })}
                        >
                            <option value="">Select Category</option>
                            {_.map(adsCategoryData, (item, index) => (
                                <option key={index} value={item.categoryTitle}>
                                    {item.categoryTitle}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Location
                    </p>
                    <div
                        className={`flex items-center border rounded w-full relative ${
                            errors?.location
                                ? '!border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                    >
                        <select
                            name="location"
                            className={`py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard`}
                            {...register('location', {
                                required: 'Location is required',
                            })}
                        >
                            <option value="">Select Location</option>
                            {_.map(topLocationData, (item, index) => (
                                <option key={index} value={item.location}>
                                    {item.location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <label className="w-full sm:w-9/12" htmlFor="">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Ads Title
                    </p>
                    <input
                        type="text"
                        className={`focus:outline-none p-3 border border-themeGrayLight placeholder:text-themeGray rounded-md w-full ${
                            errors?.adTitle && 'border-themeRedLight'
                        }`}
                        placeholder="Simple and Awesome ads title here"
                        {...register('adTitle', {
                            required: 'Ads title is required',
                        })}
                    />
                </label>
            </div>

            <div className="pt-6">
                <label className="w-full sm:w-9/12" htmlFor="">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Tags
                    </p>
                    {/* <input
            type="text"
            className="focus:outline-none p-3 border border-themeGrayLight rounded-md w-full placeholder:text-themeBlackAlt"
            placeholder="Simple and Awesome ads title here"
            {...register("adTags")}
          /> */}
                    <MultiSelect
                        options={filterTags}
                        isObject={false}
                        validationSyntax={true}
                        error={errors?.adTags}
                        name="adTags"
                        register={register}
                        setValue={setValue}
                        setNewTags={setNewTags}
                        selectedValues={selectedTags}
                        emptyRecordMsg="No tags found"
                        placeholder="Select Tags"
                    />
                </label>
            </div>
        </div>
    );
};

export default BasicInfo;
