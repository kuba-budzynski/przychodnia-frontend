import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, MenuSelect, Menu, ClearRefinements } from 'react-instantsearch-dom';
import CustomRangeSlider from '../components/RangeSlider';
import { FaCalendarPlus } from 'react-icons/fa';
const searchClient = algoliasearch('VKKCML3WNE', 'c1d5300ee10d2bb9006ad4316e9e9881');
const Navbar = dynamic(import('../components/Navbar'));
const Footer = dynamic(import('../components/Footer'));
const Calendar = dynamic(import('../components/Calendar'));

function calendar({ doctors }) {
    const current = new Date();
    const [refresh, setRefresh] = useState(false);
    const [month, setMonth] = useState(current.getMonth());
    const [year, setYear] = useState(current.getFullYear());

    const refreshSearch = () => {
        setRefresh({ refresh: true }, () => {
            setRefresh({ refresh: false });
        });
    };

    useEffect(refreshSearch, []);
    return (
        <div className="bg-coolGray-50 w-screen max-w-full">
            <Head>
                <title>Calendar</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />

            <div className="w-full min-h-screen flex flex-col bg-coolGray-50 justify-center justify-items-center mt-16">
                <div className="mt-12 flex space-x-6 w-full justify-center justify-items-center">
                    <h1 className="xl:text-7xl text-4xl text-center font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-fuchsia-500">
                        NOWA WIZYTA
                    </h1>
                    <FaCalendarPlus className="text-blue-500 my-auto text-4xl xl:text-6xl" />
                </div>
                <InstantSearch indexName="prod_SLOTS" searchClient={searchClient} refresh={refresh}>
                    <div className="lg:max-w-6xl h-full w-full mx-auto py-8 px-4">
                        <Calendar
                            month={month}
                            year={year}
                            doctorsData={doctors}
                            onChangeMonth={(m) => setMonth(m)}
                            onChangeYear={(y) => setYear(y)}
                            reloadSlots={refreshSearch}
                        />
                    </div>
                    <div className="w-full py-8 mx-auto px-5">
                        <div className="max-w-2xl mx-auto flex flex-col space-y-6 justify-items-center justify-center pb-8">
                            <div className="w-3/4 xl:w-full mx-auto">
                                <p className="w-full m-3">Cena:</p>
                                <CustomRangeSlider attribute="price" min={0} max={300} />
                            </div>
                            <div className="w-3/4 xl:w-full mx-auto">
                                <p className="w-full m-3">Czas:</p>
                                <CustomRangeSlider attribute="duration" min={0} max={300} />
                            </div>
                            <div className="">
                                <p className="w-full m-3">Wybierz usugę:</p>
                                <MenuSelect attribute="serviceName" />
                            </div>
                            <div className="">
                                <p className="w-full m-3">Wybierz lekarza:</p>
                                <Menu attribute="doctorName" searchable />
                            </div>
                            <div className="w-full flex justify-center">
                                <ClearRefinements />
                            </div>
                        </div>
                    </div>
                </InstantSearch>
            </div>
            <Footer />
        </div>
    );
}

export default calendar;

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps({ params }) {
        const { client } = require('../graphql/utils');
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
              cena
              czasTrwania
              }
              specializations
              }
        }
      `
        );

        return {
            props: {
                doctors
            }
        };
    }
});
