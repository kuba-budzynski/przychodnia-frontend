import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import React from 'react';

function calendar() {
    return (
        <div className="bg-coolGray-50 w-screen max-w-full">
            <Head>
                <title>Calendar</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <div className="w-full min-h-screen flex flex-col py-16 bg-coolGray-50 justify-center justify-items-center">
                <div className="lg:max-w-6xl h-full w-full mx-auto">
                    <Calendar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default calendar;
