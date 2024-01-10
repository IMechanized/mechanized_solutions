import React from 'react';
import { Loader } from '../../../lib/loader';
import useUser from '../../../lib/user';
import SideNavBar from '../super-admin/Side-NavBar';
import {
    sideAdminMenu,
    sideBuyerMenu,
    sideSellerMenu,
} from '../super-admin/Side-NavBar/menu';
import SuperAdminNavbar from '../super-admin/superadmin-navbar';

const menu = [
    {
        id: 1,
        name: 'Home',
        link: '/',
    },
    {
        id: 2,
        name: 'Browse All Ads',
        link: '/all-ads',
    },
    {
        id: 3,
        name: 'Category',
        link: '/category',
    },
    {
        id: 4,
        name: 'Sellers',
        link: '/sellers',
    },
    {
        id: 5,
        name: 'New & Blog',
        link: '/news-blog',
    },
    {
        id: 6,
        name: 'Contact Us',
        link: '/contact-us',
    },
];

const DashboardLayout = ({ children }) => {
    const {
        user,
        loggedIn,
        loggedOut,
        isBuyer,
        isSeller,
        isAdmin,
        isSuperAdmin,
    } = useUser();

    // const isSuperAdmin = false;
    // const isBuyer = false;
    // const isSeller = true;

    const [isOpen, isClose] = React.useState(false);

    const adminEntry = isSuperAdmin || isAdmin;

    const menu = adminEntry
        ? sideAdminMenu
        : isBuyer
        ? sideBuyerMenu
        : sideSellerMenu;

    if (adminEntry || isSeller || isBuyer || loggedIn) {
        return (
            <section className="bg-themeWhiteLight min-h-screen">
                {/* side nav */}
                <SideNavBar isOpen={isOpen} isClose={isClose} menu={menu} />

                {/* top nav */}
                <SuperAdminNavbar isOpen={isOpen} isClose={isClose} />

                {/* main content */}
                <div className="md:ml-56 lg:ml-80 mt-20">
                    <div className="pt-10 pb-1 px-4 md:!px-8 relative">
                        <main>{children}</main>
                    </div>
                </div>
            </section>
        );
    }

    return <Loader />;
};

export default DashboardLayout;
