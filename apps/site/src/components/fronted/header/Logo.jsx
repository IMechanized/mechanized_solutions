import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href="/">
            <a>
                <p className="text-themeBlackLight font-bold text-2xl">
                    Mechanized <span className="text-themePrimary">Solutions</span>
                </p>
            </a>
        </Link>
    )
}
export default Logo;