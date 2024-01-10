import React from 'react';
import useUser from '../../../../lib/user';
import Image from '../../../../optimize/image';
import PasswordChange from './password-change';
import ProfileForm from './profile-form';
import SocialLink from './social-link';
import UserAbout from './user-about';

const ProfileEdit = () => {
  const [active, setActive] = React.useState(1);
  const { isSuperAdmin, isAdmin } = useUser();
  const adminLayout = isAdmin || isSuperAdmin;

  return (
    <section className="pt-10 pb-32 min-h-screen">
      <div className={` ${adminLayout ? '' : 'container mx-auto '}`}>
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-4 xl:col-span-1">
            <div className="block space-y-3 bg-white rounded-md p-6">
              <button
                onClick={() => setActive(1)}
                className={`w-full py-3 rounded-md text-left px-5 ${active === 1
                  ? "bg-themePrimary text-white "
                  : "bg-white text-themeBlackDarker"
                  }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActive(2)}
                className={`w-full py-3 rounded-md text-left px-5 ${active === 2
                  ? "bg-themePrimary text-white "
                  : "bg-white text-themeBlackDarker"
                  }`}
              >
                Social Media
              </button>
              <button
                onClick={() => setActive(3)}
                className={`w-full py-3 rounded-md text-left px-5 ${active === 3
                  ? "bg-themePrimary text-white "
                  : "bg-white text-themeBlackDarker"
                  }`}
              >
                About Me
              </button>
              <button
                onClick={() => setActive(4)}
                className={`w-full py-3 rounded-md text-left px-5 ${active === 4
                  ? "bg-themePrimary text-white "
                  : "bg-white text-themeBlackDarker"
                  }`}
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="col-span-4 xl:col-span-3 bg-white rounded-lg p-6 sm:p-10 ">
            {(active === 1 && (
              <ProfileForm />
            )) ||
              (active === 2 && (
                <div>
                  <h3 className="text-sm font-semibold text-themeBlackDarker pb-8 uppercase ">
                    Social media
                  </h3>
                  <SocialLink />
                </div>)) ||
              (active === 3 && (
                <div >
                  <p className="text-sm font-semibold text-themeBlackDarker pb-6">
                    About Me
                  </p>
                  <UserAbout />
                </div>
              )) ||
              (active === 4 && (
                <div>
                  <h3 className="text-sm font-semibold text-themeBlackDarker pb-8 uppercase ">
                    Change Password
                  </h3>
                  <PasswordChange />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;