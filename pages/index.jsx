import Head from 'next/head'
import Navbar from '../components/Navbar'
import SideOver from '../components/SideOver'
import Features from '../components/Features'
import CallToAction from '../components/CallToAction'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import TimeLine from '../components/Timeline'

import patterns from '../styles/patterns.module.scss'
import doctorsRoom from '../public/doctorRoom.jpg'

export default function Home() {
  return (
    <div className="w-screen max-w-full min-h-screen">
      <Head>
        <title>Przychodnia Medyczna</title>
        <meta name="description" content="Opis..." />
      </Head>

      <Navbar />
      
      <div className="">
        <Hero/>
      </div>

      <div className="shadow-sm">
        <CallToAction/>
      </div>

      <div className="my-12">
        <Features />
      </div>

      <div className={`${patterns.lines} py-12 shadow-md`}>
        <TimeLine />
      </div>
      
      <div className="w-full mx-auto max-w-7xl mt-16 lg:my-16 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 px-8 flex flex-col justify-center justify-items-center">
          <h2 className="text-indigo-500 leading-tight font-bold tracking-wide text-5xl text-center lg:text-left">Ubezpieczenie jest dla Ciebie zmartwieniem?</h2>
          <h4 className="mt-6 text-gray-500 text-2xl"><span className="text-rose-400 font-bold text-center lg:text-left">Niepotrzebnie!</span> - u Nas załatwisz wszystko co Ci będzie tylko potrzebne</h4>
          <ol className="list-inside my-6 text-gray-500 text-xl list-disc">
            <li className="list-item">Ubezpieczenie zdrowotne</li>
            <li className="list-item">Zwolnienia lekarskie i pracownicze</li>
            <li className="list-item">Opinie lekarskie i zaświadczenia</li>
            <li className="list-item">Zabiegi na NFZ</li>
          </ol>
        </div>
        <div className="w-full lg:w-1/2">
          <img className="w-full h-full object-cover object-center lg:rounded-xl lg:shadow-xl" src={doctorsRoom}></img>
        </div>
      </div>

      <Footer />
    </div>
  )
}
