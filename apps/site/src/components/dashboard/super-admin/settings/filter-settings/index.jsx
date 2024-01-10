import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { Axios } from "../../../../../utils/axiosKits";
import AdsType from "./ads-type";



const menuData = [
  {
    id: 1,
    title: "Ads Type",
  },
  {
    id: 2,
    title: "Warranty",
  },
  {
    id: 3,
    title: "Item Condition",
  },
  {
    id: 4,
    title: "Price Type",
  },
  {
    id: 5,
    title: "Ads Tags",
  }
];


const fetcher = (url) => Axios(url).then(res => res.data.data);
const filtersAPI = "/admin/filters";

const FilterSettings = () => {
  const [activeForm, setActiveForm] = React.useState(0);

  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  });

  const { data: filterData, error: filterError } = useSWR(filtersAPI, fetcher);

  return (
    <section>
      <div className="w-full">
        <ul className="flex flex-wrap gap-x-10 gap-y-4 lg:border-b mb-3 w-full">
          {menuData.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveForm(index)}
              className={`text-base font-semibold cursor-pointer border-b-2 pb-3 ${activeForm === index
                ? " border-themePrimary text-themePrimary "
                : " border-white"
                }`}
            >
              {item.title}
            </li>
          ))}
        </ul>

      </div>

      <div className="pt-5">
        {activeForm === 0 && <AdsType data={filterData?.adType} filterError={filterError} adTypeTab={true} />}
        {/* {activeForm === 1 && <Warranty />} */}
        {activeForm === 1 && <AdsType data={filterData?.itemWarranty} filterError={filterError} warrentyTab={true} />}
        {/* {activeForm === 2 && <ItemCondition />} */}
        {activeForm === 2 && <AdsType data={filterData?.itemCondition} filterError={filterError} adConditionTab={true} />}
        {/* {activeForm === 3 && <PriceType />} */}
        {activeForm === 3 && <AdsType data={filterData?.priceType} filterError={filterError} priceTypeTab={true} />}
        {activeForm === 4 && <AdsType data={filterData?.tags} filterError={filterError} adTagsTab={true} />}
      </div>


    </section>
  );
};

export default FilterSettings;
