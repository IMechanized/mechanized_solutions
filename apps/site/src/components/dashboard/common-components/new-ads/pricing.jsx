import _ from 'lodash';

const Pricing = ({ register, filtersData, errors }) => {
    const filterPriceType = filtersData?.priceType;

    return (
        <div>
            <h2 className="text-xl font-bold text-themeBlackDarker pb-10">
                Pricing
            </h2>
            <div className="space-y-6">
                <div className="w-10/12 sm:w-5/12">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Currency
                    </p>
                    <div className="flex items-center border border-themeGrayLight rounded w-full relative">
                        <select
                            name="Currency"
                            className="py-3 pl-3 placeholder:text-themeGray rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
                            {...register('currency')}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>

                <div className="w-10/12 sm:w-5/12">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Price Type
                    </p>
                    <div className="flex items-center border border-themeGrayLight rounded w-full relative">
                        <select
                            name="PriceType"
                            className="py-3 pl-3 rounded-lg text-base placeholder:text-themeGray text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectDashboard"
                            {...register('priceType')}
                        >
                            {_.map(filterPriceType, (item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="w-10/12 sm:w-5/12">
                    <p className="text-sm font-semibold text-themeGrayWhite pb-2">
                        Price
                    </p>
                    <div
                        className={`flex items-center py-3 border rounded w-full px-3 relative ${
                            errors?.price
                                ? 'border-themeRedLight'
                                : 'border-themeGrayLight'
                        }`}
                    >
                        <input
                            name="Currency"
                            className="rounded-lg text-base placeholder:text-themeGray text-themeBlackAlt focus:outline-none bg-white appearance-none w-full"
                            {...register('price', {
                                required: 'Price is required',
                            })}
                            placeholder="Enter Price"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
