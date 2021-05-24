import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import formatDate from '@bitty/format-date';
import Head from 'next/head'

export default function Worker({doctor}) {
    return (
        <div>
          <Head>
              <title>{`${doctor.title} ${doctor.name} ${doctor.surname}`}</title>
              <meta name="description" content="Opis..." />
          </Head>

          <Navbar />
    
          <main className="min-h-screen w-screen max-w-full bg-coolGray-50">
              <div className="max-w-7xl mx-auto py-36 flex flex-col lg:flex-row lg:space-x-6">
                 <div className="w-full lg:w-1/3">
                  <img src={doctor.profile.url} className="w-full h-auto object-cover object-center shadow-xl"></img>
                 </div>
                 <div className="w-full lg:w-2/3 break-words px-4 lg:px-8">
                    <div className="w-full h-full flex flex-col text-center justify-items-center divide-y divide-dashed divide-indigo-500">
                      <div className="pb-10">
                        <h1 className="text-6xl text-indigo-500 font-bold tracking-wide py-1">{`${doctor.title} ${doctor.name} ${doctor.surname}`}</h1>
                        <h2 className="text-2xl text-gray-500 italic font-light">{doctor.specializations.join(', ')}</h2>
                      </div>
                      <div className="py-10">
                        <p className="text-gray-500 text-justify text-lg">{doctor.description}</p>
                      </div>
                      <div className="pt-10 w-full flex justify-between">
                        <h3 className="text-indigo-400 text-left text-xl font-light">Birthday: {doctor.birthday}</h3>
                        <h3 className="text-indigo-400 text-left text-xl font-light">Last modified: {formatDate(new Date(doctor.updatedAt), 'DD-MM-YYYY HH:mm:ss')}</h3>
                      </div>
                    </div>
                 </div>
              </div>
          </main>
          <Footer />
        </div>
    )
}

export async function getStaticPaths() {

    const {client} = require('../../graphql/utils')
    const {doctors} = await client.request(
    `
    query MyQuery {
        doctors {
          slug
        }
      }
      
    `)

    const paths = doctors.map(d => ({params: {slug: d.slug}}))
    return {
      paths,
      fallback: false
    };
  }

  export async function getStaticProps({params}) {

    const {client} = require('../../graphql/utils')
    const {doctor} = await client.request(
    `
      query MyQuery($slug: String!) {
        doctor(where: {slug: $slug}) {
          id
          name
          slug
          surname
          title
          birthday
          description
          profile {
            handle
            height
            id
            size
            width
            url
          }
          updatedAt
          specializations
        }
      }
    `, {slug: params.slug})

    return {
      props: {
        doctor
      }, // will be passed to the page component as props
    }
  }