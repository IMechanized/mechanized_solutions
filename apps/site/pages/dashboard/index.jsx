import Head from 'next/head';
import useSWR from 'swr';
import BuyerCount from '../../src/components/dashboard/common-dashboard/dashboard-count/buyer-count';
import SellerCount from '../../src/components/dashboard/common-dashboard/dashboard-count/seller-count';
import SuperAdminCount from '../../src/components/dashboard/common-dashboard/dashboard-count/super-admin-count';
import Messages from '../../src/components/dashboard/common-dashboard/messages';
import Notification from '../../src/components/dashboard/common-dashboard/notification';
import UserInfo from '../../src/components/dashboard/common-dashboard/user-info';
import DashboardLayout from '../../src/components/dashboard/dashboard-layout';
import useUser, { UserNotLogin } from '../../src/lib/user';
import { authAxios } from '../../src/utils/axiosKits';

const fetcher = (url) => authAxios(url).then((res) => res.data.data);

const Dashboard = () => {
    const {
        user,
        isBuyer,
        isSeller,
        isAdmin,
        isSuperAdmin,
        loggedIn,
        loggedOut,
    } = useUser();
    const userData = user?.data;
    const adminEntry = isSuperAdmin || isAdmin;

    const { data: statisticsData, error: statisticsError } = useSWR(
        '/user/dashboard/statistics',
        fetcher,
        {
            refreshInterval: 0,
        },
    );

    // const loggedOut = false

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            {loggedOut && <UserNotLogin />}
            {userData && loggedIn && (
                <DashboardLayout>
                    <section className="pb-36">
                        <h1 className="text-2xl font-bold text-themeBlackDarker">
                            Dashboard
                        </h1>

                        {!userData ||
                            (!statisticsData && (
                                // <LoaderPage />
                                <div className="absolute w-full h-full bg-[#ffffffd0] z-40 flex justify-center items-center">
                                    <div className="flex  items-center justify-center space-x-2 animate-pulse">
                                        <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                        <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                        <div className="w-8 h-8 bg-themePrimary rounded-full"></div>
                                    </div>
                                </div>
                            ))}

                        {isBuyer && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 pt-10">
                                {statisticsData &&
                                    statisticsData.map((stat, index) => (
                                        <BuyerCount key={index} stat={stat} />
                                    ))}
                            </div>
                        )}

                        {isSeller && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 pt-10">
                                {statisticsData &&
                                    statisticsData.map((stat, index) => (
                                        <SellerCount key={index} stat={stat} />
                                    ))}
                            </div>
                        )}

                        {adminEntry && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7 pt-10">
                                {statisticsData &&
                                    statisticsData.map((stat, index) => (
                                        <SuperAdminCount
                                            key={index}
                                            stat={stat}
                                        />
                                    ))}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-7 pt-12">
                            <UserInfo />
                            <Notification />
                            <Messages />
                        </div>
                    </section>
                </DashboardLayout>
            )}
        </>
    );
};

export default Dashboard;
