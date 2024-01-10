import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import {
  AiOutlineBars,
} from 'react-icons/ai'
import { RiQuestionLine } from 'react-icons/ri'
import { ThemeContext } from '../../../context/ThemeContext'
import useUser from '../../../lib/user'
import Image from '../../../optimize/image'
import Notification from '../../dashboard/super-admin/superadmin-navbar/notification'
import UserAddPost from '../../dashboard/super-admin/superadmin-navbar/user-addPost'
import {loginMenu, menuList} from "./header_data";
import Logo from "./Logo";

const MainNavBar = () => {
  const { LoginPopupHandler, RegisterPopupHandler, frontendLogOutHandler } =
    React.useContext(ThemeContext)
  const [open, close] = React.useState(false)
  const { user, loggedIn, isBuyer } = useUser()

  const userData = user?.data
  const avatarUrl = userData?.avatar ? userData?.avatar : '/Rectangle0.png'

  const [login, SetLogin] = React.useState(false)

  // const [isSuperAdmin, NotSuperAdmin] = React.useState(false);

  const router = useRouter()

  return (
    <div className="relative">
      <section
        className={`fixed w-full py-7 bg-white shadow-boxShadow z-50  top-[45px]`}
      >
        {/* <section className={`fixed w-full py-7 bg-white shadow-boxShadow z-50 px-6 sm:px-0 ${isSuperAdmin ? 'top-0' : 'top-11 '}`}> */}
        <nav className="container mx-auto px-6 sm:px-0">
          <div className="flex items-center justify-between relative">
            <div className="flex items-start sm:items-center">
              <div className="lg:w-auto lg:pr-0 xl:w-72">
                <Logo />
              </div>

              {/* main nav  */}
              <div className="hidden xl:block ml-10">
                <div className="flex items-center">
                  <ul className="flex items-center gap-4">
                    {menuList.map((item, index) => (
                      <li key={index}>
                        <Link href={item.link}>
                          <a
                            className={`text-base transition duration-300 ease-in-out hover:text-themePrimary relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bg-themeSecondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out hover:before:w-1/2 ${
                              router.asPath === item.link
                                ? 'font-bold text-themePrimary before:absolute before:content[``] before:h-[2px] before:bg-themeSecondary before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:transition-all before:duration-300 before:ease-in-out before:w-1/2'
                                : 'font-normal text-themeBlackAlt '
                            }`}
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* notification  */}
            <div className="flex items-center gap-3 xl:gap-5 absolute right-0">
              {loggedIn && userData && (
                <>
                  <Notification />
                </>
              )}

              {loggedIn && userData ? (
                isBuyer ? (
                  <div className="hidden sm:block">
                    <Link href="/dashboard/favourite-ads">
                      <a>
                        <button className="text-base md:font-semibold text-white bg-themeSecondary py-2 px-4 md:py-3 md:px-7 rounded">
                          Favourite Ads
                        </button>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="hidden sm:block">
                    <Link href="/dashboard/ads/new-ads">
                      <a>
                        <button className="text-base md:font-semibold text-white bg-themeSecondary py-2 px-4 md:py-3 md:px-7 rounded">
                          Post Your Ad
                        </button>
                      </a>
                    </Link>
                  </div>
                )
              ) : (
                <div className="hidden sm:block">
                  <button
                    className="text-base md:font-semibold text-white bg-themeSecondary py-2 px-4 md:py-3 md:px-7 rounded"
                    onClick={LoginPopupHandler}
                  >
                    Post Your Ad
                  </button>
                </div>
              )}

              {/* user image button  */}
              {loggedIn && userData && (
                <>
                  <UserAddPost />
                </>
              )}

              <div
                onClick={() => close(!open)}
                className="bg-themePrimary cursor-pointer rounded xl:hidden w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center mt-1"
              >
                <AiOutlineBars className="text-2xl sm:text-2xl text-white" />
              </div>
            </div>

            {/* <!-- menu for small devices --> */}
            <div
              className={`block xl:hidden fixed w-full bg-themePrimary top-0 bottom-0 pt-7 z-30 rounded h-auto overflow-y-auto right-0 ease-in-out duration-300  ${
                open ? 'translate-x-0' : `translate-x-full`
              }`}
            >
              <div className="flex justify-between pb-7 px-7">
                <h2 className="text-xl text-white font-bold ">Meta Ads</h2>
                <svg
                  onClick={() => close(!open)}
                  className="cursor-pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.17499 7.00015L13.425 1.75849C13.5819 1.60157 13.6701 1.38874 13.6701 1.16682C13.6701 0.944903 13.5819 0.732074 13.425 0.575155C13.2681 0.418235 13.0552 0.330078 12.8333 0.330078C12.6114 0.330078 12.3986 0.418235 12.2417 0.575155L6.99999 5.82515L1.75832 0.575155C1.6014 0.418235 1.38857 0.330078 1.16666 0.330078C0.944739 0.330078 0.73191 0.418235 0.57499 0.575155C0.41807 0.732074 0.329914 0.944903 0.329914 1.16682C0.329914 1.38874 0.41807 1.60157 0.57499 1.75849L5.82499 7.00015L0.57499 12.2418C0.496883 12.3193 0.434888 12.4115 0.392581 12.513C0.350273 12.6146 0.328491 12.7235 0.328491 12.8335C0.328491 12.9435 0.350273 13.0524 0.392581 13.154C0.434888 13.2555 0.496883 13.3477 0.57499 13.4252C0.652459 13.5033 0.744626 13.5653 0.846176 13.6076C0.947725 13.6499 1.05665 13.6717 1.16666 13.6717C1.27667 13.6717 1.38559 13.6499 1.48714 13.6076C1.58869 13.5653 1.68085 13.5033 1.75832 13.4252L6.99999 8.17515L12.2417 13.4252C12.3191 13.5033 12.4113 13.5653 12.5128 13.6076C12.6144 13.6499 12.7233 13.6717 12.8333 13.6717C12.9433 13.6717 13.0523 13.6499 13.1538 13.6076C13.2554 13.5653 13.3475 13.5033 13.425 13.4252C13.5031 13.3477 13.5651 13.2555 13.6074 13.154C13.6497 13.0524 13.6715 12.9435 13.6715 12.8335C13.6715 12.7235 13.6497 12.6146 13.6074 12.513C13.5651 12.4115 13.5031 12.3193 13.425 12.2418L8.17499 7.00015Z"
                    fill="white"
                  />
                </svg>
              </div>

              <hr className=" text-white opacity-20" />

              <div className="grid ">
                <ul className="space-y-5 px-7 pt-10">
                  {menuList.map((item, index) => (
                    <li key={index} onClick={() => close(!open)}>
                      <Link href={item.link} passHref={false}>
                        <a className="flex gap-5 items-center">
                          {item.icon}
                          <p className="text-base text-white font-semibold">
                            {item.name}
                          </p>
                        </a>
                      </Link>
                    </li>
                  ))}
                  <hr className="opacity-20" />

                  {/* Login menu  */}
                  {loggedIn && userData && (
                    <>
                      {loginMenu.map((item, index) => (
                        <li className="md:hidden" key={index}>
                          <Link href={item.link}>
                            <a className="flex gap-5 items-center">
                              {item.icon}
                              <p className="text-base text-white font-semibold">
                                {item.name}
                              </p>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </>
                  )}

                  {/* Help & Support */}
                  <li>
                    <Link href="#">
                      <a className="flex gap-5 items-center">
                        <RiQuestionLine className="text-xl text-white" />
                        <p className="text-base text-white font-semibold">
                          Help &amp; Support
                        </p>
                      </a>
                    </Link>
                  </li>

                  {/* Logout */}
                  {loggedIn && userData && (
                    <li>
                      <button
                        className="flex gap-7 items-center"
                        onClick={() => {
                          close(!open)
                          frontendLogOutHandler()
                        }}
                      >
                        <svg
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.333984 9.00033C0.333984 9.22134 0.421782 9.4333 0.578062 9.58958C0.734342 9.74586 0.946304 9.83366 1.16732 9.83366H7.49232L5.57565 11.742C5.49754 11.8195 5.43555 11.9116 5.39324 12.0132C5.35093 12.1147 5.32915 12.2236 5.32915 12.3337C5.32915 12.4437 5.35093 12.5526 5.39324 12.6541C5.43555 12.7557 5.49754 12.8479 5.57565 12.9253C5.65312 13.0034 5.74529 13.0654 5.84684 13.1077C5.94839 13.15 6.05731 13.1718 6.16732 13.1718C6.27733 13.1718 6.38625 13.15 6.4878 13.1077C6.58935 13.0654 6.68151 13.0034 6.75898 12.9253L10.0923 9.59199C10.1682 9.51274 10.2277 9.41929 10.2673 9.31699C10.3507 9.11411 10.3507 8.88654 10.2673 8.68366C10.2277 8.58137 10.1682 8.48791 10.0923 8.40866L6.75898 5.07533C6.68128 4.99763 6.58904 4.93599 6.48752 4.89394C6.38601 4.85189 6.2772 4.83025 6.16732 4.83025C6.05743 4.83025 5.94863 4.85189 5.84711 4.89394C5.74559 4.93599 5.65335 4.99763 5.57565 5.07533C5.49795 5.15302 5.43632 5.24527 5.39427 5.34678C5.35222 5.4483 5.33057 5.55711 5.33057 5.66699C5.33057 5.77688 5.35222 5.88568 5.39427 5.9872C5.43632 6.08872 5.49795 6.18096 5.57565 6.25866L7.49232 8.16699H1.16732C0.946304 8.16699 0.734342 8.25479 0.578062 8.41107C0.421782 8.56735 0.333984 8.77931 0.333984 9.00033ZM11.1673 0.666992H2.83398C2.17094 0.666992 1.53506 0.930384 1.06622 1.39923C0.597377 1.86807 0.333984 2.50395 0.333984 3.16699V5.66699C0.333984 5.88801 0.421782 6.09997 0.578062 6.25625C0.734342 6.41253 0.946304 6.50033 1.16732 6.50033C1.38833 6.50033 1.60029 6.41253 1.75657 6.25625C1.91285 6.09997 2.00065 5.88801 2.00065 5.66699V3.16699C2.00065 2.94598 2.08845 2.73402 2.24473 2.57774C2.40101 2.42146 2.61297 2.33366 2.83398 2.33366H11.1673C11.3883 2.33366 11.6003 2.42146 11.7566 2.57774C11.9129 2.73402 12.0007 2.94598 12.0007 3.16699V14.8337C12.0007 15.0547 11.9129 15.2666 11.7566 15.4229C11.6003 15.5792 11.3883 15.667 11.1673 15.667H2.83398C2.61297 15.667 2.40101 15.5792 2.24473 15.4229C2.08845 15.2666 2.00065 15.0547 2.00065 14.8337V12.3337C2.00065 12.1126 1.91285 11.9007 1.75657 11.7444C1.60029 11.5881 1.38833 11.5003 1.16732 11.5003C0.946304 11.5003 0.734342 11.5881 0.578062 11.7444C0.421782 11.9007 0.333984 12.1126 0.333984 12.3337V14.8337C0.333984 15.4967 0.597377 16.1326 1.06622 16.6014C1.53506 17.0703 2.17094 17.3337 2.83398 17.3337H11.1673C11.8304 17.3337 12.4662 17.0703 12.9351 16.6014C13.4039 16.1326 13.6673 15.4967 13.6673 14.8337V3.16699C13.6673 2.50395 13.4039 1.86807 12.9351 1.39923C12.4662 0.930384 11.8304 0.666992 11.1673 0.666992Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-base text-white font-semibold">
                          Logout
                        </p>
                      </button>
                    </li>
                  )}

                  {/* Post Your Ad */}
                  <div className="pt-4 sm:hidden">
                    <Link href="/dashboard/ads/new-ads">
                      <a>
                        <button className="text-base md:font-semibold text-white bg-themeSecondary py-2 px-4 md:py-3 md:px-7 rounded w-full">
                          Post Your Ad
                        </button>
                      </a>
                    </Link>
                  </div>
                </ul>

                {/* User | login/registration  */}
                {loggedIn && userData ? (
                  <div className="w-full px-7 fixed left-0 right-0 bottom-0 bg-[#057671] ">
                    <div className="flex  items-center justify-between w-full py-4">
                      <div className="flex items-center gap-4">
                        <Image
                          width={40}
                          height={40}
                          src={avatarUrl}
                          alt="user-image"
                          className="rounded-lg"
                        />
                        <div>
                          <Link href="/dashboard">
                            <a className="text-base font-semibold text-white whitespace-nowrap">
                              {userData?.fullName?.firstName}
                            </a>
                          </Link>
                          <p className="tex-sm font-normal text-white capitalize">
                            {userData?.packageDetails?.packageName} Seller
                          </p>
                        </div>
                      </div>
                      <button>
                        <Link href="/dashboard">
                          <a>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5833 10.5505C16.4497 10.3984 16.3761 10.2029 16.3761 10.0005C16.3761 9.79806 16.4497 9.60256 16.5833 9.45048L17.65 8.25048C17.7675 8.11937 17.8405 7.9544 17.8585 7.77924C17.8765 7.60407 17.8385 7.42772 17.75 7.27548L16.0833 4.39215C15.9957 4.24008 15.8624 4.11955 15.7023 4.04772C15.5422 3.9759 15.3635 3.95645 15.1917 3.99215L13.625 4.30882C13.4256 4.35001 13.2181 4.31681 13.0416 4.21548C12.865 4.11416 12.7317 3.95172 12.6667 3.75882L12.1583 2.23382C12.1024 2.0683 11.9959 1.92454 11.8539 1.82285C11.7118 1.72116 11.5414 1.6667 11.3667 1.66715H8.03333C7.85161 1.65766 7.67177 1.70792 7.5213 1.81024C7.37082 1.91257 7.25798 2.06133 7.2 2.23382L6.73333 3.75882C6.66833 3.95172 6.53497 4.11416 6.35842 4.21548C6.18187 4.31681 5.97434 4.35001 5.77499 4.30882L4.16666 3.99215C4.00379 3.96913 3.83774 3.99483 3.68945 4.06602C3.54116 4.1372 3.41725 4.25067 3.33333 4.39215L1.66666 7.27548C1.57596 7.42602 1.53518 7.60139 1.55015 7.7765C1.56511 7.95162 1.63506 8.11752 1.74999 8.25048L2.80833 9.45048C2.94193 9.60256 3.01561 9.79806 3.01561 10.0005C3.01561 10.2029 2.94193 10.3984 2.80833 10.5505L1.74999 11.7505C1.63506 11.8834 1.56511 12.0493 1.55015 12.2245C1.53518 12.3996 1.57596 12.5749 1.66666 12.7255L3.33333 15.6088C3.42091 15.7609 3.55426 15.8814 3.71437 15.9532C3.87448 16.0251 4.05318 16.0445 4.225 16.0088L5.79166 15.6922C5.99101 15.651 6.19854 15.6842 6.37509 15.7855C6.55164 15.8868 6.685 16.0492 6.75 16.2422L7.25833 17.7672C7.31631 17.9396 7.42916 18.0884 7.57963 18.1907C7.73011 18.293 7.90994 18.3433 8.09166 18.3338H11.425C11.5997 18.3343 11.7701 18.2798 11.9122 18.1781C12.0542 18.0764 12.1608 17.9327 12.2167 17.7672L12.725 16.2422C12.79 16.0492 12.9234 15.8868 13.0999 15.7855C13.2765 15.6842 13.484 15.651 13.6833 15.6922L15.25 16.0088C15.4218 16.0445 15.6005 16.0251 15.7606 15.9532C15.9207 15.8814 16.0541 15.7609 16.1417 15.6088L17.8083 12.7255C17.8968 12.5732 17.9348 12.3969 17.9168 12.2217C17.8989 12.0466 17.8259 11.8816 17.7083 11.7505L16.5833 10.5505ZM15.3417 11.6672L16.0083 12.4171L14.9417 14.2672L13.9583 14.0672C13.3581 13.9445 12.7338 14.0464 12.2038 14.3537C11.6738 14.6609 11.2751 15.152 11.0833 15.7338L10.7667 16.6672H8.63333L8.33333 15.7172C8.14154 15.1354 7.74281 14.6442 7.21283 14.337C6.68285 14.0298 6.05851 13.9278 5.45833 14.0505L4.47499 14.2505L3.39166 12.4088L4.05833 11.6588C4.46829 11.2005 4.69494 10.6071 4.69494 9.99215C4.69494 9.37721 4.46829 8.78383 4.05833 8.32548L3.39166 7.57548L4.45833 5.74215L5.44166 5.94215C6.04185 6.06483 6.66618 5.96288 7.19617 5.65565C7.72615 5.34841 8.12487 4.85728 8.31666 4.27548L8.63333 3.33382H10.7667L11.0833 4.28382C11.2751 4.86561 11.6738 5.35675 12.2038 5.66398C12.7338 5.97122 13.3581 6.07317 13.9583 5.95048L14.9417 5.75048L16.0083 7.60048L15.3417 8.35048C14.9363 8.80778 14.7125 9.39772 14.7125 10.0088C14.7125 10.6199 14.9363 11.2099 15.3417 11.6672ZM9.7 6.66715C9.04072 6.66715 8.39626 6.86265 7.84809 7.22892C7.29993 7.59519 6.87269 8.11578 6.6204 8.72487C6.3681 9.33396 6.30209 10.0042 6.43071 10.6508C6.55933 11.2974 6.8768 11.8913 7.34297 12.3575C7.80915 12.8237 8.40309 13.1412 9.04969 13.2698C9.6963 13.3984 10.3665 13.3324 10.9756 13.0801C11.5847 12.8278 12.1053 12.4005 12.4716 11.8524C12.8378 11.3042 13.0333 10.6598 13.0333 10.0005C13.0333 9.11643 12.6821 8.26858 12.057 7.64346C11.4319 7.01834 10.5841 6.66715 9.7 6.66715ZM9.7 11.6672C9.37036 11.6672 9.04813 11.5694 8.77404 11.3863C8.49996 11.2031 8.28634 10.9428 8.1602 10.6383C8.03405 10.3337 8.00104 9.99863 8.06535 9.67533C8.12966 9.35203 8.2884 9.05506 8.52148 8.82197C8.75457 8.58888 9.05154 8.43015 9.37485 8.36584C9.69815 8.30153 10.0333 8.33454 10.3378 8.46068C10.6423 8.58683 10.9026 8.80045 11.0858 9.07453C11.2689 9.34861 11.3667 9.67085 11.3667 10.0005C11.3667 10.4425 11.1911 10.8664 10.8785 11.179C10.5659 11.4916 10.142 11.6672 9.7 11.6672Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </Link>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="fixed left-0 right-0 bottom-20 w-full px-7">
                    <div className="flex gap-4 justify-between w-full">
                      <button
                        className="py-3 px-6 bg-white rounded-lg"
                        onClick={() => {
                          close(!open)
                          LoginPopupHandler()
                        }}
                      >
                        <a className="text-base font-semibold text-themePrimary">
                          Login
                        </a>
                      </button>
                      <button
                        className="py-3 px-6 border border-white rounded-lg"
                        onClick={() => {
                          close(!open)
                          RegisterPopupHandler()
                        }}
                      >
                        <a className="text-base font-semibold text-white">
                          Registration
                        </a>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default MainNavBar
