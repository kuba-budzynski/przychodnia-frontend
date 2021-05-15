import Head from 'next/head'
import Navbar from '../components/Navbar'
import SideOver from '../components/SideOver'
import Features from '../components/Features'
import CallToAction from '../components/CallToAction'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="w-screen max-w-full min-h-screen">
      <Head>
        <title>Przychodnia Medyczna</title>
        <meta name="description" content="Opis..." />
      </Head>
      <Navbar />
      
      <div>
        <Hero/>
      </div>

      <div className="w-full space-y-12 py-12">
        <Features />
        <CallToAction/>
      </div>
      
      <Footer />
    </div>
  )
}
