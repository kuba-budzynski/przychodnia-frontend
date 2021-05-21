import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'
import { ErrorMessage } from '../components/utils'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import login2 from '../public/login2.svg'
import hospital from '../public/hospital4.svg'
import { useRouter } from 'next/router';
import Link from 'next/link'

import patterns from '../styles/patterns.module.scss'

import server from '../public/server.svg'
import padlock from '../public/padlock2.svg'
import cypher from '../public/cyphers.svg'

function signup() {

    const router = useRouter()
    const onSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
            }
            const res = await axios.post(process.env.BACKEND + "/auth/login/", data)   
            if(res.data.success){
               auth.setToken(res.data.data.token)
               router.push('/upload')
            }
            else{
                alert("Not logged in")
            }
            resetForm({})
            setStatus({ success: true })
        } catch (error) {
            setStatus({ success: false })
            setSubmitting(false)
            setErrors({ submit: error.message })
            resetForm({})
        }
    }

    const validation = yup.object().shape({
        email: yup.string().email("Podaj poprawny adres email").max(50, "Email jest zbyt długi").required("To pole jest wymagane"),
        password: yup.string().required("To pole jest wymagane").min(8, "Hasło musi mieć minimum 8 znaków")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: onSubmit
    })

    return (
        <div className="bg-coolGray-50 ">
            <Head>
                <title>Strona rejestracji</title>
                <meta name="description" content="Opis..." />
            </Head>

            <Navbar />
            <main className={`w-screen max-w-full xl:py-28 xxxl:py-48 min-h-screen xxl:min-h-0 ${patterns.paper}`}>
                <div className="box-border xl:pt-16 w-full">
                <div className="w-full xl:w-10/12 mx-auto flex flex-col-reverse xl:flex-row">
                        <div className="px-8 xl:px-4 w-full xl:w-1/2 mx-auto my-auto" id="form">
                            <div className="flex flex-wrap justify-center ">
                                <div className="xl:flex xl:flex-col w-full xl:w-1/2 py-12 ">
                                    <div className="w-full max-w-2xl xl:max-w-4xl mx-auto xl:mx-0 my-auto">
                                        <img src={padlock} className="w-48 h-48 mx-auto"></img>
                                        <h4 className="my-6 text-4xl font-semibold text-center text-indigo-400">Dołącz do Nas</h4>
                                            <form id="loginForm" onSubmit={e => {
                                                    e.preventDefault()
                                                    formik.handleSubmit();
                                            }}>
                                            <div className="mb-4">
                                                <div className="flex px-4 bg-indigo-50 rounded-md">
                                                    <input
                                                        className="w-full py-4 text-xs placeholder-gray-400 font-semibold leading-none bg-indigo-50 outline-none"
                                                        type="email" placeholder="Podaj swój email" name="email" required value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                    <svg className="h-6 w-6 ml-4 my-auto text-gray-300"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                                        </path>
                                                    </svg>
                                                </div>
                                                {formik.touched.email && formik.errors.email ? <ErrorMessage msg={formik.errors.email} /> : null}
                                            </div>
                                            <div className="mb-6">
                                                <div className="flex px-4 bg-indigo-50 rounded-md">
                                                    <input
                                                        className="w-full py-4 text-xs placeholder-gray-400 font-semibold leading-none bg-indigo-50 outline-none"
                                                        type="password" placeholder="Podaj swoje hasło" name="password" required value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                                    <button className="ml-4">
                                                        <svg className="h-6 w-6 my-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                {formik.touched.password && formik.errors.password ? <ErrorMessage msg={formik.errors.password} /> : null}
                                            </div>
                                            <button className="block w-full p-4 text-center text-base text-white font-semibold leading-none bg-indigo-500 hover:bg-indigo-600 rounded">
                                                Sign in
                                            </button>
                                            </form>
                                        </div>
                                        <div>
                                            <p className="mt-4 text-xs text-gray-400 text-center">     
                                                <Link href="/regulamin">
                                                    <a className="underline hover:text-gray-500 text-center" >
                                                        Regulamin
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-indigo-400 mt-12 xl:mt-0 w-full xl:w-1/2 xl:rounded-3xl shadow-lg" id="image">
                                <div className="flex items-center mx-auto h-full w-full">
                                    <img className="mx-auto h-full" src={hospital} alt="" />
                                </div>
                            </div>
                        </div>
                </div>
            </main>

            <div className="w-full py-32 bg-indigo-400">
               <div className="w-full max-w-7xl mx-auto xl:space-x-6 flex flex-col xl:flex-row px-4 xl:px-0">
                <div className="w-full xl:w-1/2 mx-auto">
                        <img src={server} className="w-full h-full mx-auto"></img>
                </div>   
                <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                    <h1 className="text-3xl xl:text-5xl font-bold text-white text-center">Twoje dane bezpiecznie spoczywają na Naszych serwerach</h1>
                    <p className="text-white text-base px-6 text-justify pt-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat. Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                    </p>
                </div>  
               </div>                      
            </div>

            <div className="w-full py-32">
               <div className="w-full max-w-7xl mx-auto xl:space-x-10 flex flex-col xl:flex-row-reverse px-4 xl:px-0">
                <div className="w-full xl:w-1/2 mx-auto">
                        <img src={cypher} className="w-full h-full mx-auto px-4"></img>
                </div>   
                <div className="w-full xl:w-1/2 mx-auto flex flex-col">
                    <h1 className="text-3xl xl:text-5xl font-bold text-indigo-400 text-center">Używamy najnowosze metody szyfrowania oraz bezpieczeństwa</h1>
                    <p className="text-gray-400 text-base px-6 text-justify pt-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nunc non mollis ultrices. Curabitur cursus luctus lacus, id sagittis leo. Donec ultrices auctor erat ut gravida. Cras ut varius augue, nec aliquet lectus. Proin elementum ex nec iaculis ullamcorper. Aliquam facilisis felis at purus rutrum sodales. Aenean congue ligula sit amet egestas malesuada. Nulla ut ipsum libero. Morbi tristique dolor leo, in euismod turpis ultrices sed. Aliquam erat volutpat. Suspendisse iaculis hendrerit nulla, et accumsan erat tempus ac.
                    </p>
                </div>  
               </div>                      
            </div>
            <Footer />
        </div>
    )
}

export default signup
