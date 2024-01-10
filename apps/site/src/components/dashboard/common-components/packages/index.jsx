import React from 'react'
import Link from 'next/link'
import useSWR, { useSWRConfig } from 'swr'
import { FiCheckCircle } from 'react-icons/fi'
import { FaRegTimesCircle } from 'react-icons/fa'
import useUser from '../../../../lib/user'
import { Axios } from '../../../../utils/axiosKits'
import SinglePackage from './single-package'
import _ from 'lodash'
import { LoaderPage } from '../../../../lib/loader'

const fetcher = (url) => Axios(url).then((res) => res.data.data)

const Packages = () => {
  const [loading, setLoading] = React.useState(false)
  const {
    user,
    isBuyer,
    isSeller,
    isAdmin,
    isSuperAdmin,
    loggedIn,
    loggedOut,
  } = useUser()
  const adminEntry = isSuperAdmin || isAdmin

  const { mutate } = useSWRConfig({
    refreshInterval: 0,
  })

  const { data: packageData, error: packageError } = useSWR(
    '/package/ads',
    fetcher,
    {
      refreshInterval: 0,
    }
  )

  // const isSeller = false
  // const isSuperAdmin = true

  return (
    <section>
      <div className="pb-32">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-5 sm:gap-0">
          <h1 className="text-2xl font-bold text-themeBlackDarker">Packages</h1>
          {adminEntry && (
            <Link href="/dashboard/packages/add-package">
              <a>
                <button className="text-base font-semibold text-white rounded bg-themeSecondary py-3 px-7">
                  Add New Package
                </button>
              </a>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-6  2xl:grid-cols-10 gap-5 lg:gap-3 xl:gap-8 2xl:gap-16 pt-12">
          {!packageData && <LoaderPage />}
          {loading && <LoaderPage />}

          {/* Single package */}
          {packageData &&
            !packageError &&
            _.map(packageData, (item, index) => {
              return (
                <SinglePackage
                  item={item}
                  key={index}
                  loading={loading}
                  setLoading={setLoading}
                  mutate={mutate}
                />
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Packages
