import { BsClockFill } from 'react-icons/bs';
import SETTINGS from '../config/settings';

export default function Appointment({ appointment, onClick }) {
    const imageUrl = `${SETTINGS.imageKit}/tr:w-200,h-200,fo-face/${appointment.profile.handle}`;

    return (
        <div
            className="px-4 py-5 flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-10 cursor-pointer group hover:bg-blueGray-50 w-full max-w-2xl"
            onClick={onClick}>
            <div className="w-full lg:w-1/2 flex justify-start">
                <div className="flex-shrink-0 h-12 w-12 lg:h-16 lg:w-16">
                    <img
                        className="h-12 w-12 lg:h-16 lg:w-16 rounded-full shadow-md"
                        src={imageUrl}
                        alt={`${appointment.title} ${appointment.name} ${appointment.surname}`}
                    />
                </div>
                <div className="ml-4 text-sm lg:text-base font-bold my-auto">
                    <div className="text-gray-600">{`${appointment.title} ${appointment.name} ${appointment.surname}`}</div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-items-center justify-center space-x-4 my-auto">
                <div className="w-48 my-auto">
                    <div className="text-xs text-gray-500 italic">{appointment.serviceName}</div>
                    <div className="text-xs text-gray-500 italic">{`~${appointment.duration} min`}</div>
                </div>
                <div className="text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{`${new Date(appointment.date).toLocaleString().split(',')[0]}`}</div>
                    <div className="text-lg text-indigo-500 font-bold flex space-x-1 justify-items-center justify-center">
                        <BsClockFill className="text-indigo-500 my-auto" />
                        <h2>{new Date(appointment.date).toTimeString().split(' ')[0].slice(0, 5)}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
