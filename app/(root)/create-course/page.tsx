import React, { Suspense } from 'react';

import { currentUser } from '@clerk/nextjs';
import Image from "next/image";
import { redirect, notFound } from 'next/navigation';

import { PostCourse } from '@/components/forms';
import { fetchUser } from '@/lib/actions/user.actions';

const Page = async () => {

    const user = await currentUser();
    if(!user) {
        notFound();
    }

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
            <section>
                <div className='flex items-center'>
                    <Image
                        src="/assets/create.svg"
                        alt='UserProfile'
                        width={34}
                        height={34}
                        className='object-contain flex items-center mb-10 mr-4'
                    />

                    <h1 className='head-text mb-10'>
                        Create crash course
                    </h1>
                </div>

                <PostCourse userId={userInfo._id.toString()}/>
            </section>
        </>
    );
};

export default Page;