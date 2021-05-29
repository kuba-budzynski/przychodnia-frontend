import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import { ExclamationIcon } from '@heroicons/react/outline';
import { Loader } from '../components/utils';
import fetch from 'unfetch';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

function AppointmentModal({ change, setChange, appointment }) {
    const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/todos/${appointment.index + 1}`, fetcher);

    return (
        <Transition.Root show={change} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={change} onClose={() => setChange(false)}>
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
                            <div className="px-4 p-6 pb-4">
                                {!data || error ? (
                                    <Loader color="text-indigo-400" />
                                ) : (
                                    <div className="sm:flex sm:items-start h-full">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Deactivate account
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">{JSON.stringify(data)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-coolGray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse absolute inset-x-0 bottom-0">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setChange(false)}>
                                    Deactivate
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setChange(false)}>
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

export default AppointmentModal;
