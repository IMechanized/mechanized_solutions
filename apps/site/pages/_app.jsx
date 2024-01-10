
import { ToastProvider } from "react-toast-notifications";
import 'react-loading-skeleton/dist/skeleton.css';
import PopupLogin from "../src/components/fronted/register/popup-login";
import PopupRegister from "../src/components/fronted/register/popup-register";
import ThemeContextProvider from "../src/context/ThemeContext";
import "../styles/globals.css";
import LostPassword from "../src/components/fronted/register/lost-password";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
        <PopupRegister />
        <PopupLogin />
        <LostPassword />
      </ThemeContextProvider>
    </ToastProvider>
  );
}

export default MyApp;
