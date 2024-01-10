import React from "react";
import Image from "../../../optimize/image";
import Replay from "./replay";

const Comments = () => {
  return (
    <div className="bg-white rounded-2xl mt-7 p-10 shadow-sectionShadow">
      <h1 className="text-3xl font-bold text-themeBlackAlt pb-7">
        Comments (3)
      </h1>
      <div className="flex flex-wrap sm:flex-nowrap items-start gap-6 relative py-7 border-t-2 border-themeGrayLight">
        <Image
          src={`/commentImg.png`}
          width={80}
          height={80}
          layout="fixed"
          alt="user"
        />
        <div>
          <h3 className="text-xl font-bold text-themeBlackAlt">
            User Name Here
          </h3>
          <span className="text-sm text-themeBlackDarker">14 SEP, 2020</span>
          <p className="mt-2 text-base text-themeWhiteLighter">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut
            Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor.
          </p>

          <Replay />
        </div>
        <button className="absolute right-0 bg-themePrimaryLighter rounded-lg text-themePrimary py-2 px-7 text-base font-semibold">
          Replay
        </button>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-start gap-6 relative py-7 border-t-2 border-themeGrayLight">
        <Image
          src={`/commentImg.png`}
          width={80}
          height={80}
          layout="fixed"
          alt="user"
        />
        <div>
          <h3 className="text-xl font-bold text-themeBlackAlt">
            User Name Here
          </h3>
          <span className="text-sm text-themeBlackDarker">14 SEP, 2020</span>
          <p className="mt-2 text-base text-themeWhiteLighter">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut
            Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor.
          </p>
        </div>
        <button className="absolute right-0 bg-themePrimaryLighter rounded-lg text-themePrimary py-2 px-7 text-base font-semibold">
          Replay
        </button>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-start gap-6 relative py-7 border-t-2 border-themeGrayLight">
        <Image
          src={`/commentImg.png`}
          width={80}
          height={80}
          layout="fixed"
          alt="user"
        />
        <div>
          <h3 className="text-xl font-bold text-themeBlackAlt">
            User Name Here
          </h3>
          <span className="text-sm text-themeBlackDarker">14 SEP, 2020</span>
          <p className="mt-2 text-base text-themeWhiteLighter">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
            Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut
            Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor.
          </p>
        </div>
        <button className="absolute right-0 bg-themePrimaryLighter rounded-lg text-themePrimary py-2 px-7 text-base font-semibold">
          Replay
        </button>
      </div>

      {/* comment input*/}

      <div className="pt-7 border-t-2 border-themeGrayLight">
        <h1 className="text-3xl font-bold text-themeBlackAlt pb-7">
          Post Your Comment
        </h1>
        <form action="">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-7">
            <input
              className="w-full bg-white border border-themeGrayLight rounded-md focus:outline-none py-3 px-3"
              type="text"
              placeholder="Name"
            />
            <input
              className="w-full bg-white border border-themeGrayLight rounded-md focus:outline-none py-3 px-3"
              type="text"
              placeholder="Email"
            />
          </div>
          <textarea
            className="w-full h-28 rounded-md focus:outline-none mt-7 border border-themeGrayLight p-3"
            placeholder="Write your comment..."
          />
          <button
            type="submit"
            className="text-base text-white bg-themePrimary rounded-md py-4 px-10 mt-7"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
