import React, { useState, Fragment } from "react";
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import smartTruncate from 'smart-truncate'

import {FaRegClipboard} from 'react-icons/fa'
import {AiOutlineClockCircle, AiOutlineUser} from 'react-icons/ai'

function AvatarDropdown({profileURL, name}) {

    const url = profileURL == null || profileURL == undefined ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : profileURL

    const solutions = [
        {
          name: 'Profile',
          description: 'Zobacz profil użytkownika',
          href: '/profile',
          icon: AiOutlineUser,
        },
        {
          name: 'Zaplanowane wizyty',
          description: 'Zobacz co Cię czeka w przyszłości',
          href: '/wizyty/zaplanowane',
          icon: FaRegClipboard,
        },
        {
          name: 'Historia wizyt',
          description: 'Zobacz historię swoich wizyt',
          href: '/wizyty/historia',
          icon: AiOutlineClockCircle,
        },
      ]

    return (
        <>
            <div className="flex flex-col items-start sm:items-center sm:flex-row flex-wrap outline-none ring-0">
            <Popover className="relative outline-none">
                    {({ open }) => (
                    <>
                        <Popover.Button className="flex flex-row space-x-3">
                            <div className="w-10 h-10 bg-cover">
                                <img src={url} className="rounded-full h-full w-full overflow-hidden" alt />
                            </div>
                            <div className="flex items-center space-x-1 self-center">
                                <p className="text-gray-800 text-base font-medium">{smartTruncate(name, 15)}</p>
                                <ChevronDownIcon className={`h-6 w-6 text-indigo-400 group-hover:text-opacity-80 transition ease-in-out duration-150`} aria-hidden="true"/>
                            </div>    
                        </Popover.Button>
                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                        >
                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-xs">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-2 ring-black ring-opacity-5">
                            <div className="w-full py-3 text-center text-indigo-400 bg-gray-50">
                                <p className="text-xl font-semibold px-2">{smartTruncate(name, 24)}</p>
                            </div>
                            <div className="relative bg-white p-5 flex flex-col space-y-3">
                                {solutions.map((item) => (
                                <Link href={item.href} key={item.name}>
                                    <a className="group flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-400 group-hover:bg-indigo-500 rounded-xl">
                                            <item.icon className="w-6 h-6 text-white"></item.icon>
                                        </div>
                                        <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                        </div>
                                    </a>
                                </Link>
                                ))}
                            </div>
                            <div className="px-4 py-1 bg-gray-50">
                                <Link href="/api/auth/logout">
                                    <a className="flow-root px-2 py-1 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <span className="block text-lg text-center font-bold text-red-500">
                                            Logout
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            </div>
                        </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
            </div>
        </>
    );
}

export default AvatarDropdown
