import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SellerNavbar = () => {
    const router = useRouter();

    return (
        <section className="mt-24 bg-white  shadow-boxShadow">
            <div className="container mx-auto px-6 sm:px-0">
                <ul className="flex flex-wrap gap-6 py-2">
                    {sideMenu.map((item, index) => (
                        <li
                            key={index}
                            className={`px-5 py-4 rounded-md group ${
                                router.asPath === item.link
                                    ? 'bg-themePrimary'
                                    : 'bg-white'
                            }`}
                        >
                            <Link href={item.link}>
                                <a className="flex items-center gap-4">
                                    <span
                                        className={`text-xl ${
                                            router.asPath === item.link
                                                ? 'text-white'
                                                : 'text-themeBlackDarker'
                                        }`}
                                    >
                                        {item.icon}
                                    </span>

                                    <p
                                        className={`text-sm font-normal ${
                                            router.asPath === item.link
                                                ? 'text-white'
                                                : 'text-themeBlackDarker'
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SellerNavbar;
