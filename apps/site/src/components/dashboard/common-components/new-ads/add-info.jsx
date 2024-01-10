import _ from 'lodash';

const AddInfo = ({ register, filtersData, errors }) => {
    const filterItemCondition = filtersData?.itemCondition;
    const filterItemWarranty = filtersData?.itemWarranty;
    const filterAdType = filtersData?.adType;

    return (
        <div>
            <h3 className="text-lg font-bold text-themeBlackDarker">
                Ads Info
            </h3>
            <div className="space-y-6 pt-10">
                <div>
                    <p className="text-sm font-semibold text-themeBlackDarker pb-4">
                        Item Condition
                    </p>
                    <ul className="flex gap-4">
                        {filterItemCondition &&
                            _.map(filterItemCondition, (item, index) => (
                                <li key={index} className="relative">
                                    <input
                                        className="sr-only peer"
                                        type="radio"
                                        value={item}
                                        name="ItemCondition"
                                        id={item}
                                        {...register('itemCondition', {
                                            required:
                                                'Item Condition is required',
                                        })}
                                    />
                                    <label
                                        className={`flex py-2 sm:py-3 px-6 sm:px-7 bg-white border text-themeWhiteLighter text-base rounded-lg cursor-pointer focus:outline-none peer-checked:text-white  peer-checked:bg-themePrimary peer-checked:border-0 ${
                                            errors?.itemCondition
                                                ? 'border-themeRedLight'
                                                : 'border-themeGrayLight'
                                        }`}
                                        htmlFor={item}
                                    >
                                        {item}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>

                <div>
                    <p className="text-sm font-semibold text-themeBlackDarker pb-4">
                        Warranty
                    </p>
                    <ul className="flex gap-4">
                        {filterItemWarranty &&
                            _.map(filterItemWarranty, (item, index) => (
                                <li key={index} className="relative">
                                    <input
                                        className="sr-only peer"
                                        type="radio"
                                        value={item}
                                        name="Warranty"
                                        id={item}
                                        {...register('itemWarranty', {
                                            required: 'Warranty is required',
                                        })}
                                    />
                                    <label
                                        className={`flex py-2 sm:py-3 px-6 sm:px-7 bg-white border text-themeWhiteLighter text-base rounded-lg cursor-pointer focus:outline-none peer-checked:text-white  peer-checked:bg-themePrimary peer-checked:border-0 ${
                                            errors?.itemWarranty
                                                ? 'border-themeRedLight'
                                                : 'border-themeGrayLight'
                                        }`}
                                        htmlFor={item}
                                    >
                                        {item}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>

                <div>
                    <p className="text-sm font-semibold text-themeBlackDarker pb-4">
                        Type Of Ad
                    </p>
                    <ul className="flex flex-wrap  gap-4">
                        {filterAdType &&
                            _.map(filterAdType, (item, index) => (
                                <li key={index} className="relative">
                                    <input
                                        className="sr-only peer"
                                        type="radio"
                                        value={item}
                                        name="TypeOfAd"
                                        id={item}
                                        {...register('adType', {
                                            required: 'Type Of Ad is required',
                                        })}
                                    />
                                    <label
                                        className={`flex py-2 sm:py-3 px-6 sm:px-7 bg-white border  text-themeWhiteLighter text-base rounded-lg cursor-pointer focus:outline-none peer-checked:text-white  peer-checked:bg-themePrimary peer-checked:border-0 ${
                                            errors?.adType
                                                ? 'border-themeRedLight'
                                                : 'border-themeGrayLight'
                                        }`}
                                        htmlFor={item}
                                    >
                                        {item}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddInfo;
