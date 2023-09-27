import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';


const Page = async () => {

    const user = await currentUser();

    if(!user) {
        return null;
    }

    const userInfo =  await fetchUser(user.id);

    if(!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
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
                            Create Thread
                        </h1>
                    </div>

                    <PostThread userId={userInfo._id.toString()} />
                </section>
            </>
        </>
    );
};

export default Page;
