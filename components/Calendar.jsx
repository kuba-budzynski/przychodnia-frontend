import React, { Fragment, useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';

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

    const addEvent = () => {
        if (event_title == '') return;
        events.push({
            event_date: event_date,
            event_title: event_title,
            event_theme: event_theme
        });
        setEventDate('');
        setEventTitle('');
        setEventTheme('blue');
        setOpenEventModal(false);
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
        <div className="w-full h-full p-0 m-0">
            <div className="antialiased sans-serif min-h-screen">
                <div className="mx-auto px-4 py-2 md:py-32">
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
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                        <div className="p-4 max-w-7xl w-full px-2 mx-auto absolute left-0 right-0 overflow-hidden mt-24">
                            <div
                                className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-rose-500 hover:text-rose-600 inline-flex items-center justify-center cursor-pointer"
                                onClick={() => setOpenEventModal(!openEventModal)}>
                                <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                                </svg>
                            </div>

                            <div className="shadow-xl rounded-xl bg-white overflow-hidden w-full block p-8 h-full">
                                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Modal title - {event_date}</h2>

                                <div className="w-full bg-white h-96"></div>

                                <div className="mt-2 text-right">
                                    <button
                                        type="button"
                                        className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-indigo-400 rounded-lg shadow-sm mr-2"
                                        onClick={() => setOpenEventModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 px-8 border rounded-lg shadow-sm"
                                        onClick={() => {
                                            alert('OK');
                                        }}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Root>
            </div>
        </div>
    );
}

export default Calendar;
