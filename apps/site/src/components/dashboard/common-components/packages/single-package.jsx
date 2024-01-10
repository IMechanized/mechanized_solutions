import Link from 'next/link'
import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import { useToasts } from 'react-toast-notifications'
import sweetAlert from 'sweetalert'
import useUser from '../../../../lib/user'
import { authAxios } from '../../../../utils/axiosKits'

const SinglePackage = ({ item, loading, setLoading, mutate }) => {
  const { addToast } = useToasts()
  const {
    user,
    isBuyer,
    isSeller,
    isAdmin,
    isSuperAdmin,
    loggedIn,
    loggedOut,
  } = useUser()
  const packageName = user?.data?.packageDetails?.packageName

  // update package by seller function
  const userPackageUpdateHandler = (packageId, packageName) => {
    const packageData = {
      packageId: packageId,
      packageName: packageName,
    }
    sweetAlert({
      title: 'Are you sure?',
      text: 'You want to upgrade this package?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willChange) => {
      if (willChange) {
        setLoading(true)
        try {
          authAxios({
            method: 'PUT',
            url: `/user/package`,
            data: packageData,
          }).then((res) => {
            mutate('/package/ads').then(() => {
              addToast(res.data.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              setLoading(false)
            })
          })
        } catch (error) {
          addToast(err.response?.data?.message, {
            appearance: 'error',
            autoDismiss: true,
          })
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })
  }

  // delete package by admin function
  const deletePackageHandler = (id) => {
    sweetAlert({
      title: 'Are you sure?',
      text: 'You want to delete this package?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true)
        try {
          authAxios
            .delete(`/package/ads/${id}`)
            .then((res) => {
              mutate('/ads/category').then(() => {
                addToast(res.data.message, {
                  appearance: 'success',
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                })
                setLoading(false)
              }, 1000)
            })
            .catch((err) => {
              addToast(err?.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000,
              })
              setLoading(false)
            })
        } catch (error) {
          addToast(error?.response?.data?.message, {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          })
          setLoading(false)
        }
      }
    })
  }

  return (
    <>
      <div className="sm:col-span-3 lg:col-span-2 2xl:col-span-3 bg-white p-4 xl:p-10 rounded-lg shadow-boxShadow">
        <div className="text-center">
          <h1
            className={`text-3xl font-bold ${
              item?.packageColor == 'Secondary'
                ? `text-themeSecondary`
                : `text-themePrimary`
            } pt-2 uppercase`}
          >
            {/* <h1 className="text-3xl font-bold text-themeBlackAlt pt-2"> */}
            {item?.packageName}
          </h1>
          <h2 className="text-4xl font-bold text-themePrimary pt-6">
            {item?.currency == 'USD' && <span>$</span>}
            {item?.currency == 'EUR' && <span>€</span>}
            {item?.currency == 'GBP' && <span>£</span>}
            {item?.pricing}
          </h2>
          <p className="text-base font-normal text-themeGrayWhite pt-1 lowercase">
            per {item?.frequency}
          </p>
        </div>

        <ul className="space-y-5 pt-7">
          <li className="flex items-center gap-6 relative">
            <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
            <span className="text-base sm:text-lg lg:text-base xl:text-lg font-normal text-themeBlackDarker">
              Validity
            </span>
            <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
              {item?.validity} Days
            </p>
          </li>
          <li className="flex items-center gap-6 relative">
            <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
            <span className="text-base sm:text-lg lg:text-base xl:text-lg font-normal text-themeBlackDarker">
              Ads
            </span>
            <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
              {item?.totalAds}
            </p>
          </li>
          <li className="flex items-center gap-6 relative">
            <FiCheckCircle className="text-xl sm:text-2xl text-themePrimary" />
            <span className="text-base sm:text-lg lg:text-base xl:text-lg font-normal text-themeBlackDarker">
              Featured Ads
            </span>
            <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
              {item?.featuredAds}
            </p>
          </li>
          {_.map(item?.services, (service, index) => (
            <li key={index} className="flex items-center gap-6 relative">
              {service.active ? (
                <FiCheckCircle className="text-lg sm:text-2xl text-themePrimary" />
              ) : (
                <FaRegTimesCircle className="text-lg sm:text-2xl text-themeRedLight" />
              )}
              <span className="text-base sm:text-lg lg:text-base xl:text-lg font-normal text-themeBlackDarker">
                {service?.name}
              </span>
              <p className="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-themeBlackDarker absolute right-0">
                {service?.details}
              </p>
            </li>
          ))}
        </ul>

        {isSuperAdmin && (
          <div className="grid sm:flex gap-5 pt-10  sm:justify-center ">
            <div className="sm:w-5/12">
              <Link
                href={`/dashboard/packages/edit-package?active_id=${item._id}`}
              >
                <a>
                  <button className="text-base font-semibold text-white rounded bg-themeYellowLight py-4 w-full">
                    Edit
                  </button>
                </a>
              </Link>
            </div>

            <button
              onClick={() => deletePackageHandler(item?._id)}
              className="text-base font-semibold text-white rounded bg-themeGray py-4  w-full sm:w-5/12"
            >
              Delete
            </button>
          </div>
        )}

        {isSeller && (
          <div className="pt-10 text-center flex items-center justify-center ">
            {packageName == item?.packageName ? (
              <a>
                <button
                  className={`text-base font-semibold text-white rounded bg-themeGray py-4 px-12 whitespace-nowrap`}
                >
                  Current Plan
                </button>
              </a>
            ) : (
              <button
                disabled={loading}
                className={`flex text-base font-semibold text-white rounded ${
                  item?.packageColor == 'Secondary'
                    ? `bg-themeSecondary`
                    : `bg-themePrimary`
                } py-4 px-12 whitespace-nowrap`}
                onClick={() =>
                  userPackageUpdateHandler(item?._id, item?.packageName)
                }
              >
                {loading ? 'Please wait...' : 'Upgrade'}
                {/* spinner */}
                {loading && (
                  <div className="ml-2 flex items-center justify-center ">
                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SinglePackage
