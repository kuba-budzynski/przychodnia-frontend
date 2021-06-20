import * as yup from 'yup';
import dynamic from 'next/dynamic';
import { Astrisk, ErrorMessage } from '../components/utils';
import React, { useEffect } from 'react';
import formatDate from '@bitty/format-date';
import request from '../config/request';
import { store } from 'react-notifications-component';
import { useFormik } from 'formik';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Footer = dynamic(import('../components/Footer'));
const Navbar = dynamic(import('../components/Navbar'));
const Loading = dynamic(import('../components/Loading'));
const fetcher = (url) => request.get(url).then((res) => res.data);

function profile({ user }) {
    const { data, error } = useSWR(`/user/profile/${user.email}`, fetcher);
    const init = {
        name: data?.name,
        surname: data?.surname,
        phone: data?.phone,
        birthday: data?.birthday,
        pesel: data?.pesel
    };

    const onSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        try {
            const url = '/user/profile/' + data.email;
            const x = await request.post(url, values);
            if (x.data) {
                store.addNotification({
                    title: 'Ustawiliśmy nowe dane',
                    message: 'Gratulujemy',
                    type: 'success',
                    insert: 'top',
                    container: 'bottom-center',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            } else {
                store.addNotification({
                    title: 'Wystąpiły jakieś blędy',
                    message: 'Spróbuj ponownie później',
                    type: 'danger',
                    insert: 'top',
                    container: 'bottom-center',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
            setStatus({ success: true });
        } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });
        }
    };

    const validation = yup.object().shape({
        name: yup.string().max(50, 'Name is 50 chracters max'),
        surname: yup.string().max(50, 'Surname is 50 characters max'),
        phone: yup.string().max(9, 'Phone number has 9 digits'),
        birthday: yup.date().max(new Date(), 'You are not that young'),
        pesel: yup.string().length(11, 'Pesel has 11 digits')
    });

    const formik = useFormik({
        initialValues: init,
        validationSchema: validation,
        onSubmit: onSubmit
    });

    useEffect(() => {
        if (data) {
            formik.setValues({
                name: data?.name,
                surname: data?.surname,
                phone: data.phone == 0 ? '' : data.phone,
                birthday: data.birthday ? formatDate(new Date(data.birthday), 'YYYY-MM-DD') : '',
                pesel: data?.pesel
            });
            if (!data.name_updated || !data.surname_updated || !data.birthday_updated || !data.pesel_updated) {
                store.addNotification({
                    title: 'Twój profil nie jest pełny',
                    message: 'Uzupełnij brakujące dane',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 15000,
                        onScreen: true
                    }
                });
            }
        }
    }, [data]);

    if (error) return <div>ERROR</div>;
    if (!data) return <Loading />;

    return (
        <div className="relative w-screen min-h-screen max-w-full bg-gray-50 flex justify-center justify-items-center flex-col">
            <Navbar />
            <div className="min-h-screen py-16 w-full max-w-5xl mx-auto px-4">
                <div className="flex flex-col xl:flex-row xl:space-x-8 my-24 mx-auto justify-center xl:justify-start justify-items-center">
                    <div className="w-full xl:w-auto bg-cover xl:mx-auto pb-6 xl:pb-0">
                        <img
                            src={user.picture}
                            className="rounded-full overflow-hidden shadow-xl w-40 h-40 mx-auto xl:mx-0"
                            alt={data.email.toString()}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 justify-center  justify-items-center">
                        <h1 className="text-center xl:text-left text-5xl text-gray-500 font-semibold">Profil użytkownika:</h1>
                        <h2 className="text-center xl:text-left text-xl text-indigo-400">
                            {data.name && data.surname ? data.name + ' ' + data.surname : user.name ? user.name : user.nickname}
                        </h2>
                        <button
                            type="submit"
                            form="profileForm"
                            className="py-2 bg-emerald-400 hover:bg-emerald-500 text-white text-base font-bold rounded-md w-full max-w-xl mx-auto">
                            Zapisz zmiany
                        </button>
                        <h3 className="text-center text-sm text-gray-400 italic">
                            <Astrisk /> - tych danych nie da się edytować
                        </h3>
                    </div>
                </div>

                <div className="w-full px-3 mx-auto">
                    <form
                        id="profileForm"
                        className="space-y-4 py-2 divide-y-2 divide-trueGray-100 max-w-2xl mx-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}>
                        <div className="flex flex-col px-4">
                            <p className="text-xl text-gray-500 font-semibold mb-1 px-2">
                                Identyfikator użytkownika <Astrisk />
                            </p>
                            <input
                                className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                                type="text"
                                name="id"
                                value={user.sub}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <p className="text-xl text-gray-500 font-semibold mb-1 px-2">
                                Email <Astrisk />
                            </p>
                            <input
                                className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                                type="text"
                                name="id"
                                value={data.email}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <label className="text-xl text-gray-500 font-semibold mb-1 px-2" for="name">
                                Imię {data.name_updated ? <Astrisk /> : ''}
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 text-sm text-gray-500 font-normal leading-none bg-white outline-none rounded-md"
                                readOnly={data.name_updated}
                            />
                            {formik.touched.name && formik.errors.name ? <ErrorMessage id="errorName" msg={formik.errors.name} /> : null}
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <label className="text-xl text-gray-500 font-semibold mb-1 px-2" for="surname">
                                Nazwisko {data.surname_updated ? <Astrisk /> : ''}
                            </label>
                            <input
                                id="surname"
                                name="surname"
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 text-sm text-gray-500 font-normal leading-none bg-white outline-none rounded-md"
                                readOnly={data.surname_updated}
                            />
                            {formik.touched.surname && formik.errors.surname ? <ErrorMessage id="errorName" msg={formik.errors.surname} /> : null}
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <label className="text-xl text-gray-500 font-semibold mb-1 px-2" for="birthday">
                                Data urodzenia {data.birthday_updated ? <Astrisk /> : ''}
                            </label>
                            <input
                                id="birthday"
                                name="birthday"
                                value={formik.values.birthday}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="date"
                                className="w-full px-3 py-2 text-sm text-gray-500 font-normal leading-none bg-white outline-none rounded-md"
                                readOnly={data.birthday_updated}
                            />
                            {formik.touched.birthday && formik.errors.birthday ? (
                                <ErrorMessage id="errorbirthday" msg={formik.errors.birthday} />
                            ) : null}
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <label className="text-xl text-gray-500 font-semibold mb-1 px-2" for="pesel">
                                Pesel {data.pesel_updated ? <Astrisk /> : ''}
                            </label>
                            <input
                                id="pesel"
                                name="pesel"
                                value={formik.values.pesel}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 text-sm text-gray-500 font-normal leading-none bg-white outline-none rounded-md"
                                readOnly={data.pesel_updated}
                            />
                            {formik.touched.pesel && formik.errors.pesel ? <ErrorMessage id="errorpesel" msg={formik.errors.pesel} /> : null}
                        </div>

                        <div className="flex flex-col px-4 pt-4">
                            <label className="text-xl text-gray-500 font-semibold mb-1 px-2" for="phone">
                                Numer telefonu
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 text-sm text-gray-500 font-normal leading-none bg-white outline-none rounded-md"
                            />
                            {formik.touched.phone && formik.errors.phone ? <ErrorMessage id="errorphone" msg={formik.errors.phone} /> : null}
                        </div>
                    </form>
                    <div className="w-full px-4 text-gray-400 italic text-xs  hidden xl:flex justify-between mt-5 max-w-2xl mx-auto">
                        <p>Created at {formatDate(new Date(data.created_at), 'YYYY-MM-DD HH:mm:ss')}</p>
                        <p>Updated at {formatDate(new Date(data.updated_at), 'YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default profile;

export const getServerSideProps = withPageAuthRequired();
