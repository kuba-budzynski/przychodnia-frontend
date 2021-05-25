import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import logo from '../public/logo.svg';

const onSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    try {
        const data = {
            name: values.name,
            email: values.email
        };
        alert(JSON.stringify(data));
    } catch (error) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
    }
};

const ErrorMessage = ({ msg }) => {
    return (
        <div className="w-full text-center text-red-500 py-1 text-xs">
            <p>{msg}</p>
        </div>
    );
};

function Footer() {
    const validation = yup.object().shape({
        name: yup.string().max(50, 'Maksymalnie 50 znaków').required('Wymagane pole'),
        email: yup.string().max(100, 'Maksymalnie 100 znaków').email('Podaj poprawny email')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: validation,
        onSubmit: onSubmit
    });

    return (
        <div className="bg-blueGray-900 w-full mx-auto">
            <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6 lg:py-8 lg:px-8">
                <div className="flex flex-col items-center lg:flex lg:flex-row justify-around space-x-4">
                    <div className="flex flex-col justify-center justify-items-center mx-auto">
                        <h1 className="text-2xl leading-5 font-extrabold tracking-widest text-coolGray-200 uppercase mb-3 text-center mt-8 lg:mt-0">
                            Menu
                        </h1>
                        <ul className="mt-4 text-center">
                            <li className="mt-4">
                                <Link href="/" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">Home</a>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/faq" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">FAQ</a>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/regulamin" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">Regulamin</a>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">Link #4</a>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">Link #5</a>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/" prefetch={false}>
                                    <a className="text-base leading-6 text-gray-300 hover:text-gray-400">Link #6</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-3/4 m-0 mt-16 lg:w-1/2 lg:mt-8 xl:mt-0 text-center">
                        <img className="mx-auto h-16 mb-2" src={logo} alt="Logo"></img>
                        <p className="text-sm leading-5 font-semibold tracking-wider text-gray-200 uppercase ">Zapisz się&nbsp;na Newsletter</p>
                        <p className="mt-4 text-gray-200 text-sm leading-6">
                            Otrzymasz od Nas wiadomości dotyczące nowych usług lub ofert specjalnych
                        </p>
                        <form
                            className="mt-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                            }}>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input
                                        aria-label="Name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        placeholder="Twoje imię"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <ErrorMessage msg={formik.errors.name} />
                                    ) : (
                                        <ErrorMessage msg={''} />
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        aria-label="Email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                        placeholder="Adres email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <ErrorMessage msg={formik.errors.email} />
                                    ) : (
                                        <ErrorMessage msg={''} />
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-white group-hover:text-indigo-400 transition ease-in-out duration-150"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </span>
                                    Zapisz się
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-600 md:flex md:items-center md:justify-around md:pt-4">
                    <div className="flex md:order-2 justify-center">
                        <a className="text-gray-500 hover:text-gray-400" target="_blank" href="#">
                            <span className="sr-only">Facebook</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <a className="ml-6 text-gray-500 hover:text-gray-400" href="#">
                            <span className="sr-only">Twitter</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                        <a className="ml-6 text-gray-500 hover:text-gray-400" href="#">
                            <span className="sr-only">LinkedIn</span>
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <p className="mt-2 text-center text-xs md:text-base leading-6 text-gray-400 md:order-1 md:text-left">
                            Przychodnia XYZ @ {new Date().getFullYear()}. Wszelkie prawa zastrzeżone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
