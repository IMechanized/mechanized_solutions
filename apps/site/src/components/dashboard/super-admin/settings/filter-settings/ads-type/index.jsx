import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import { authAxios } from "../../../../../../utils/axiosKits";
import AllAdsType from "./all-ads-type";

const AdsType = ({ data, filterError, adTypeTab, warrentyTab, adConditionTab, priceTypeTab, adTagsTab }) => {
  const [filterValues, setFilterValues] = React.useState(data);
  const [loadingTop, setLoadingTop] = React.useState(false);

  const { addToast } = useToasts();

  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // add filter item function
  const onSubmit = async (data) => {
    setLoadingTop(true);
    if (filterValues.includes(data.filterItem.toLowerCase())) {
      setLoadingTop(false);
      return addToast("This item already exists!", {
        appearance: "warning",
        autoDismiss: true,
      });
    }

    const filterData =
      [
        ...filterValues,
        data?.filterItem
      ]
    setFilterValues(filterData);

    let filterInput
    if (adTypeTab) {
      filterInput = {
        adType: filterData,
      };
    } else if (warrentyTab) {
      filterInput = {
        itemWarranty: filterData,
      };
    } else if (adConditionTab) {
      filterInput = {
        itemCondition: filterData,
      };
    } else if (priceTypeTab) {
      filterInput = {
        priceType: filterData,
      };
    } else if (adTagsTab) {
      filterInput = {
        tags: filterData,
      };
    }

    try {
      authAxios({
        method: "POST",
        url: `/admin/filters`,
        data: filterInput
      })
        .then((res) => {
          mutate("/admin/filters")
            .then(() => {
              addToast(res.data.message, {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              reset();
              setLoadingTop(false);
            }, 1000);
        })
        .catch((err) => {
          addToast(err?.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setLoadingTop(false);
        }
        );
    } catch (error) {
      addToast(error?.response?.data?.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      setLoadingTop(false);
    }
  }

  return (
    <section className="">
      <div className="grid grid-cols-2">
        <div className="col-span-2 xl:col-span-1 xl:border-r xl:pr-5 2xl:pr-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="w-full" htmlFor="">
              <p className="text-sm font-semibold text-themeWhiteLighter pb-2">
                {adTypeTab && "Ads Type"}
                {warrentyTab && "Warrenty"}
                {adConditionTab && "Item Condition"}
                {priceTypeTab && "Price Type"}
                {adTagsTab && "Ads Tags"}
              </p>
              <input
                type="text"
                className="w-full rounded-md border border-themeGrayLight py-3 px-3 focus:outline-none"
                {...register("filterItem", { required: true })}
              />
              {errors.filterItem && (
                <span className="text-red-400 text-sm italic">
                  Please input an item before submit
                </span>
              )}
            </label>
            <button
              type="submit"
              disabled={loadingTop}
              className="flex gap-2 bg-themePrimary rounded text-base text-white font-semibold py-3 px-7 mt-5 w-fit">
              {loadingTop ? "Please wait..." : "Save"}
              {/* spinner */}
              {loadingTop && (
                <div className="flex items-center justify-center ">
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>
        </div>
        <div className="col-span-2 xl:col-span-1 xl:pl-5  2xl:pl-10 w-full pb-32 pt-6 xl:pt-0">
          <AllAdsType data={data} filterError={filterError} adTypeTab={adTypeTab} warrentyTab={warrentyTab} adConditionTab={adConditionTab} priceTypeTab={priceTypeTab} adTagsTab={adTagsTab} />
        </div>
      </div>
    </section>
  );
};

export default AdsType;
