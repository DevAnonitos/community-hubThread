import React from 'react';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';
import {
    OrganizationSwitcher,
    SignedIn,
    SignOutButton
} from "@clerk/nextjs";

const TopBar = () => {
    return (
        <>
            <nav className='topbar'>
                <Link
                    href="/"
                    className='flex items-center gap-4'
                >
                    <Image
                        src="/assets/logo.svg"
                        alt='Logo'
                        width={38}
                        height={38}

                    />
                    <p
                        className='text-heading3-bold
                        text-light-1 max-xs:hidden
                        border-2 py-2 px-3 rounded-xl'
                    >
                        HubThreads
                    </p>
                </Link>

                <div className='flex items-center gap-1'>
                    <div className='block md:hidden'>
                        {/* <SignedIn>
                            <SignOutButton> */}
                                <div className='flex cursor-pointer'>
                                    <Image
                                        src="/assets/logout.svg"
                                        alt='Logout'
                                        width={28}
                                        height={28}
                                    />
                                    Logout
                                </div>
                            {/* </SignOutButton>
                        </SignedIn> */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default TopBar;
