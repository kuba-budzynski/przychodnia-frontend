import React, { useEffect, useState } from 'react';

import AppointmentModal from './AppointmentModal';
import AcceptModal from './AcceptModal';
import { useAppointmentContext } from '../store/AppointmentContext';

function Calendar({ slots, month, year, onChangeMonth, onChangeYear, doctorsData, reloadSlots }) {
    const { appointment, update } = useAppointmentContext();
    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [no_of_days, setNumberOfDays] = useState([]);
    const [blankdays, setBlankdays] = useState([]);
    const [openEventModal, setOpenEventModal] = useState(null);
    const [openPickedAppointmentModal, setOpenPickedAppointmentModal] = useState(null);
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
        onChangeMonth(today.getMonth());
        onChangeYear(today.getFullYear());
    };

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);
        return today.toDateString() === d.toDateString();
    };

    const showEventModal = (date) => {
        setOpenEventModal(date);
        //setEventDate(new Date(year, month, date).toDateString());
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
            <div className="antialiased sans-serif min-h-screen">
                <div className="mx-auto px-4 py-20 lg:py-32">
                    <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-4">
                            <div className="space-x-1 ">
                                <span className="text-base md:text-xl font-extrabold text-indigo-500 cursor-pointer">{MONTH_NAMES[month]}</span>
                                <span className="text-2xl font-bold text-indigo-500">/</span>
                                <span className="text-base text-gray-400">{year}</span>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    className="px-2 py-0 bg-indigo-500 text-white font-bold text-sm rounded-lg hover:bg-indigo-400"
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
                                            onChangeMonth(month - 1);
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
                                            onChangeMonth(month + 1);
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
                                        onClick={() => {
                                            showEventModal(date);
                                            update({
                                                date: new Date(year, month, date + 1),
                                                index,
                                                events
                                            });
                                        }}>
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

                <AppointmentModal
                    change={!!openEventModal}
                    setChange={setOpenEventModal}
                    pickAppointment={(e) => setOpenPickedAppointmentModal(e)}
                    appointments={openEventModal ? slots[openEventModal - 1] : null}
                    doctorsData={doctorsData}
                />
                <AcceptModal
                    change={!!openPickedAppointmentModal}
                    setChange={setOpenPickedAppointmentModal}
                    appointment={openPickedAppointmentModal}
                    onAccept={reloadSlots}
                />
            </div>
        </div>
    );
}

export default Calendar;
