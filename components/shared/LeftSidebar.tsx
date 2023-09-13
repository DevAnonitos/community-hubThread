"use client";

import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

const LeftSidebar = () => {

    const router = useRouter();
    const pathName = usePathname();

    const { userId } = useAuth();

    return (
        <div>
            <section className='custom-scrollbar leftsidebar border-r-[1px] border-gray-700'>
                <div className='flex w-full flex-1 flex-col gap-6 px-6'>
                    {sidebarLinks.map((link) => {
                        const isActive =
                            (pathName.includes(link.route) && link.route.length > 1)
                            || pathName === link.route;

                        if(link.route === '/profile') {
                            link.route = `${link.route}/${userId}`
                        }

                        return (
                            <Fragment key={link.id}>
                                <Link
                                    href={link.route}
                                    className={`leftsidebar_link hover:bg-primary-500 transition-all duration-500 ease-in-out delay-100
                                        ${isActive && "bg-primary-500 "}
                                    `}
                                >
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                        loading='lazy'
                                    />
                                    <p className='text-light-1 max-lg:hidden'>
                                        {link.label}
                                    </p>
                                </Link>
                            </Fragment>
                        )
                    })}
                </div>

                <div className='mt-10 px-6'>
                    <SignedIn>
                        <SignOutButton
                            signOutCallback={() => router.push("/sign-in")}
                        >
                            <div
                                className='flex cursor-pointer
                                gap-4 p-4 border-[1px] border-gray-700 rounded-xl'
                            >
                                <Image
                                    src='/assets/logout.svg'
                                    alt='logout'
                                    width={24}
                                    height={24}
                                    loading='lazy'
                                />

                                <p
                                    className='text-red-500 text-xl
                                    font-semibold max-lg:hidden'
                                >
                                    LogoutApp
                                </p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </section>
        </div>
    );
};

export default LeftSidebar;
