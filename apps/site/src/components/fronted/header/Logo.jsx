import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href="/">
            <a>
                <p className="text-themeBlackLight font-bold text-2xl">
                    Meta <span className="text-themePrimary">Ads</span>
                </p>
            </a>
        </Link>
    )
}
export default Logo;