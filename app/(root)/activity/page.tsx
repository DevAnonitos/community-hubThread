import React from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';

const Page = async () => {

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
            <section>
                <div className='flex items-center'>
                    <Image
                        src="/assets/heart.svg"
                        alt='UserProfile'
                        width={34}
                        height={34}
                        className='object-contain flex items-center mb-10 mr-4'
                    />

                    <h1 className='head-text mb-10'>
                        Activities
                    </h1>
                </div>

                <section className='mt-5 flex flex-col gap-5'>
                    hello
                </section>
            </section>
        </>
    );
};

export default Page;
