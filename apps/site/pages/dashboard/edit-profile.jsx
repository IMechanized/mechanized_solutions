import Head from 'next/head';
import ProfileEdit from '../../src/components/dashboard/common-components/edit-profile.js/index.jsx';
import DashboardLayout from '../../src/components/dashboard/dashboard-layout/index.jsx';
import useUser, { UserNotLogin } from '../../src/lib/user.jsx';

const EditProfile = () => {
    const { user, loggedIn, loggedOut } = useUser();
    const userData = user?.data;

    return (
        <>
            <Head>
                <title>Edit Profile</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            {loggedOut && <UserNotLogin />}
            {userData && loggedIn && (
                <DashboardLayout>
                    <ProfileEdit />
                </DashboardLayout>
            )}
        </>
    );
};

export default EditProfile;
