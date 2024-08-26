import React, { useState } from 'react';
import { Navbar } from 'flowbite-react';
import { Link } from '@inertiajs/react';
import UserDropdown from './UserDropdown';
import { HiMenuAlt1, HiX } from 'react-icons/hi';

function NavbarComponent({ appName, user, onMenuToggle, sidebarOpen }) {
  return (
    <Navbar
        theme={{
            root: {
                base: "fixed top-0 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",
                inner: {
                    base: "px-3 py-3 lg:px-5 lg:pl-3",
                },
            },
            brand: {
                base: "flex ms-2 md:me-24",
            },
        }}

        fluid
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
                <button
                    type='button'
                    onClick={onMenuToggle}
                    className=' md:hidden p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                    {sidebarOpen ? <HiX size={24} color='gray' /> : <HiMenuAlt1 size={24} color='gray' />}
                </button>

                <Navbar.Brand as={Link} href={route('dashboard')}>
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                        {appName}
                    </span>
                </Navbar.Brand>
            </div>

            <div className="flex items-center">
                <div className="flex items-center ms-3">
                    <UserDropdown user={user} />
                </div>
            </div>
        </div>
    </Navbar>
  )
}

export default NavbarComponent