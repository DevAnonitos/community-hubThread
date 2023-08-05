"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

const LeftSidebar = () => {

    const router = useRouter();
    const pathName = usePathname();

    const { userId } = useAuth();

    return (
        <>
            <section className='custom-scrollbar leftsidebar'>

            </section>
        </>
    );
};

export default LeftSidebar;
