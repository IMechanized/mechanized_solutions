import React from "react";
import _ from "lodash";
import sweetAlert from "sweetalert";
import { useSWRConfig } from "swr";
import { useToasts } from "react-toast-notifications";
import { FiSearch } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { LoaderPage } from "../../../../../../lib/loader";
import { authAxios } from "../../../../../../utils/axiosKits";

const AllAdsType = ({ data, filterError, adTypeTab, warrentyTab, adConditionTab, priceTypeTab, adTagsTab }) => {
  const [filters, setFilters] = React.useState(data);
  const [displayItems, setDisplayItems] = React.useState(data);
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();

  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  });

  // remove filter item function
  const hangleRemoveFilter = (value) => {
    sweetAlert({
      title: "Are you sure?",
      text: `You want to remove ${value} from filters?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        const newData = _.filter(filters, (item) => item !== value);
        setFilters(newData);

        let submitData
        if (adTypeTab) {
          submitData = {
            adType: newData,
          };
        } else if (warrentyTab) {
          submitData = {
            itemWarranty: newData,
          };
        } else if (adConditionTab) {
          submitData = {
            itemCondition: newData,
          };
        } else if (priceTypeTab) {
          submitData = {
            priceType: newData,
          };
        } else if (adTagsTab) {
          submitData = {
            tags: newData,
          };
        }

        try {
          authAxios({
            method: "POST",
            url: `/admin/filters`,
            data: submitData
          })
            .then((res) => {
              mutate("/admin/filters")
                .then(() => {
                  addToast(res.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                  });
                  setLoading(false);
                }, 1000);
            })
            .catch((err) => {
              addToast(err?.response?.data?.message, {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              setLoading(false);
            }
            );
        } catch (error) {
          addToast(error?.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setLoading(false);
        }
      }
    });
  }

  const searchHandler = (value) => {
    setLoading(true);
    const newData = _.filter(data, (item) => item.toLowerCase().includes(value.toLowerCase()));
    if (value = "") {
      setDisplayItems(data);
    } else {
      setDisplayItems(newData);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full pb-4">
        <p className="text-base font-semibold text-themeBlackAlt ">
          {adTypeTab && "Ads Type"}
          {warrentyTab && "Warrenty"}
          {adConditionTab && "Item Condition"}
          {priceTypeTab && "Price Type"}
          {adTagsTab && "Ads Tags"}
        </p>

        <div className="pt-2 relative  text-themeBlackDarker">
          <input
            className="border-2 border-themeGrayLight bg-white py-2 rounded text-sm focus:outline-none pl-12 pr-3 placeholder:text-themeWhiteAlt w-full text"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => searchHandler(e.target.value)}
          />
          <button type="submit" className="absolute left-0 top-0 mt-5 ml-4">
            <FiSearch className="text-gray-600 h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="space-y-1 relative">

        {filterError && (
          <div className="bg-red-300 my-2 text-white py-1 p-2.5 text-xss rounded text-center">Failed to load data</div>
        )}

        {/* loader  */}
        {!filterError && !data && (
          <LoaderPage />
        )}
        {/* loader  */}
        {loading && (
          <LoaderPage />
        )}

        {displayItems && displayItems.length > 0 && (
          _.map(displayItems, (adFilter, index) => (
            <div key={index} className="flex items-center  justify-between bg-themeWhiteLight rounded-md p-4">
              <p className="text-sm text-themeBlackDarker">{adFilter}</p>
              <button
                onClick={() => hangleRemoveFilter(adFilter)}
              >
                <HiOutlineTrash className="text-themeWhiteLighter text-xl hover:text-themeRedLight transition duration-300 ease-in-out" />
              </button>
            </div>
          ))
        )}

        {displayItems && displayItems.length < 1 && (
          <div className="my-2 text-text-themeBlackDarker py-1 p-2.5 text-xss rounded text-center">No filter item found</div>
        )}

        {data && data.length < 1 && (
          <div className="my-2 text-text-themeBlackDarker py-1 p-2.5 text-xss rounded text-center">No filter item created yet</div>
        )}
      </div>
    </>
  );
};

export default AllAdsType;
