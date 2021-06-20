import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import termsOfServices from '../public/termsBanner.svg';

const Footer = dynamic(import('../components/Footer'));
const Navbar = dynamic(import('../components/Navbar'));
const ReactMarkdown = dynamic(import('react-markdown'));

function regulamin({ terms }) {
    return (
        <div>
            <Head>
                <title>Przychodnia Medyczna</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <div className="w-full mt-12 lg:mt-0 shadow-lg">
                <img src={termsOfServices} className="w-full h-auto max-h-screen object-cover" alt="regulamin"></img>
            </div>
            <main className="min-h-screen w-screen max-w-full bg-coolGray-50 ">
                <div className="max-w-4xl mx-auto py-16">
                    <h1 className="text-blue-500 font-bold uppercase text-4xl text-center mb-8 px-6 lg:px-0">Warunki korzystania ze strony</h1>
                    <p className="w-10/12 lg:w-full mx-auto text-gray-500 text-justify">
                        <ReactMarkdown>{terms.content}</ReactMarkdown>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default regulamin;

export async function getStaticProps(context) {
    const { client } = require('../graphql/utils');
    const { termsOfServices } = await client.request(
        `
        query MyQuery {
            termsOfServices {
                content
                createdAt
                updatedAt
            }
        }
    `
    );

    return {
        props: {
            terms: termsOfServices[0]
        },
        revalidate: 86400
    };
}
