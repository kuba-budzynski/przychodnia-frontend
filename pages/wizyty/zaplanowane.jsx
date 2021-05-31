import Footer from '../../components/Footer';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import React, { useEffect, useState } from 'react';
import clock from '../../public/clock.svg';
import mask from '../../public/mask.svg';
import patterns from '../../styles/patterns.module.scss';
import star from '../../public/star.svg';
import useSWR from 'swr';
import { find } from 'lodash';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import request from '../../config/request';

const fetcher = (url) => request.get(url).then((res) => res.data);

const getDoctorData = (doctors, appointment) => {

    return find(doctors, {id: appointment.doctorKey});
}
function zaplanowane({ doctors, user }) {
    const [appointments, setAppointments] = useState([]);
    const { data, error } = useSWR(`/appointment/allFuture/${user.email}`, fetcher);
    useEffect(() => {
        if(data) {
            setAppointments(data.map(e => {
            const doctor = getDoctorData(doctors, e);
            const serviceName = find(doctor.uslugiLekarzy, {id: e.details[0].serviceKey}).usluga.nazwa;
            return(
                {
                    id: e.id,
                    doctorName: `${doctor.title} ${doctor.name} ${doctor.surname}`,
                    date: new Date(e.date),
                    doctorImg: doctor.profile.url,
                    duration: e.details[0].duration,
                    service: serviceName
                }
            )
            }
        ));
        }
    }, [data]);

    if (error) return <div>ERROR</div>;
    if (!data) return <Loading />;

    return (
        <div className="bg-coolGray-50 ">
            <Head>
                <title>Zaplanowane wizyty</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <main className={`w-screen max-w-full py-16 xl:py-40 xxxl:py-48 min-h-screen xxl:min-h-0 ${patterns.lines2}`}>
                <div className="box-border w-full mx-auto">
                    <div class="text-7xl font-extrabold mx-auto w-full mb-8">
                        <h1 class="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-400 uppercase text-center">
                            Zaplanowane wizyty
                        </h1>
                    </div>
                    <div className="w-full px-4 max-w-8xl mx-auto flex flex-col-reverse xl:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="overflow-x-hidden">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Doktor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Usługa
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Data
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Anuluj</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {appointments.map((appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full" src={appointment.doctorImg} alt={appointment.doctorName} />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{appointment.doctorName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-xs text-gray-500 italic">{appointment.service}</div>
                                                            <div className="text-xs text-gray-500 italic">{`~${appointment.duration} min`}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Zakończona
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="text-sm text-gray-900">{`${appointment.date.toLocaleString().split(',')[0]}`}</div>
                                                            <div className="text-sm text-indigo-500 font-semibold">{appointment.date.toTimeString().split(' ')[0].slice(0,5)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                Anuluj
                                                            </a>
                                                        </td>
                                                    </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="w-full py-12 xl:py-24 bg-gradient-to-r from-indigo-400 to-indigo-600">
                <div className="w-full max-w-7xl mx-auto xl:space-x-6 flex flex-col xl:flex-row px-4 xl:px-0">
                    <div className="w-full xl:w-1/2 mx-auto">
                        <img src={mask} className="w-1/3 lg:w-2/3 py-4 lg:py-0 h-full mx-auto max-w-xs"></img>
                    </div>
                    <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                        <h1 className="text-3xl xl:text-5xl font-bold text-white text-center">
                            1. Przygotuj środki ochrony osobistej zgodnych z ustawą np. maskę
                        </h1>
                        <p className="text-white text-base px-6 text-justify pt-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus
                            lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum
                            ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas
                            malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat.
                            Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full py-12 xl:py-24">
                <div className="w-full max-w-7xl mx-auto xl:space-x-10 flex flex-col xl:flex-row-reverse px-4 xl:px-0">
                    <div className="w-full xl:w-1/2 mx-auto">
                        <img src={clock} className="w-1/3 lg:w-2/3 py-4 lg:py-0 h-full mx-auto px-4 max-w-xs"></img>
                    </div>
                    <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                        <h1 className="text-3xl xl:text-5xl font-bold text-indigo-400 text-center">
                            2. Przyjdź na wizytę punktualnie - działamy jak szwajcarski zegarek
                        </h1>
                        <p className="text-gray-400 text-base px-6 text-justify pt-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus
                            lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum
                            ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas
                            malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat.
                            Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full py-12 xl:py-24 bg-gradient-to-l from-indigo-400 to-indigo-600">
                <div className="w-full max-w-7xl mx-auto xl:space-x-6 flex flex-col xl:flex-row px-4 xl:px-0">
                    <div className="w-full xl:w-1/2 mx-auto">
                        <img src={star} className="w-1/3 lg:w-2/3 py-4 lg:py-0 h-full mx-auto max-w-xs"></img>
                    </div>
                    <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                        <h1 className="text-3xl xl:text-5xl font-bold text-white text-center">
                            3. Zostaw Nam opinię - zawsze staramy się poprawić Nasze usługi
                        </h1>
                        <p className="text-white text-base px-6 text-justify pt-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus
                            lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum
                            ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas
                            malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat.
                            Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default zaplanowane;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    const { client } = require('../../graphql/utils');
    const { doctors } = await client.request(
        `
      query MyQuery() {
        doctors {
            id
            name
            surname
            title
            slug
            profile {
                url
                width
                height
                handle
            }
            uslugiLekarzy {
            id
            usluga {
                nazwa
            }
            czasTrwania
            }
            specializations
            }
      }
    `
    );

    return {
        props: {
            doctors,
        }
    }
}
});
