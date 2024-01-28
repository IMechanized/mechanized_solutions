import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

const SellerFilter = ({ setCurrentPage }) => {
  const [open, close] = React.useState(false)
  const [sellersType, setSellersType] = React.useState('')
  const [sellersRating, setSellersRating] = React.useState('')
  const [sellersSortBy, setSellersSortBy] = React.useState('')
  const [sellersTitle, setSellersTitle] = React.useState('')

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

  const seller_Title = register('sellerTitle')
  const seller_Type = register('sellerType')
  const seller_rating = register('sellerRating')
  const seller_sortby = register('sellerSortby')

  const OnSubmitHandler = (data) => {
    const values = {
      sellerTitle: data.sellerTitle,
      sellerType: router.query.sellerType,
      sellerRating: router.query.sellerRating,
      sortBy: router.query.sortBy,
    }

    const filteredData = _.pickBy(
      values,
      (value) => value !== '' && value !== null && value !== undefined
    )

    router.push({
      query: filteredData,
    })
  }

  /* --------- seller-type auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('sellerType') !== '' ||
      sellersType ||
      router.query.sellerType !== sellersType
    ) {
      const values = {
        // sellerTitle: router.query.sellerTitle,
        sellerTitle: sellersTitle,
        sellerType: watch('sellerType'),
        sellerRating: watch('sellerRating'),
        sortBy: watch('sellerSortby'),
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
        // pathname: "/sellers",
        query: filtered,
      })
    }
  }, [sellersType])

  /* --------- seller-rating auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('sellerRating') !== '' ||
      sellersRating ||
      router.query.sellerRating !== sellersRating
    ) {
      const values = {
        // sellerTitle: router.query.sellerTitle,
        sellerTitle: sellersTitle,
        sellerType: watch('sellerType'),
        sellerRating: watch('sellerRating'),
        sortBy: watch('sellerSortby'),
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
        query: filtered,
      })
    }
  }, [sellersRating])

  /* --------- seller-sortby popularity auto complete router query --------- */
  React.useEffect(() => {
    if (
      watch('sellerSortby') !== '' ||
      sellersSortBy ||
      router.query.sortBy !== sellersSortBy
    ) {
      const values = {
        // sellerTitle: router.query.sellerTitle,
        sellerTitle: sellersTitle,
        sellerType: watch('sellerType'),
        sellerRating: watch('sellerRating'),
        sortBy: watch('sellerSortby'),
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
        query: filtered,
      })
    }
  }, [sellersSortBy])

  return (
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
            d="M14.8346 0.666992H3.16797C2.50493 0.666992 1.86904 0.930384 1.4002 1.39923C0.931361 1.86807 0.667969 2.50395 0.667969 3.16699V4.14199C0.667849 4.48611 0.738774 4.82655 0.876302 5.14199V5.19199C0.994035 5.45947 1.1608 5.70254 1.36797 5.90866L6.5013 11.0087V16.5003C6.50102 16.6419 6.53683 16.7813 6.60536 16.9052C6.67389 17.0292 6.77287 17.1336 6.89297 17.2087C7.02559 17.2909 7.17861 17.3342 7.33464 17.3337C7.46509 17.3329 7.59353 17.3015 7.70964 17.242L11.043 15.5753C11.1804 15.5061 11.296 15.4001 11.3769 15.2692C11.4578 15.1383 11.5008 14.9875 11.5013 14.8337V11.0087L16.6013 5.90866C16.8085 5.70254 16.9752 5.45947 17.093 5.19199V5.14199C17.242 4.82902 17.3243 4.48848 17.3346 4.14199V3.16699C17.3346 2.50395 17.0712 1.86807 16.6024 1.39923C16.1336 0.930384 15.4977 0.666992 14.8346 0.666992ZM10.0763 10.0753C9.99907 10.1532 9.93796 10.2455 9.89649 10.3471C9.85502 10.4486 9.834 10.5573 9.83463 10.667V14.317L8.16797 15.1503V10.667C8.1686 10.5573 8.14758 10.4486 8.10611 10.3471C8.06464 10.2455 8.00354 10.1532 7.9263 10.0753L3.50964 5.66699H14.493L10.0763 10.0753ZM15.668 4.00033H2.33464V3.16699C2.33464 2.94598 2.42243 2.73402 2.57871 2.57774C2.73499 2.42146 2.94696 2.33366 3.16797 2.33366H14.8346C15.0556 2.33366 15.2676 2.42146 15.4239 2.57774C15.5802 2.73402 15.668 2.94598 15.668 3.16699V4.00033Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* <!-- form area --> */}
      <div className={`w-full lg:block ${open ? 'block' : 'hidden'}`}>
        <form
          onSubmit={handleSubmit(OnSubmitHandler)}
          className="w-full h-full"
          action=""
        >
          <div className="flex flex-wrap lg:flex-nowrap gap-6 grow">
            <div className="w-full flex relative h-14">
              <input
                className="h-14 border border-themeGrayWhiteer px-3 rounded w-full focus:outline-none"
                type="text"
                placeholder="Search Advertisers"
                {...seller_Title}
                onChange={(e) => {
                  seller_Title.onChange(e)
                  setCurrentPage(0)
                  setSellersTitle(e.target.value)
                }}
              />
              <button
                type="submit"
                className="flex absolute right-0 mt-2 mr-2 bg-themePrimary w-10 h-10 rounded"
              >
                <svg
                  className="h-6 w-6 m-auto text-white"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0645 0.0625C7.27515 0.0625 4.18945 3.14819 4.18945 6.9375C4.18945 8.58374 4.76685 10.093 5.73633 11.2773L0.257812 16.7559L1.24609 17.7441L6.72461 12.2656C7.90894 13.2351 9.41821 13.8125 11.0645 13.8125C14.8538 13.8125 17.9395 10.7268 17.9395 6.9375C17.9395 3.14819 14.8538 0.0625 11.0645 0.0625ZM11.0645 1.4375C14.1099 1.4375 16.5645 3.89209 16.5645 6.9375C16.5645 9.98291 14.1099 12.4375 11.0645 12.4375C8.01904 12.4375 5.56445 9.98291 5.56445 6.9375C5.56445 3.89209 8.01904 1.4375 11.0645 1.4375Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            <div className="border border-themeGrayWhiteer rounded w-full relative">
              <select
                name="type"
                className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectForm"
                {...seller_Type}
                onChange={(e) => {
                  seller_Type.onChange(e)
                  setCurrentPage(0)
                  setSellersType(e.target.value)
                }}
              >
                <option value="">Advertiser Type</option>
                <option value="verified">Verified</option>
                <option value="non-verified">Non-Verified</option>
              </select>
            </div>

            <div className="border border-themeGrayWhiteer rounded w-full relative">
              <select
                name="rating"
                className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectForm"
                {...seller_rating}
                onChange={(e) => {
                  seller_rating.onChange(e)
                  setCurrentPage(0)
                  setSellersRating(e.target.value)
                }}
              >
                <option value="">Select Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>

            <div className="border border-themeGrayWhiteer rounded w-full relative">
              <select
                name="location"
                className="py-3 pl-3 rounded-lg text-base text-themeBlackAlt focus:outline-none cursor-pointer bg-white appearance-none w-full selectForm"
                {...seller_sortby}
                onChange={(e) => {
                  seller_sortby.onChange(e)
                  setCurrentPage(0)
                  setSellersSortBy(e.target.value)
                }}
              >
                <option value="">Sort By Popularity</option>
                <option value="asc">High to Low</option>
                <option value="des">Low to High</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SellerFilter
