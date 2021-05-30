import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Calendar from '../components/Calendar';
import Footer from '../components/Footer';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { XIcon } from '@heroicons/react/outline';

function calendar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-coolGray-50 w-screen max-w-full">
            <Head>
                <title>Calendar</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <div className="w-full min-h-screen flex flex-col py-16 bg-coolGray-50 justify-center justify-items-center">
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" static className="fixed inset-0 overflow-hidden z-50" open={open} onClose={() => setOpen(!open)}>
                        <div className="absolute inset-0 overflow-hidden z-50">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>
                            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full">
                                    <div className="relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0">
                                            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                                <button
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Side menu</Dialog.Title>
                                            </div>
                                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                                {/* Replace with your content */}
                                                <div className="absolute inset-0 px-4 sm:px-6">
                                                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                                                </div>
                                                {/* /End replace */}
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <button
                    className="fixed top-16 mt-4 right-3 h-10 w-10 p-2 bg-indigo-400 rounded-xl text-white z-10 hover:bg-indigo-500 cursor-pointer flex justify-items-center justify-center"
                    onClick={() => setOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

                <div className="lg:max-w-6xl h-full w-full mx-auto">
                    <Calendar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default calendar;