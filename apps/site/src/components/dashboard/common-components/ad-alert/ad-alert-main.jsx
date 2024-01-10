import React from 'react'
import Link from 'next/link'
import useSWR, { useSWRConfig } from 'swr'
import sweetAlert from 'sweetalert'
import { useToasts } from 'react-toast-notifications'
import { BsEyeSlash } from 'react-icons/bs'
import { HiOutlineDotsVertical, HiOutlineTrash } from 'react-icons/hi'
import AlertTableLarge from './alert-table-large'
import AlertTableSmall from './alert-table-small'
import { authAxios } from '../../../../utils/axiosKits'

const fetcher = (url) => authAxios(url).then((res) => res.data.data)

function AdAlertMain() {
  const [alertIds, setAlertIds] = React.useState([])
  const [loadingTop, setloadingTop] = React.useState(false)
  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  })
  const { data: adAlerts, error: adAlertsError } = useSWR(
    '/user/alert/ads',
    fetcher,
    {
      refreshInterval: 0,
    }
  )
  //

  const { addToast } = useToasts()

  // delete multi ad-alerts function start
  const deleteMultiAlerts = (ids) => {
    if (ids.length < 1) {
      return addToast('Please select at least one alert', {
        appearance: 'warning',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      })
    }

    sweetAlert({
      title: 'Are you sure?',
      text: 'You want to delete these Alert list?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setloadingTop(true)
        try {
          authAxios({
            method: 'DELETE',
            url: `user/multiselect/alert/ads`,
            data: {
              alertIds: `${ids}`,
            },
          })
            .then((res) => {
              addToast(res.data.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              mutate(`user/alert/ads`).then(() => {
                setloadingTop(false)
                setAlertIds([])
              }, 1000)
            })
            .catch((err) => {
              addToast(err?.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000,
              })
              setloadingTop(false)
            })
        } catch (error) {
          addToast(error?.response?.data?.message, {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          })
          setloadingTop(false)
        }
      }
    })
  }

  // disable multi ad-alerts function start
  const disableMultiAlerts = (ids) => {
    if (ids.length < 1) {
      return addToast('Please select at least one alert', {
        appearance: 'warning',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      })
    }
    sweetAlert({
      title: 'Are you sure?',
      text: 'You want to disble these alert list?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setloadingTop(true)
        try {
          authAxios({
            method: 'PUT',
            url: `/user/multiselect/alert/ads`,
            data: {
              alertIds: `${ids}`,
            },
          })
            .then((res) => {
              mutate(`/user/alert/ads`).then(() => {
                addToast(res.data.message, {
                  appearance: 'success',
                  autoDismiss: true,
                })
                setAlertIds([])
                setloadingTop(false)
              }, 700)
            })
            .catch((err) => {
              addToast(err.response?.data?.message, {
                appearance: 'error',
                autoDismiss: true,
              })
              setloadingTop(false)
            })
        } catch (error) {
          addToast(error.response?.data?.message, {
            appearance: 'error',
            autoDismiss: true,
          })
          setloadingTop(false)
        }
      }
    })
  }

  React.useEffect(() => {
    //
    //
  }, [alertIds])
  // }, [alertIds, checked, checkedValues])

  const [checked, setChecked] = React.useState(null)
  const [checkedValues, setCheckedValues] = React.useState([])

  const getAllAdAlertIdsHandler = () => {
    let ids = []
    if (!checked) {
      adAlerts.map((adAlert) => {
        ids.push(adAlert._id)
      })
      setAlertIds(ids)
    } else {
      setAlertIds([])
    }
  }

  return (
    <section className="bg-themeWhiteLight pb-28 h-screen">
      <div className="container mx-auto px-5 sm:px-0">
        <div className="pt-7">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-themeBlackAlt">Ad Alert</p>
            <button className="bg-themePrimary rounded px-7 py-3">
              <Link href="/dashboard/ad-alert/new-alert">
                <a className="text-base font-semibold text-white">
                  Add New Alert
                </a>
              </Link>
            </button>
          </div>

          <div className="flex gap-2 pt-8 pb-4">
            <button
              type="submit"
              className="bg-white p-3 rounded  group hover:bg-themePrimary"
              onClick={() => {
                disableMultiAlerts(alertIds)
              }}
            >
              <BsEyeSlash className="text-themeWhiteLighter text-xl group-hover:text-white" />
            </button>
            <button
              className="bg-white p-3 rounded group hover:bg-themeRedLight"
              onClick={() => {
                deleteMultiAlerts(alertIds)
              }}
            >
              <HiOutlineTrash className="text-themeWhiteLighter text-xl group-hover:text-white" />
            </button>
            {/* <button
                            onClick={() => {
                                setChecked((c) => !c)
                                getAllAdAlertIdsHandler()
                            }}
                        >toggle</button> */}
          </div>
        </div>

        <div className="hidden sm:flex flex-col ">
          <AlertTableLarge
            adAlerts={adAlerts}
            adAlertsError={adAlertsError}
            alertIds={alertIds}
            setAlertIds={setAlertIds}
            loadingTop={loadingTop}
            checked={checked}
            setChecked={setChecked}
            setCheckedValues={setCheckedValues}
            getAllAdAlertIdsHandler={getAllAdAlertIdsHandler}
          />
        </div>
      </div>

      {/* mobile viewBox */}
      <div className="sm:hidden px-5 pt-10 sm:pt-0">
        <div className="w-fit pb-6">
          <label htmlFor="select">
            <p className="text-base font-bold text-white bg-themePrimary py-3 px-6 rounded-lg cursor-pointer">
              Select all
            </p>
            <input
              value="select"
              id="select"
              type="checkbox"
              className="hidden"
            />
          </label>
        </div>
        <AlertTableSmall
          adAlerts={adAlerts}
          adAlertsError={adAlertsError}
          alertIds={alertIds}
          setAlertIds={setAlertIds}
          loadingTop={loadingTop}
        />
      </div>
    </section>
  )
}

export default AdAlertMain
