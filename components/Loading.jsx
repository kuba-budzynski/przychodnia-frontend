import Footer from '../components/Footer';
import { Loader } from '../components/utils';
import Navbar from '../components/Navbar';
import React from 'react';

function Loading() {
    return (
        <div className="w-screen min-h-screen max-w-full bg-gray-50 py-32 flex justify-center justify-items-center  flex-col">
            <Navbar />
            <div className="min-h-screen py-64">
                <Loader color="text-indigo-400"></Loader>
            </div>
            <Footer />
        </div>
    );
}

export default Loading;
