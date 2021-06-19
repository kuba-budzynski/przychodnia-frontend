import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon
} from '@heroicons/react/outline';
import { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';

import AvatarDropdown from './AvatarDropdown';
import { ChevronDownIcon } from '@heroicons/react/solid';
import FetchError from './FetchError';
import { GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import { Loader } from '../components/utils';
import Worker from '../components/Worker';
import logo from '../public/logo.svg';
import { orderBy } from 'lodash';
import styled from '../styles/scrollbar.module.scss';
import styles from '../styles/Navbar.module.css';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    }
});

const fetcher = (query) => client.request(query);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Example() {
    const { user } = useUser();
    const { data, error } = useSWR(
        `query MyQuery {
            doctors {
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
            specializations
            }
        }`,
        fetcher
    );

    useEffect(() => {
        const doc = document.documentElement;
        const w = window;
        let curScroll;
        let prevScroll = w.scrollY || doc.scrollTop;
        let curDirection = 0;
        let prevDirection = 0;
        const header = document.getElementById('navbar');
        header.classList.add(styles.header);
        let toggle;
        const threshold = window.innerHeight;

        const checkScroll = () => {
            curScroll = w.scrollY || doc.scrollTop;
            if (curScroll > prevScroll) curDirection = 2;
            else curDirection = 1;
            if (curDirection != prevDirection) {
                toggle = toggleHandler();
            }
            prevScroll = curScroll;
            if (toggle) {
                prevDirection = curDirection;
            }
        };

        const toggleHandler = () => {
            toggle = true;
            if (curDirection === 2 && curScroll > threshold) {
                header.classList.add(styles.hide);
            } else if (curDirection === 1) {
                header.classList.remove(styles.hide);
            } else {
                toggle = false;
            }
            return toggle;
        };
        window.addEventListener('scroll', checkScroll);
    }, []);

    if (error) <FetchError message={error.data} />;

    return (
        <Popover className="relative bg-white outline-none z-10" id="navbar">
            {({ open }) => (
                <>
                    <div className="max-w-8xl mx-auto px-4 sm:px-6">
                        <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                <Link href="/" prefetch={false}>
                                    <a>
                                        <span className="sr-only">Workflow</span>
                                        <img className="h-8 w-auto sm:h-10" src={logo} alt="Logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="-mr-2 -my-2 md:hidden">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                            <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                <Link href="/calendar" prefetch={false}>
                                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">Nowa wizyta</a>
                                </Link>
                                <Link href="/faq" prefetch={false}>
                                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">FAQ</a>
                                </Link>
                                <Link href="/regulamin" prefetch={false}>
                                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">Regulamin</a>
                                </Link>

                                <Popover className="relative max-h-96">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}>
                                                <span>Pracownicy</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
                                                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1">
                                                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0 ">
                                                    <div className="rounded-lg shadow-lg ring-2 ring-black ring-opacity-5 ">
                                                        <div
                                                            className={`relative flex flex-col bg-white p-2 overflow-y-scroll max-h-128 ${styled.scrollbar} divide-y-2 divide-gray-100`}>
                                                            {!data ? (
                                                                <div className="w-full h-16 mx-auto">
                                                                    <Loader color="text-indigo-500"></Loader>
                                                                </div>
                                                            ) : (
                                                                orderBy(data.doctors, 'surname', 'asc').map((doctor) => (
                                                                    <div className="py-2" key={doctor.slug}>
                                                                        <Worker doctor={doctor} />
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                {!user ? (
                                    <Link href="/api/auth/login">
                                        <a className="whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600">
                                            Login / Register
                                        </a>
                                    </Link>
                                ) : (
                                    <AvatarDropdown profileURL={user.picture} name={user.name} />
                                )}
                            </div>
                        </div>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Popover.Panel focus static className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img className="h-8 w-auto" src={logo} alt="Workflow" />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col py-6 px-5 space-y-6">
                                    <div className="flex items-center justify-center md:flex-1 lg:w-0">
                                        {!user ? (
                                            <Link href="/api/auth/login">
                                                <a className="whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600">
                                                    Login / Register
                                                </a>
                                            </Link>
                                        ) : (
                                            <AvatarDropdown profileURL={user.picture} name={user.name} />
                                        )}
                                    </div>
                                    <Popover className="relative max-h-20">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button className=" text-gray-900 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                                    <span>Pracownicy</span>
                                                    <ChevronDownIcon
                                                        className={classNames(
                                                            open ? 'text-gray-600' : 'text-gray-400',
                                                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </Popover.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 translate-y-1"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-1">
                                                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0 ">
                                                        <div className="rounded-lg shadow-lg ring-2 ring-black ring-opacity-5 ">
                                                            <div
                                                                className={`relative flex flex-col bg-white p-2 overflow-y-scroll max-h-128 ${styled.scrollbar} divide-y-2 divide-gray-100`}>
                                                                {!data ? (
                                                                    <div className="w-full h-16 mx-auto">
                                                                        <Loader color="text-indigo-500"></Loader>
                                                                    </div>
                                                                ) : (
                                                                    orderBy(data.doctors, 'surname', 'asc').map((doctor) => (
                                                                        <div className="py-2" key={doctor.slug}>
                                                                            <Worker doctor={doctor} />
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                    <Link href="/calendar" prefetch={false}>
                                        <a className="text-base font-medium text-gray-900 hover:text-gray-700">Nowa wizyta</a>
                                    </Link>
                                    <Link href="/faq" prefetch={false}>
                                        <a className="text-base font-medium text-gray-900 hover:text-gray-700">FAQ</a>
                                    </Link>

                                    <Link href="/regulamin">
                                        <a className="text-base font-medium text-gray-900 hover:text-gray-700">Regulamin</a>
                                    </Link>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
