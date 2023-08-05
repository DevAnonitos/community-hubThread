"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const BottomBar = () => {

    const pathname: string | undefined  = usePathname();

    return (
        <>
            <section className='bottombar'>
                <div className='bottombar_container'>
                    Link
                </div>
            </section>
        </>
    );
};

export default BottomBar;
