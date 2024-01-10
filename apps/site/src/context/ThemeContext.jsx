import React, { createContext } from "react";
import { useToasts } from "react-toast-notifications";
import useSWR from "swr";
import useUser from "../lib/user";
import { useRouter } from 'next/router'
import { authAxios, Axios } from "../utils/axiosKits";
import { localRemove } from "../utils/localStorage";

export const ThemeContext = createContext();

const fetcher = (url) => Axios(url).then((res) => res.data.data);
const authFetcher = (url) => authAxios(url).then((res) => res.data.data);

const topLocationAPI = "/admin/topLocations";
const adsCategoryAPI = "/ads/category";
const filtersAPI = "/admin/filters";

const ThemeContextProvider = ({ children }) => {
    const [LoginPopup, setLoginPopup] = React.useState(false); // Login Popup
    const [RegisterPopup, setRegisterPopup] = React.useState(false); // register popup
    const [lostPasswordShow, setLostPasswordShow] = React.useState(false); // lost password popup
    const { addToast } = useToasts();
    const router = useRouter();
    const { user, loggedOut, loggedIn, mutate } = useUser();

    const {
        data: topLocationData,
        error: topLocationError,
        mutate: topLocationMutate,
    } = useSWR(topLocationAPI, fetcher, {
        revalidateOnFocus: false,
    });

    const {
        data: adsCategoryData,
        error: adsCategoryError,
        mutate: adsCategoryMutate,
    } = useSWR(adsCategoryAPI, fetcher, {
        revalidateOnFocus: false,
    });

    const {
        data: filtersData,
        error: filtersError,
        mutate: filtersMutate,
    } = useSWR(filtersAPI, fetcher, {
        revalidateOnFocus: false,
    });

    // user notification data fetching hooks
    const { data: recentNotification, error: recentNotificationError } = useSWR(
        loggedIn && `/users/notifications/catalog`,
        authFetcher
    );

    const LoginPopupHandler = () => {
        setLoginPopup(!LoginPopup);
    };

    const RegisterPopupHandler = () => {
        setRegisterPopup(!RegisterPopup);
    };

    const logOutHandler = async () => {
        await authAxios({
            method: "DELETE",
            url: `/user/session`,
        })
            .then((res) => {
                addToast(res.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
        await localRemove("UserData");
        await mutate(null);
        await router.replace("/login");
    };

    const frontendLogOutHandler = async () => {
        await authAxios({
            method: "DELETE",
            url: `/user/session`,
        })
            .then((res) => {
                addToast(res.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
        await localRemove("UserData");
        await mutate(null);
    };

    const lostPasswordHandler = () => {
        setLostPasswordShow(!lostPasswordShow);
        setLoginPopup(false);
    };

    return (
        <ThemeContext.Provider
            value={{
                LoginPopup,
                LoginPopupHandler,
                setLoginPopup,
                RegisterPopup,
                RegisterPopupHandler,
                setRegisterPopup,
                lostPasswordShow,
                lostPasswordHandler,
                frontendLogOutHandler,
                logOutHandler,
                topLocationData,
                topLocationError,
                topLocationMutate,
                adsCategoryData,
                adsCategoryError,
                adsCategoryMutate,
                filtersData,
                filtersError,
                filtersMutate,
                recentNotification,
                recentNotificationError,
                loggedIn,

            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;