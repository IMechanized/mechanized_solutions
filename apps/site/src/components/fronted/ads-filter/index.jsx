import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ThemeContext } from '../../../context/ThemeContext'

const AdsFilter = ({ setCurrentPage }) => {
  const [open, close] = React.useState(false)
  const [category, setCategory] = React.useState('')
  const [adsType, setAdsType] = React.useState('')
  const [adsWarrenty, setAdsWarrenty] = React.useState('')
  const [adsFilters, setAdsFilters] = React.useState('')

  const {
    adsCategoryData,
    adsCategoryError,
    adsCategoryMutate,
    filtersData,
    filtersError,
    filtersMutate,
  } = React.useContext(ThemeContext)
  const router = useRouter()

  const adType = filtersData?.adType
  const itemCondition = filtersData?.itemCondition
  const itemWarranty = filtersData?.itemWarranty
  const priceType = filtersData?.priceType
  // if (filtersData) {
  //   const { adType, itemCondition, itemWarranty, priceType } = filtersData
  // }

  const { register, setValue, reset, watch } = useForm()

  const category_name = register('category')
  const ad_Type = register('adsType')
  const ad_Warrenty = register('adsWarrenty')
  const ads_Filters = register('adsFilters')

  React.useEffect(() => {
    if (router.query.category || router.query.category !== '') {
      setValue('category', router.query.category)
    }
  }, [router.query.category])

  /* --------- category auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('category') !== '' ||
      category ||
      router.query.category !== category
    ) {
      const values = {
        adTitle: router.query.adTitle,
        location: router.query.location,
        category: watch('category'),
        adType: watch('adsType'),
        adWarranty: watch('adsWarrenty'),
        sortby: watch('adsFilters'),
      }
      const filtered = _.pickBy(
        values,
        (value) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          value.length > 0
      )

      router.push({
        pathname: '/all-ads',
        query: filtered,
      })
    }
  }, [category])

  /* --------- ad-type auto complete router query --------- */
  React.useEffect(() => {
    if (watch('adsType') !== '' || adsType || router.query.adType !== adsType) {
      const values = {
        adTitle: router.query.adTitle,
        location: router.query.location,
        category: watch('category'),
        adType: watch('adsType'),
        adWarranty: watch('adsWarrenty'),
        sortby: watch('adsFilters'),
      }
      const filtered = _.pickBy(
        values,
        (value) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          value.length > 0
      )

      router.push({
        pathname: '/all-ads',
        query: filtered,
      })
    }
  }, [adsType])

  /* --------- ad-warrenty auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('adsWarrenty') !== '' ||
      adsWarrenty ||
      router.query.adWarranty !== adsWarrenty
    ) {
      const values = {
        adTitle: router.query.adTitle,
        location: router.query.location,
        category: watch('category'),
        adType: watch('adsType'),
        adWarranty: watch('adsWarrenty'),
        sortby: watch('adsFilters'),
      }
      const filtered = _.pickBy(
        values,
        (value) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          value.length > 0
      )

      router.push({
        pathname: '/all-ads',
        query: filtered,
      })
    }
  }, [adsWarrenty])

  /* --------- ad-filters auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('adsFilters') !== '' ||
      adsFilters ||
      router.query.sortby !== adsFilters
    ) {
      const values = {
        adTitle: router.query.adTitle,
        location: router.query.location,
        category: watch('category'),
        adType: watch('adsType'),
        adWarranty: watch('adsWarrenty'),
        sortby: watch('adsFilters'),
      }
      const filtered = _.pickBy(
        values,
        (value) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          value.length > 0
      )

      router.push({
        pathname: '/all-ads',
        query: filtered,
      })
    }
  }, [adsFilters])

  return (
    <div className="pt-6">
      <div className="grid lg:flex flex-wrap lg:flex-nowrap gap-5">
        <div className="flex items-center justify-between text-themeWhiteLighter cursor-pointer grow-0 w-full md:w-auto">
          <p className="text-themeBlackAlt text-base md:text-xl font-bold whitespace-nowrap pr-5">
            Search Filter
          </p>
          <svg
            onClick={() => close(!open)}
            className={`lg:hidden transition duration-300 ease-in-out ${
              open ? 'text-themePrimary' : 'text-themeWhiteLighter'
            }`}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8327 0.666992H3.16602C2.50297 0.666992 1.86709 0.930384 1.39825 1.39923C0.929408 1.86807 0.666016 2.50395 0.666016 3.16699V4.14199C0.665896 4.48611 0.736821 4.82655 0.874349 5.14199V5.19199C0.992082 5.45947 1.15884 5.70254 1.36602 5.90866L6.49935 11.0087V16.5003C6.49907 16.6419 6.53488 16.7813 6.60341 16.9052C6.67194 17.0292 6.77092 17.1336 6.89102 17.2087C7.02363 17.2909 7.17666 17.3342 7.33268 17.3337C7.46313 17.3329 7.59158 17.3015 7.70768 17.242L11.041 15.5753C11.1784 15.5061 11.294 15.4001 11.3749 15.2692C11.4558 15.1383 11.4989 14.9875 11.4993 14.8337V11.0087L16.5993 5.90866C16.8065 5.70254 16.9733 5.45947 17.091 5.19199V5.14199C17.24 4.82902 17.3223 4.48848 17.3327 4.14199V3.16699C17.3327 2.50395 17.0693 1.86807 16.6004 1.39923C16.1316 0.930384 15.4957 0.666992 14.8327 0.666992ZM10.0743 10.0753C9.99711 10.1532 9.93601 10.2455 9.89454 10.3471C9.85307 10.4486 9.83205 10.5573 9.83268 10.667V14.317L8.16602 15.1503V10.667C8.16665 10.5573 8.14563 10.4486 8.10416 10.3471C8.06269 10.2455 8.00158 10.1532 7.92435 10.0753L3.50768 5.66699H14.491L10.0743 10.0753ZM15.666 4.00033H2.33268V3.16699C2.33268 2.94598 2.42048 2.73402 2.57676 2.57774C2.73304 2.42146 2.945 2.33366 3.16602 2.33366H14.8327C15.0537 2.33366 15.2657 2.42146 15.4219 2.57774C15.5782 2.73402 15.666 2.94598 15.666 3.16699V4.00033Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* <!-- form area --> */}
        <div className={`w-full lg:block ${open ? 'block' : 'hidden'}`}>
          <form className="w-full h-full" action="">
            <div className="flex flex-wrap lg:flex-nowrap gap-6 grow">
              {/* category  */}
              <select
                name="location"
                className="py-3 pl-3 text-base text-themeBlackAlt appearance-none w-full border  rounded focus:outline-none cursor-pointer selectForm"
                {...category_name}
                onChange={(e) => {
                  category_name.onChange(e)
                  setCurrentPage(0)
                  setCategory(e.target.value)
                }}
              >
                <option value="">All Category</option>
                {adsCategoryData &&
                  _.map(adsCategoryData, (item, index) => (
                    <option key={item.categoryTitle} value={item.categoryTitle}>
                      {item.categoryTitle}
                    </option>
                  ))}
                {/* <option value="searchLocation">Vehicles</option>
                <option value="searchLocation">Mobiles</option>
                <option value="searchLocation">Furniture</option>
                <option value="searchLocation">Fashion</option> */}
              </select>

              {/* Ads Type  */}
              <select
                name="location"
                className="py-3 pl-3 text-base text-themeBlackAlt appearance-none w-full border rounded focus:outline-none cursor-pointer selectForm"
                {...ad_Type}
                onChange={(e) => {
                  ad_Type.onChange(e)
                  setCurrentPage(0)
                  setAdsType(e.target.value)
                }}
              >
                <option value="">Ads Type</option>
                {adType &&
                  _.map(adType, (item, index) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>

              {/* Warrenty  */}
              <select
                name="location"
                className="py-3 pl-3 text-base text-themeBlackAlt appearance-none w-full border rounded focus:outline-none cursor-pointer selectForm"
                {...ad_Warrenty}
                onChange={(e) => {
                  ad_Type.onChange(e)
                  setCurrentPage(0)
                  setAdsWarrenty(e.target.value)
                }}
              >
                <option value="">Warranty</option>
                {itemWarranty &&
                  _.map(itemWarranty, (item, index) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>

              {/* Filter: Price, Featured  */}
              <select
                name="location"
                className="py-3 pl-3 text-base text-themeBlackAlt appearance-none w-full border rounded focus:outline-none cursor-pointer selectForm"
                {...ads_Filters}
                onChange={(e) => {
                  ad_Type.onChange(e)
                  setCurrentPage(0)
                  setAdsFilters(e.target.value)
                }}
              >
                <option value="">Sort</option>
                <option value="descending">Price High to Low</option>
                <option value="ascending">Price Low to High</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdsFilter
