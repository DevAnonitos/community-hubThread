import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";

import AccountProfile from '@/components/forms/AccountProfile';

const Page = async () => {

    const user = await currentUser();

    if(!user) return null;

    console.log(user);

    return (
        <>
            <div>
                <h1 className='head-text'>
                    EditProfile
                </h1>

                <p className='mt-3 text-base-regular text-light-2'>
                    Make any change
                </p>

                <section className='mt-12'>
                    <AccountProfile
                        btnTitle='Continue'
                    />
                </section>
            </div>
        </>
    );
};

export default Page;
