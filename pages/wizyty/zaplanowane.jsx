import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Head from 'next/head'
import patterns from '../../styles/patterns.module.scss'
import mask from '../../public/mask.svg'
import clock from '../../public/clock.svg'
import star from '../../public/star.svg'

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function zaplanowane() {

    const people = [
        {
          name: 'Jane Cooper',
          title: 'Badanie krwi',
          description: '< 30 minut',
          date: '2020-11-09',
          time: '11:35',
          doctor: "Dr. Adam Nowak",
          email: 'jane.cooper@example.com',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Badanie krwi',
            description: '< 30 minut',
            date: '2020-11-09',
            time: '11:35',
            doctor: "Dr. Adam Nowak",
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
          {
            name: 'Jane Cooper',
            title: 'Badanie krwi',
            description: '< 30 minut',
            date: '2020-11-09',
            time: '11:35',
            doctor: "Dr. Adam Nowak",
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
          {
              name: 'Jane Cooper',
              title: 'Badanie krwi',
              description: '< 30 minut',
              date: '2020-11-09',
              time: '11:35',
              doctor: "Dr. Adam Nowak",
              email: 'jane.cooper@example.com',
              image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            },
    ]

    return (
        <div className="bg-coolGray-50 ">
            <Head>
                <title>Zaplanowane wizyty</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <main className={`w-screen max-w-full py-16 xl:py-40 xxxl:py-48 min-h-screen xxl:min-h-0 ${patterns.lines2}`}>
                <div className="box-border w-full">
                    <h1 className="text-center text-3xl xl:text-6xl text-white text-extrabold mb-8 uppercase text-shadow-md px-4">Twoje zaplanowane wizyty</h1>
                    <div className="w-full px-4 max-w-8xl mx-auto flex flex-col-reverse xl:flex-row">

                        <div className="flex flex-col w-full">
                            <div className="overflow-x-hidden">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Dane
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Usługa
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Doktor
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Data
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Anuluj</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {people.map((person) => (
                                                <tr key={person.email}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                <div className="text-sm text-gray-500">{person.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{person.title}</div>
                                                        <div className="text-xs text-gray-500 italic">{person.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{person.doctor}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Zaplanowane
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="text-sm text-gray-900">{person.date}</div>
                                                        <div className="text-sm text-indigo-500 font-semibold">{person.time}</div>
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

            <div className="w-full py-12 xl:py-24 bg-indigo-400">
               <div className="w-full max-w-7xl mx-auto xl:space-x-6 flex flex-col xl:flex-row px-4 xl:px-0">
                <div className="w-full xl:w-1/2 mx-auto">
                        <img src={mask} className="w-1/3 lg:w-2/3 py-4 lg:py-0 h-full mx-auto max-w-xs"></img>
                </div>   
                <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                    <h1 className="text-3xl xl:text-5xl font-bold text-white text-center">1. Przygotuj środki ochrony osobistej zgodnych z ustawą np. maskę</h1>
                    <p className="text-white text-base px-6 text-justify pt-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat. Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
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
                    <h1 className="text-3xl xl:text-5xl font-bold text-indigo-400 text-center">2. Przyjdź na wizytę punktualnie - działamy jak szwajcarski zegarek</h1>
                    <p className="text-gray-400 text-base px-6 text-justify pt-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat. Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                    </p>
                </div>  
               </div>                      
            </div>

            <div className="w-full py-12 xl:py-24 bg-indigo-400">
               <div className="w-full max-w-7xl mx-auto xl:space-x-6 flex flex-col xl:flex-row px-4 xl:px-0">
                <div className="w-full xl:w-1/2 mx-auto">
                        <img src={star} className="w-1/3 lg:w-2/3 py-4 lg:py-0 h-full mx-auto max-w-xs"></img>
                </div>   
                <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                    <h1 className="text-3xl xl:text-5xl font-bold text-white text-center">3. Zostaw Nam opinię - zawsze staramy się poprawić Nasze usługi</h1>
                    <p className="text-white text-base px-6 text-justify pt-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat. Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                    </p>
                </div>  
               </div>                      
            </div>

            <Footer />
        </div>
    )
}

export default withPageAuthRequired(zaplanowane)