import CallToAction from '../components/CallToAction';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Head from 'next/head';
import Hero from '../components/Hero';
import Lottie from 'lottie-react';
import Navbar from '../components/Navbar';
import TimeLine from '../components/Timeline';
import covid from '../public/animations/covid.json';
import doctorsRoom from '../public/doctorRoom.jpg';
import patterns from '../styles/patterns.module.scss';

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

            <div className="w-full h-full max-w-8xl mx-auto flex flex-col lg:flex-row lg:space-x-6 my-16">
                <div className="w-full h-full lg:w-1/2">
                    <Lottie animationData={covid} />
                </div>
                <div className="w-full h-full lg:w-1/2 my-auto px-4 lg:px-8">
                    <h2 className="text-indigo-500 leading-tight font-bold tracking-wide text-5xl text-center">
                        Pracujemy dla Was w dobie pandemii <span className="text-rose-400 font-extrabold">COVID-19</span>
                    </h2>
                    <h4 className="mt-6 text-gray-500 text-2xl text-center">
                        <span className="text-indigo-500 font-bold text-center">Bezpieczeństwo!</span> - wszystkie zalecenia Ministerstwa Zdrowia są
                        przez Nas zachowywane. Należy wypełnić odpowiednie ankiety oraz zastosować zalecane elementy ochrony osobistej takich jak np.
                        maski lub przyłbice
                    </h4>
                </div>
            </div>

            <div className={`${patterns.lines} py-12 shadow-md`}>
                <TimeLine />
            </div>

            <div className="w-full mx-auto max-w-7xl mt-16 lg:my-16 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 px-8 flex flex-col justify-center justify-items-center">
                    <h2 className="text-indigo-500 leading-tight font-bold tracking-wide text-5xl text-center lg:text-left">
                        Ubezpieczenie jest dla Ciebie zmartwieniem?
                    </h2>
                    <h4 className="mt-6 text-gray-500 text-2xl">
                        <span className="text-rose-400 font-bold text-center lg:text-left">Niepotrzebnie!</span> - u Nas załatwisz wszystko co Ci
                        będzie tylko potrzebne
                    </h4>
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
    );
}
