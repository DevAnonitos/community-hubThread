
import React from 'react';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';
import {
    OrganizationSwitcher,
    SignedIn,
    SignOutButton,
} from "@clerk/nextjs";
import TabNavBar from '../forms/TabNavBar';

const TopBar = () => {
    return (
        <>
            <nav className='topbar border-b-2 border-gray-700'>
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
                        '
                    >
                        HubThreads
                    </p>
                </Link>

                <div className='hidden md:block'>
                    <TabNavBar />
                </div>

                <div className='flex items-center gap-1'>
                    <div className='block md:hidden'>
                        <SignedIn>
                            <SignOutButton>
                                <div className='flex cursor-pointer'>
                                    <Image
                                        src="/assets/logout.svg"
                                        alt='Logout'
                                        width={28}
                                        height={28}
                                    />
                                </div>
                            </SignOutButton>
                        </SignedIn>
                    </div>

                    <OrganizationSwitcher
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                organizationSwitcherTrigger: "py-2 px-4",
                            }
                        }}
                    />
                </div>
            </nav>
        </>
    );
};

export default TopBar;
