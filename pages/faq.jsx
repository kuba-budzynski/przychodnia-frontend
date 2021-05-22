import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ReactMarkdown from 'react-markdown'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

import faqImage from '../public/faqLogo.svg'

function faq({faqs}) {
    return (
        <div className="bg-coolGray-50 ">
            <Head>
                <title>Przychodnia Medyczna</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <div className="w-full h-full lg:mt-0 flex flex-col-reverse py-12 lg:py-0 lg:flex-row bg-indigo-50 max-h-screen shadow-lg">
                <div className="w-full lg:w-1/3 my-auto pt-24">
                    <div className="w-4/5 mx-auto lg:mx-0 lg:ml-auto">
                        <h1 className="text-6xl font-bold text-center text-blue-600">Często zadawane Nam pytania</h1>
                        <h3 className="text-gray-400 text-center italic py-8 text-xl">Stresuje Cię wizyta? Masz jakieś ciekawe pytania dotyczące działania placówki? Szukasz inspiracji?</h3>
                        <h4 className="text-blue-500 text-3xl text-center font-bold">Zobacz czy pytania poniżej zaspokoją Twoją ciekawość</h4>
                        <div className="mt-16 mx-auto text-center">
                            <bottom type="button" className="text-center mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-cool-gray-100 text-blue-500 animate-bounce hover:text-blue-600 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                            </bottom>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    <img src={faqImage} className="w-full h-auto max-h-screen object-cover"></img>
                </div>
            </div>
            <main className="w-screen max-w-full py-32 ">
                <section className="w-full px-4 space-y-4" id="faqs">
                    {faqs.map(faq => 
                        <Disclosure id={faq.id}>
                            {({ open }) => (
                                <div className="max-w-5xl mx-auto my-3 px-4">
                                    <Disclosure.Button className="flex justify-between items-center w-full px-5 py-3 shadow-sm text-base font-medium text-left text-indigo-500 bg-indigo-50 rounded-lg hover:bg-indigo-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <ReactMarkdown>{faq.question}</ReactMarkdown>
                                        <ChevronUpIcon
                                        className={`${
                                            open ? 'transform rotate-180' : ''
                                        } w-8 h-8 text-indigo-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-5 py-6 text-base text-gray-500">
                                        <ReactMarkdown>{faq.anwser}</ReactMarkdown>
                                    </Disclosure.Panel>
                                </div>
                            )}
                        </Disclosure>
                    )}
                </section>
                
            </main>
            <div className="w-full border-t-2 border-b-2 border-dotted border-indigo-200 py-6 px-4 mb-16">
                    <p className="text-indigo-500 text-center font-bold text-3xl py-2">Zabrakło odpowiedzi na Twoje pytania?</p>
                    <p className="text-gray-400 text-xl text-center">Zadzwoń do nas a postaramy się je dodać</p>
                    <p className="text-gray-400 text-center text-xl slashed-zero underline py-2 cursor-pointer">590-350-324</p>
                </div>
            <Footer />
        </div>
    )
}

export default faq

export async function getStaticProps(context) {

    const {client} = require('../graphql/utils')
    const {faqs} = await client.request(
    `
        query MyQuery {
            faqs {
            anwser
            question
            id
            }
        }
    `)
    
    return {
        props: {
            faqs
        },
        revalidate: 86400
    }
}