import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from '../components/Navbar';

import patterns from '../styles/patterns.module.scss';

const Features = dynamic(import('../components/Features'));
const CallToAction = dynamic(import('../components/CallToAction'));
const Footer = dynamic(import('../components/Footer'));
const Hero = dynamic(import('../components/Hero'));
const TimeLine = dynamic(import('../components/Timeline'));
const Insurance = dynamic(import('../components/Insurance'));
const Covid = dynamic(import('../components/Covid'));

export default function Home() {
    return (
        <div className="w-screen max-w-full min-h-screen">
            <Head>
                <title>Przychodnia medyczna</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />

            <div className="">
                <Hero />
            </div>

            <div className="shadow-md">
                <CallToAction />
            </div>

            <div className="mt-32 mb-16">
                <Features />
            </div>

            <div>
                <Covid />
            </div>

            <div className={`${patterns.lines} py-12 shadow-md`}>
                <TimeLine />
            </div>

            <div>
                <Insurance />
            </div>

            <Footer />
        </div>
    );
}
