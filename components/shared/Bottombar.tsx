'use client';

import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from "@/constants";

const BottomBar = () => {

    const pathname = usePathname();

    return (
        <div>
            <section className='bottombar border-t-2 border-gray-700'>
                <div className='bottombar_container'>
                    {sidebarLinks.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) && link.route.length > 1)
                            || pathname === link.route;

                            return (
                                <Fragment key={link.id}>
                                    <Link
                                        href={link.route}
                                        className={`bottombar_link
                                            ${isActive && "bg-primary-500"}
                                        `}
                                    >
                                        <Image
                                            src={link.imgURL}
                                            alt={link.label}
                                            width={16}
                                            height={16}
                                            className='object-contain'
                                        />
                                        <p
                                            className='text-subtle-medium
                                            text-light-1 max-sm:hidden'
                                        >
                                            {link.label.split(/\s+/)[0]}
                                        </p>
                                    </Link>
                                </Fragment>
                            );
                    })}
                </div>
            </section>
        </div>
    );
};

export default BottomBar;
