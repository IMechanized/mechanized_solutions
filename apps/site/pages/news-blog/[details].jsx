import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import _ from 'lodash'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import Layout from '../../src/components/fronted/layout/layout'
import { BsArrowRightShort } from 'react-icons/bs'
import Comments from '../../src/components/fronted/single-blog'
import { Axios } from '../../src/utils/axiosKits'
import ImageOpt from '../../src/optimize/image'
import { ThemeContext } from '../../src/context/ThemeContext'
import { LoaderPage } from '../../src/lib/loader'

const data = ['1', '2', '3', '4', '5', '6', '7', '8']

const dataTwo = ['1', '2', '3', '4']
const fetcher = (url) => Axios(url).then((res) => res.data.data)

const Details = () => {
  const { adsCategoryData, adsCategoryError } = React.useContext(ThemeContext)
  const router = useRouter()
  const { details } = router.query
  const { data: blogDataAll, error: blogError } = useSWR(
    details ? `/ads/blog/${details}` : null,
    fetcher,
    {
      refreshInterval: 0,
    }
  )
  const blogData = blogDataAll?.blog
  const blogLatestData = blogDataAll?.latestBlog
  const imageUrl = blogData?.avatar ? blogData?.avatar : '/avatar.png'

  return (
    <>
      <Head>
        <title>Blog Details</title>
        <meta name="viewport" content="" />
      </Head>

      <Layout>
        <section className="bg-themeWhiteLight">
          {!blogDataAll && !blogError && <LoaderPage />}

          <div className="container mx-auto py-14 pb-28 px-5 sm:px-0">
            <div className="grid grid-cols-10 justify-center gap-7">
              <div className="col-span-10 md:col-span-7">
                <div className="bg-white rounded-2xl p-7 shadow-sectionShadow">
                  <ImageOpt
                    src={imageUrl}
                    width={810}
                    height={540}
                    layout="responsive"
                  />
                  <h1 className="text-3xl font-bold text-themeBlackAlt truncate pt-8">
                    {blogData?.blogTitle}
                  </h1>
                  <div className="pt-4 text-lg text-themeWhiteLighter">
                    {/* <p className="pt-4 text-lg text-themeWhiteLighter">{blogData?.description}</p> */}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogData?.description,
                      }}
                    />
                  </div>

                  {/* <p className="pt-4 text-lg text-themeWhiteLighter">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident.</p> */}
                  {/* <p className="pt-4 text-lg text-themeWhiteLighter">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident.</p> */}
                  {/* <p className="text-xl text-themeWhiteLighter mt-4 pl-7 border-l-4 border-themeGrayBorder">
                  Mauris aliquet ultricies ante, non faucibus ante gravida sed. Sed ultrices pellentesque purus, vulputate volutpat ipsum hendrerit sed neque sed sapien rutrum.
                </p> */}
                  {/* <p className="pt-7 text-lg text-themeWhiteLighter">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident.</p> */}
                  <hr className="mt-7 border border-themeGrayLight" />
                  <div className="flex flex-wrap items-center gap-11 mt-7">
                    <p className="text-xl font-bold text-themeBlackAlt">Tags</p>
                    <div className="flex items-center gap-2">
                      {/* {blogData?.tags.map((item, index) => ( */}
                      {_.map(blogData?.tags, (item, index) => (
                        <span className="text-base text-themeWhiteLighter border border-themeGrayLight rounded-md bg-white py-0.5 px-3">
                          {item}
                        </span>
                      ))}
                      {/* <span className="text-base text-themeWhiteLighter border border-themeGrayLight rounded-md bg-white py-0.5 px-3">Groups</span>
                    <span className="text-base text-themeWhiteLighter border border-themeGrayLight rounded-md bg-white py-0.5 px-3">Parkings</span>
                    <span className="text-base text-themeWhiteLighter border border-themeGrayLight rounded-md bg-white py-0.5 px-3">Team</span>
                    <span className="text-base text-themeWhiteLighter border border-themeGrayLight rounded-md bg-white py-0.5 px-3">Food</span> */}
                    </div>
                  </div>
                </div>
                {/* <Comments /> */}
              </div>
              <div className="col-span-8 md:col-span-3">
                <div className="bg-white rounded-2xl px-10 pt-10 shadow-sectionShadow">
                  <h1 className="text-3xl font-bold text-themeBlackAlt pb-1">
                    Category List
                  </h1>

                  {
                    // data.map((item, index) => (
                    adsCategoryData &&
                      _.map(adsCategoryData, (item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 pt-4"
                        >
                          <span className="border border-themePrimary w-5 opacity-60"></span>
                          <p className="text-lg text-themeBlackAlt truncate w-full">
                            {item.categoryTitle}
                          </p>
                        </div>
                      ))
                  }
                  <div className="py-6 flex justify-center bg-themeS">
                    <Link href="#">
                      <a className="text-base text-themePrimary transition duration-300 ease-in-out font-bold hover:opacity-70">
                        View All
                      </a>
                    </Link>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-themeBlackAlt mt-8 mb-3">
                  Latest Topic
                </h1>
                {
                  // dataTwo.map((item, index) => (
                  _.map(blogLatestData, (item, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap xl:flex-nowrap items-center gap-5 bg-white rounded-2xl shadow-sectionShadow p-5 mb-5 group"
                    >
                      <div>
                        <ImageOpt
                          className="transition duration-300 ease-in-out group-hover:scale-110"
                          src={item?.avatar}
                          width={132}
                          height={100}
                          layout="fixed"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-themeBlackDarker">
                          {/* 14 SEP, 2020 */}
                          <Moment format="DD MMM, YYYY">
                            {item.createdAt}
                          </Moment>
                        </p>
                        <h3 className="text-base font-bold text-themeBlackAlt max-h-11 overflow-hidden">
                          {item?.blogTitle}
                        </h3>
                        <Link
                          href={item?.slug ? `/news-blog/${item?.slug}` : '#'}
                        >
                          <a className="flex items-center gap-3 mt-2 transition duration-300 ease-in-out group-hover:opacity-70">
                            <button className="text-sm font-semibold text-themePrimary">
                              Read More
                            </button>
                            <BsArrowRightShort className="text-themePrimary text-2xl" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Details
