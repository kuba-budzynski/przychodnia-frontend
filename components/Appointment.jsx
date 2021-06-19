import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';

import { ExclamationIcon } from '@heroicons/react/outline';

export default function Appointment({appointment, onClick}) {

    return (
        <div className="p-4 flex space-x-4 cursor-pointer group hover:bg-blueGray-50" onClick={onClick}>
            <div className="px- py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={appointment.profile.url} alt={`${appointment.title} ${appointment.name} ${appointment.surname}`} />
                        </div>
                        <div className="ml-4 w-48">
                             <div className="text-sm font-medium text-gray-900">{`${appointment.title} ${appointment.name} ${appointment.surname}`}</div>
                        </div>
                    </div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap w-48">
                <div className="text-xs text-gray-500 italic">{appointment.serviceName}</div>
                <div className="text-xs text-gray-500 italic">{`~${appointment.duration} min`}</div>
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-gray-900">{`${new Date(appointment.date).toLocaleString().split(',')[0]}`}</div>
                <div className="text-sm text-indigo-500 font-semibold">{new Date(appointment.date).toTimeString().split(' ')[0].slice(0,5)}</div>
            </div>
        </div>
    );
}
