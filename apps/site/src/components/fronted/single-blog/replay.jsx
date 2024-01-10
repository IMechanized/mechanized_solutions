import React from 'react';
import Image from '../../../optimize/image';


const Replay = () => {
    return (
        <div className="ml-8 sm:ml-0">
            <div className="flex flex-wrap sm:flex-nowrap items-start gap-6 mt-7">
                <Image src={`/replay.png`} width={80} height={80} layout="fixed" alt="user" />
                <div>
                    <h3 className="text-xl font-bold text-themeBlackAlt">User Name Here</h3>
                    <span className="text-sm text-themeBlackDarker">14 SEP, 2020</span>
                    <p className="mt-2 text-base text-themeWhiteLighter">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam,
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap  items-start gap-6 mt-7">
                <Image src={`/replay2.png`} width={80} height={80} layout="fixed" alt="user" />
                <div>
                    <h3 className="text-xl font-bold text-themeBlackAlt">User Name Here</h3>
                    <span className="text-sm text-themeBlackDarker">14 SEP, 2020</span>
                    <p className="mt-2 text-base text-themeWhiteLighter">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam,
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Replay;