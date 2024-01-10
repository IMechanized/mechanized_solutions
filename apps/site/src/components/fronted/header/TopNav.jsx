import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Skeleton from 'react-loading-skeleton';
import { ThemeContext } from "../../../context/ThemeContext";
import useUser from "../../../lib/user";
import { Axios } from "../../../utils/axiosKits";

const fetcher = (url) => Axios(url).then(res => res.data.data);
const announcementAPI = "/admin/announcement";

const TopNav = () => {
  const { LoginPopupHandler, RegisterPopupHandler, frontendLogOutHandler } = React.useContext(ThemeContext);
  const { user, loggedIn } = useUser();
  const userData = user?.data;
  const router = useRouter();
  let path = router.asPath.split(",");
  path = path[path.length - 1];

  const { data, error } = useSWR(announcementAPI, fetcher);

  return (
    <div className="fixed z-40  bg-white border-b border-gray-200  w-full">
      <div className="container mx-auto px-4 sm:px-0 ">
        <div className="flex justify-between flex-wrap text-center sm:text-inherit items-center h-11">
          <p className="text-sm text-themeBlackAlt">
            {data && data !== '' && !error && (
              <>
                <span className="text-themePrimary font-bold">Announcement :</span> {data}
              </>
            )}
            {!data && !error && (
              <>
                <Skeleton width={150} />
              </>
            )}
          </p>

          {!userData && (
            <ul className="flex items-center justify-center text-center mt-3 sm:mt-0">
              <li>
                {path === "/login" || path === "/sign-up" ? (
                  <Link href="/login">
                    <a className="text-sm text-themeBlackAlt">Login</a>
                  </Link>
                ) : (
                  <button
                    onClick={LoginPopupHandler}
                    className="text-sm text-themeBlackAlt">
                    Login
                  </button>
                )}
              </li>
              <li>
                <span className="ml-4 mr-4 h-4 w-px bg-themeWhiteLight 2 flex"></span>
              </li>
              <li>
                {path === "/login" || path === "/sign-up" ? (
                  <Link href="/sign-up">
                    <a className="text-sm text-themeBlackAlt">Registration</a>
                  </Link>
                ) : (
                  <button
                    onClick={RegisterPopupHandler}
                    className="text-sm text-themeBlackAlt">
                    Registration
                  </button>
                )}
              </li>
            </ul>
          )}

          {/* {userData && loggedIn ? (
            <div className="flex items-center">
              <Link href="/dashboard">
                <a className="text-themeBlack font-bold text-sm">
                  <span className="text-themePrimary font-bold">{userData?.fullName?.firstName}</span>
                </a>
              </Link>
              <button
                className="ml-4 text-themeBlack font-bold text-sm"
                onClick={frontendLogOutHandler}
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex items-center justify-center text-center mt-3 sm:mt-0">
              <li>
                {path === "/login" || path === "/sign-up" ? (
                  <Link href="/login">
                    <a className="text-sm text-themeBlackAlt">Login</a>
                  </Link>
                ) : (
                  <button
                    onClick={LoginPopupHandler}
                    className="text-sm text-themeBlackAlt">
                    Login
                  </button>
                )}
              </li>
              <li>
                <span className="ml-4 mr-4 h-4 w-px bg-themeWhiteLight 2 flex"></span>
              </li>
              <li>
                {path === "/login" || path === "/sign-up" ? (
                  <Link href="/sign-up">
                    <a className="text-sm text-themeBlackAlt">Registration</a>
                  </Link>
                ) : (
                  <button
                    onClick={RegisterPopupHandler}
                    className="text-sm text-themeBlackAlt">
                    Registration
                  </button>
                )}
              </li>
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
