import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import { ExclamationIcon } from '@heroicons/react/outline';
import { Loader } from '../components/utils';
import  Appointment from '../components/Appointment';
import { find } from 'lodash';
import fetch from 'unfetch';
import useSWR from 'swr';
import { SearchBox } from 'react-instantsearch-dom';
import { useUser } from '@auth0/nextjs-auth0';
import { store } from 'react-notifications-component';
import request from '../config/request';

const fetcher = (url) => request.get(url).then((res) => res.data);
function AcceptModal({ change, setChange, appointment, onAccept }) {
    const { user } = useUser();
    const onSubmit = async () => {
        try {
            const url = '/appointment/new/' + user.email;
            const x = await request.post(url, {
                date:  appointment.date.getTime(),
                duration:  appointment.duration,
                price:  appointment.price,
                notes:  appointment.notes,
                typeKey:  appointment.typeKey,
                serviceKey:  appointment.serviceKey,
                doctorKey: appointment.doctorKey,
            });
            if (x.data) {
                store.addNotification({
                    title: 'Success',
                    message: 'Stworzyliśmy nową wizytę. Możesz ją zobaczyc w planowanych wizytach.',
                    type: 'success',
                    insert: 'top',
                    container: 'bottom-center',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                setChange(null);
                onAccept();
            } else {
                store.addNotification({
                    title: 'Wystąpiły jakieś blędy',
                    message: 'Spróbuj ponownie później',
                    type: 'danger',
                    insert: 'top',
                    container: 'bottom-center',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Transition.Root show={change} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={change} onClose={() => setChange(null)}>
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
                            className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all align-middle max-w-5xl relative h-full p-6"
                            style={{ minHeight: '50vh' }}>
                            <div className="px-4 p-6 pb-4 h-full w-full max-h-80" >
                                {appointment ? <h2>{appointment.serviceName}</h2> : <p>Brak danych.</p>}
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onSubmit}>
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setChange(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default AcceptModal;
