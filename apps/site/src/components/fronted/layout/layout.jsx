import React from "react";
import Footer from "../footer/Footer";
import MainNavBar from "../header/MainNavBar";
import TopNav from "../header/TopNav";


const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <MainNavBar />
      <main className="pt-32">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
