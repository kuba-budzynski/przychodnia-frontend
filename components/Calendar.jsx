import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { ExclamationIcon } from '@heroicons/react/outline';
import SideOver from '../components/SideOver';

function Calendar() {
    const current = new Date();
    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [month, setMonth] = useState(current.getMonth());
    const [year, setYear] = useState(current.getFullYear());
    const [no_of_days, setNumberOfDays] = useState([]);
    const [blankdays, setBlankdays] = useState([]);
    const [event_title, setEventTitle] = useState('');
    const [event_date, setEventDate] = useState('');
    const [event_theme, setEventTheme] = useState('');
    const [openEventModal, setOpenEventModal] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const themes = [
        {
            value: 'blue',
            label: 'Blue Theme'
        },
        {
            value: 'red',
            label: 'Red Theme'
        },
        {
            value: 'yellow',
            label: 'Yellow Theme'
        },
        {
            value: 'green',
            label: 'Green Theme'
        },
        {
            value: 'purple',
            label: 'Purple Theme'
        }
    ];

    const events = [];
    // const events = [
    //     {
    //         event_date: new Date(2021, 4, 1),
    //         event_title: "April Fool's Day",
    //         event_theme: 'blue'
    //     },

    //     {
    //         event_date: new Date(2021, 5, 26),
    //         event_title: 'Birthday',
    //         event_theme: 'red'
    //     },

    //     {
    //         event_date: new Date(2021, 6, 1),
    //         event_title: 'Upcoming Event',
    //         event_theme: 'green'
    //     }
    // ];

    const initDate = () => {
        const today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
    };

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);
        return today.toDateString() === d.toDateString();
    };

    const showEventModal = (date) => {
        setOpenEventModal(true);
        setEventDate(new Date(year, month, date).toDateString());
    };

    const getNoOfDays = (newMonth) => {
        const daysInMonth = new Date(year, newMonth + 1, 0).getDate();
        const daysOfWeek = new Date(year, newMonth).getDay();
        const blankdaysArray = [];
        for (let i = 1; i <= daysOfWeek; i++) {
            blankdaysArray.push(i);
        }
        const daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        setBlankdays(blankdaysArray);
        setNumberOfDays(daysArray);
    };

    useEffect(() => {
        initDate();
        getNoOfDays(month);
    }, []);

    return (
        <div className="w-full h-full p-0 m-0 relative">
            <SideOver show={sidebar} />
            <button
                className="fixed top-16 mt-4 right-3 h-10 w-10 p-2 bg-indigo-400 rounded-xl text-white z-10 hover:bg-indigo-500 cursor-pointer flex justify-items-center justify-center"
                onClick={() => setSidebar(!sidebar)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div className="antialiased sans-serif min-h-screen">
                <div className="mx-auto px-4 py-20 lg:py-32">
                    <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-4">
                            <div className="space-x-1">
                                <span className="text-3xl font-extrabold text-indigo-500 cursor-pointer">{MONTH_NAMES[month]}</span>
                                <span className="text-2xl font-bold text-indigo-500">/</span>
                                <span className="text-base text-gray-400 italic">{year}</span>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    className="px-3 py-0 bg-indigo-400 text-white font-bold text-base rounded-lg hover:bg-indigo-500"
                                    onClick={() => {
                                        initDate();
                                        getNoOfDays(new Date().getMonth());
                                    }}>
                                    Today
                                </button>
                                <div className="border rounded-lg px-1">
                                    <button
                                        type="button"
                                        className="group leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer p-1 items-center"
                                        disabled={month == 0}
                                        onClick={() => {
                                            setMonth(month - 1);
                                            getNoOfDays(month - 1);
                                        }}>
                                        <svg
                                            className="h-6 w-6 text-gray-500 inline-flex leading-none group-hover:text-indigo-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="border-r inline-flex h-6"></div>
                                    <button
                                        type="button"
                                        className="group leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer p-1"
                                        disabled={month == 11}
                                        onClick={() => {
                                            setMonth(month + 1);
                                            getNoOfDays(month + 1);
                                        }}>
                                        <svg
                                            className="h-6 w-6 text-gray-500 inline-flex leading-none group-hover:text-indigo-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="-mx-1 -mb-1 top-4">
                            <div className="flex flex-wrap ">
                                {DAYS.map((day, index) => (
                                    <div style={{ width: '14.26%' }} className="px-2 py-2" key={index}>
                                        <div className="text-gray-500 text-sm uppercase tracking-wide font-bold text-center z-50 cursor-pointer hover:text-indigo-400">
                                            {day}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap border-t border-l">
                                {blankdays.map((_, index) => (
                                    <div
                                        style={{ width: '14.28%' }}
                                        className="text-center border-r border-b px-4 pt-2 h-24 lg:h-28 bg-blueGray-50"
                                        key={index}></div>
                                ))}

                                {no_of_days.map((date, index) => (
                                    <div
                                        style={{ width: '14.28%' }}
                                        className="px-4 pt-2 border-r border-b relative w-full h-24 lg:h-28 cursor-pointer group hover:bg-blueGray-50"
                                        key={index}
                                        onClick={() => showEventModal(date)}>
                                        <div
                                            className={`text-sm lg:text-base absolute inset-x-1 bottom-1 w-6 lg:w-8 h-6 lg:h-8 items-center justify-center p-1 text-center leading-none rounded-full transition ease-in-out duration-100 ${
                                                isToday(date) ? 'bg-indigo-500 text-white' : 'text-gray-400 group-hover:bg-indigo-50'
                                            }`}>
                                            {date}
                                        </div>
                                        <div style={{ height: '80px' }} className="overflow-y-auto mt-1">
                                            {events &&
                                                events
                                                    .filter(
                                                        (e) =>
                                                            new Date(e.event_date).toDateString() === new Date(year, month + 1, date).toDateString()
                                                    )
                                                    .map((event) => (
                                                        <div
                                                            className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border 
                                                            ${event.event_theme === 'blue' && 'border-blue-200 text-blue-800 bg-blue-100'}
                                                            ${event.event_theme === 'red' && 'border-red-200 text-red-800 bg-red-100'}
                                                            ${event.event_theme === 'yellow' && 'border-yellow-200 text-yellow-800 bg-yellow-100'}
                                                            ${event.event_theme === 'green' && 'border-green-200 text-green-800 bg-green-100'}
                                                            ${event.event_theme === 'purple' && 'border-purple-200 text-purple-800 bg-purple-100'}
                                                        `}>
                                                            <p className="text-sm truncate leading-tight">{event.event_title}</p>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Transition.Root show={openEventModal} as={Fragment}>
                    <Dialog
                        as="div"
                        static
                        className="fixed z-10 inset-0 overflow-y-auto"
                        open={openEventModal}
                        onClose={() => setOpenEventModal(false)}>
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <div
                                    className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all align-middle max-w-5xl w-full relative h-full"
                                    style={{ minHeight: '50vh' }}>
                                    <div className="px-4 p-6 pb-4 h-full">
                                        <div className="sm:flex sm:items-start h-full">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    Deactivate account
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to deactivate your account? All of your data will be permanently
                                                        removed. This action cannot be undone.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-coolGray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse absolute inset-x-0 bottom-0">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpenEventModal(false)}>
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpenEventModal(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    );
}

export default Calendar;
