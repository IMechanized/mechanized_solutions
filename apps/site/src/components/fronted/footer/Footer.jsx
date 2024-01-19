import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useSWRConfig } from "swr";
import { FiMail, FiPhone } from "react-icons/fi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";
import { Axios } from "../../../utils/axiosKits";
import {linkOne, linkTwo, socialShare} from "./footer_data";

const Footer = () => {
  const { addToast } = useToasts();
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // dynamic full year
    const fullYear = new Date().getFullYear();

  // subscription submit handler
  const subscriptionSubmit = async (data) => {
    const submitData = {
      subscriptionEmail: data.subscriptionEmail,
    }

    try {
      await Axios({
        method: "POST",
        url: "/users/subscription",
        data: submitData,
      }).then((res) => {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        mutate("/users/subscription");
        reset();
      });
    } catch (error) {
      if (error?.response?.data) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(error?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }

  return (
    <footer className="pt-14 bg-themeBlackAlt">
      <div className="container mx-auto px-5 sm:px-0">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between pb-14">
          <h2 className="font-bold text-2xl sm:text-4xl text-white text-center pb-5 lg:pb-0">
            Subscribe To Our Newsletter
          </h2>

          <div className="relative left-0 right-0">
            <form onSubmit={handleSubmit(subscriptionSubmit)}>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full sm:w-[580px] h-12 sm:h-16 rounded-xl pl-7 outline-none px-36 sm:px-6"
                {...register("subscriptionEmail", { required: true })}
              />

              <div className="absolute top-1 sm:top-2 right-2">
                <button
                  type="submit"
                  className="bg-themeSecondary h-10 sm:h-12 px-2 sm:px-6 text-white rounded-md font-semibold text-sm sm:text-base"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
            {errors.subscriptionEmail && (
              <span className="text-white text-sm italic">
                This field is required
              </span>
            )}
          </div>

        </div>
      </div>
      <div className="border-b border-footerBorder"></div>
      <div className="container mx-auto px-5 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:border-r border-footerBorder pt-16 md:py-16">
            <h3 className="text-3xl font-bold text-white mb-5">
              Mechanized <span className="text-themePrimary">Solutions</span>
            </h3>
            <p className="text-lg text-themeWhiteLighter mb-5">
              {`Providing industry-standard mechanization solutions.`}
            </p>
            <ul className="flex items-center space-x-3">
              {socialShare.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} passHref>
                    <a target="_blank" rel="noopener noreferrer" className="bg-themePrimary w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-themeSecondary">
                      {item.icon}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:border-r border-footerBorder md:pt-16">
            <h4 className="text-2xl text-white font-bold mb-5">Quick Links</h4>
            <div className="flex space-x-10">
              <ul>
                {linkOne.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link}>
                      <a className="text-themeGrayLight block mb-4 transition duration-300 ease-in-out hover:text-themePrimary">{item.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                {linkTwo.map((item, index) => (
                    <li key={index}>
                      <Link href={item.link}>
                        <a className="text-themeGrayLight block mb-4 transition duration-300 ease-in-out hover:text-themePrimary">{item.name}</a>
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pb-16 lg:py-16">
            <div className="flex items-center gap-4 mb-5">
              <p className="bg-themePrimary py-3 px-3 rounded-xl"><MdOutlineLocationOn className="text-2xl text-white " /></p>
              <p className="text-white text-base sm:text-lg ">
                Company Location here - Lorem Ipsum is simple Dummy Text
              </p>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <p className="bg-themePrimary py-3 px-3 rounded-xl"><FiPhone className="text-2xl text-white" /></p>
              <p className="text-white text-base sm:text-lg">
                +1 123 456 789 <br />
                +1 123 456 789
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="bg-themePrimary py-3 px-3 rounded-xl"><FiMail className="text-2xl text-white" /></p>
              <p className="text-white text-base sm:text-lg">
                info@mechanizedsolutions.com
                <br />
                support@mechanizedsolutions.com
              </p>
            </div>
            <Link href="/contact-us">
              <a className="font-semibold text-themePrimary flex items-center gap-4 mt-5 transition duration-300  hover:text-themeSecondary group ">
                Contact Now
                <HiOutlineArrowRight className="text-xl text-themePrimary group-hover:text-themeSecondary transition duration-300 ease-in-out" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-footerBorder"></div>
      <div className="text-center text-white mt-6 pb-6 px-5 sm:px-0">
        <p>
          © {fullYear} - <span className="font-bold">Mechanized Solutions</span>. All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
