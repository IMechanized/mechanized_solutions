import Head from 'next/head'
import Category from '../src/components/fronted/category'
import Feedback from '../src/components/fronted/review/Feedback'
import HeroSection from '../src/components/fronted/hero-section'
import PopularLocation from '../src/components/fronted/location/PopularLocation'
import Pricing from '../src/components/fronted/pricing'
import TopAds from '../src/components/fronted/ads/TopAds'
import Layout from '../src/components/fronted/layout/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Home Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <section>
          {/* Header */}
          <HeroSection />

          {/* category */}
          <Category />

          {/* top Ads */}
          <TopAds />

          {/* Popular Location */}
          <PopularLocation />

          {/* Pricing  */}
          <Pricing />

          {/* FeedBack */}
          <Feedback />
        </section>
      </Layout>
    </>
  )
}
