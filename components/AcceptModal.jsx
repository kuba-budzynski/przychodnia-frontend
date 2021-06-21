import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { store } from 'react-notifications-component';
import request from '../config/request';

function AcceptModal({ change, setChange, appointment, onAccept }) {
    const { user } = useUser();
    const onSubmit = async () => {
        try {
            const url = '/appointment/new/' + user.email;
            const x = await request.post(url, {
                objectID: appointment.objectID,
                date: appointment.date,
                duration: appointment.duration,
                price: appointment.price,
                notes: appointment.notes,
                typeKey: appointment.typeKey,
                serviceKey: appointment.serviceKey,
                doctorKey: appointment.doctorKey
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
            console.log(error);
        }
    };

    console.log(appointment);

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
                        <div className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all align-middle relative h-full p-6 w-full max-w-2xl min-h-[10rem]">
                            <div className="w-full text-left text-gray-500 font-semibold text-lg lg:text-2xl">
                                <h1>Czy napewno chcesz zapisać się na daną wizytę?</h1>
                            </div>
                            <ol className="text-gray-500 text-xl text-left my-8 list-disc px-2 lg:px-8">
                                {appointment ? (
                                    <div className="flex flex-col">
                                        <p>
                                            {appointment.serviceName} - <span className="italic text-lg text-gray-400">{appointment.doctorName}</span>
                                        </p>
                                        <p className="text-indigo-500 font-bold text-base">{appointment.price} zł</p>
                                    </div>
                                ) : (
                                    <p>Brak danych.</p>
                                )}
                            </ol>
                            <div className="flex space-x-2 justify-end">
                                <button
                                    type="button"
                                    className="px-6 py-2 inline-flex justify-center rounded-lg border border-gray-300 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-base font-bold text-white focus:outline-none"
                                    onClick={onSubmit}>
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-2 inline-flex justify-center rounded-lg border border-gray-300 shadow-lg bg-rose-500 hover:bg-rose-600 text-base font-bold text-white focus:outline-none"
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
