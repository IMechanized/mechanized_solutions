import React from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { RiStarFill, RiStarHalfLine } from "react-icons/ri";
import Image from "../../../optimize/image";

const Feedback = () => {
  return (
    <section className="pt-14 sm:mt-28 pb-14 sm:pb-16 px-5 sm:px-0 bg-themeWhiteLight">
      <div className="container mx-auto sm:px-12">
        <div className="text-center">
          <h2 className="font-bold text-4xl text-themeBlackAlt">
            Customer <span className="text-themeSecondary">Feedback</span>
          </h2>
          <p className="text-lg text-themeBlackAlt md:w-[38%] w-full mx-auto mt-5">
            This is what our happy customers and advertisers have to say.
          </p>
        </div>

        <div className="relative pb-6">
          <button className="flex justify-center items-center absolute h-12 w-12 p-3 border border-themePrimary rounded-full hover:bg-themePrimary group ml-16 sm:ml-0 left-0 sm:-left-14  xl:-left-10 bottom-0 sm:top-28 xl:top-24 ">
            <HiOutlineArrowLeft className="text-2xl text-themePrimary group-hover:text-white" />
          </button>

          <button className="flex justify-center items-center absolute rounded-full  border border-themePrimary h-12 w-12 p-3 hover:bg-themePrimary group mr-16 sm:mr-0 right-0 sm:-right-14 xl:-right-10 bottom-0 sm:top-28 xl:top-24 ">
            <HiOutlineArrowRight className="text-2xl text-themePrimary group-hover:text-white" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 sm:mx-5 pb-16 sm:pb-0">
            <div className="item py-4 px-1">
              <div className="p-7 bg-white rounded-2xl shadow-owlCard">
                <h3 className="font-bold">"Exceptional Quality and Efficiency!"</h3>
                <p className="text-base text-themeWhiteLighter mb-6">
                  I recently purchased agricultural equipment from Mechanized Solutions, and I couldn't be more impressed.
                  The quality and performance of the machinery exceeded my expectations.
                  It has significantly enhanced our farming processes, making them more efficient and productive.
                </p>

                <div className="flex items-center gap-4">
                  <Image
                    src={"/feedbackImg.png"}
                    alt="feedback"
                    width={48}
                    height={48}
                  />

                  <div>
                    <h5 className="text-themePrimary font-semibold text-lg">
                      Matt
                    </h5>
                    <div className="flex gap-1">
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarHalfLine className="text-themeYellowLight text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block  item py-4 px-1">
              <div className="p-7 bg-white rounded-2xl shadow-owlCard">
                <h3 className='font-bold'>"Reliable Partner in Progress"</h3>
                <p className="text-base text-themeWhiteLighter mb-6">
                  Mechanized Solutions has become our go-to provider for cutting-edge equipment across various industries.
                  Their commitment to innovation and top-tier machinery has positively impacted our business operations.
                  The agricultural equipment we acquired has not only increased our output but has also streamlined our operations.
                </p>

                <div className="flex items-center gap-4">
                  <Image
                    src={"/Rectangle 13 (9).png"}
                    width={48}
                    height={48}
                    alt="feedback"
                  />

                  <div>
                    <h5 className="text-themePrimary font-semibold text-lg">
                      Tammy
                    </h5>
                    <div className="flex gap-1">
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarHalfLine className="text-themeYellowLight text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block item py-4 px-1">
              <div className="p-7 bg-white rounded-2xl shadow-owlCard">
                <h3 className='font-bold'>"Future-Ready Solutions!"</h3>
                <p className="text-base text-themeWhiteLighter mb-6">
                  We embraced the future of mechanization with Mechanized Solutions, and the results are outstanding.
                  The diverse range of advanced equipment they offer is unmatched.
                  Our recent purchase has not only improved efficiency but has also positioned us at the forefront of technological advancement in our industry.
                </p>

                <div className="flex items-center gap-4">
                  <Image
                    src={"/Rectangle 13 (8).png"}
                    alt="feedback"
                    width={48}
                    height={48}
                    border-radius={20}
                  />

                  <div>
                    <h5 className="text-themePrimary font-semibold text-lg">
                      Joseph
                    </h5>
                    <div className="flex gap-1">
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarFill className="text-themeYellowLight text-base" />
                      <RiStarHalfLine className="text-themeYellowLight text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
