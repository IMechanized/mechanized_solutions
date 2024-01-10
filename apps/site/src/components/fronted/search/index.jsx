import React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ThemeContext } from '../../../context/ThemeContext'

const Search = () => {
  const { topLocationData, topLocationError, topLocationMutate } =
    React.useContext(ThemeContext)
  const router = useRouter()
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  React.useEffect(() => {
    // const CallRouter = async () => {
    if (router.query.adTitle || router.query.adTitle !== '') {
      // await setValue("adTitle", router.query.adTitle);
      setValue('adTitle', router.query.adTitle)
    }
    // if (!router.query.adTitle || router.query.adTitle == "") {
    //   await setValue("adTitle", "");
    // }
    // };
    // CallRouter();
  }, [router.query.adTitle])

  React.useEffect(() => {
    if (router.query.location || router.query.location !== '') {
      setValue('location', router.query.location)
    }
  }, [router.query.location])

  const OnSubmitHandler = (data) => {
    const values = {
      adTitle: data.adTitle,
      location: data.location,
      category: router.query.category,
      adType: router.query.adType,
      adWarranty: router.query.adWarranty,
      sortby: router.query.sortby,
    }

    const filteredData = _.pickBy(
      values,
      (value) => value !== '' && value !== null && value !== undefined
    )

    router.push({
      pathname: '/all-ads',
      query: filteredData,
    })
  }

  return (
    <div className="bg-white rounded w-full shadow-frontShadow max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(OnSubmitHandler)} className="w-full">
        <div className="flex flex-wrap lg:flex-nowrap gap-3  p-3 rounded-lg w-full">
          <div className="relative w-full">
            <div className="absolute top-4 left-4">
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="h-14 rounded-lg z-0 focus:outline-none border border-themeWhiteLight2 w-full pl-14"
              placeholder="I am looking for..."
              {...register('adTitle')}
            />
          </div>

          <div className="relative w-full ">
            <select
              name="location"
              className="border border-themeWhiteLight2 outline-none h-14 rounded-md appearance-none text-themeWhiteLighter w-full px-12 selectForm cursor-pointer"
              {...register('location')}
            >
              <option value="">Search Location</option>
              {_.map(topLocationData, (item, index) => (
                <option key={index} value={item.location}>
                  {item.location}
                </option>
              ))}
            </select>
            <svg
              className="h-4 w-4 absolute top-1/2 left-4 transform -translate-y-1/2"
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0.875C2.90186 0.875 0.375 3.40186 0.375 6.5C0.375 7.37891 0.731446 8.38721 1.21484 9.48828C1.69824 10.5894 2.3208 11.7588 2.95312 12.8477C4.21777 15.0278 5.49219 16.8516 5.49219 16.8516L6 17.5938L6.50781 16.8516C6.50781 16.8516 7.78223 15.0278 9.04688 12.8477C9.6792 11.7588 10.3018 10.5894 10.7852 9.48828C11.2686 8.38721 11.625 7.37891 11.625 6.5C11.625 3.40186 9.09814 0.875 6 0.875ZM6 2.125C8.42432 2.125 10.375 4.07568 10.375 6.5C10.375 7.00049 10.1064 7.94775 9.65234 8.98047C9.19824 10.0132 8.5708 11.1582 7.95312 12.2227C6.97168 13.917 6.36133 14.813 6 15.3477C5.63867 14.813 5.02832 13.917 4.04688 12.2227C3.4292 11.1582 2.80176 10.0132 2.34766 8.98047C1.89355 7.94775 1.625 7.00049 1.625 6.5C1.625 4.07568 3.57568 2.125 6 2.125ZM6 5.25C5.30908 5.25 4.75 5.80908 4.75 6.5C4.75 7.19092 5.30908 7.75 6 7.75C6.69092 7.75 7.25 7.19092 7.25 6.5C7.25 5.80908 6.69092 5.25 6 5.25Z"
                fill="#1A2B3A"
              />
            </svg>
          </div>

          <div className="relative w-full lg:w-3/12">
            <button className="bg-themeSecondary h-14 px-6 lg:px-2 2xl:px-6 rounded-lg text-white font-semibold text-base w-full whitespace-nowrap">
              Search Ads
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
