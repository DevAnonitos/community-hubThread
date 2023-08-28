import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import Comment from '@/components/forms/Comment';
import ThreadCard from '@/components/cards/ThreadCard';

import { fetchUser } from '@/lib/actions/user.actions';

export const revalidate = 10;

const Page = async ({ params }: { params: { id: string } }) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) return redirect("/onboarding");

    return (
        <>
            <Suspense>
                <section className='relative'>
                    <div>
                        <ThreadCard

                        />
                    </div>

                    <div className='mt-7'>
                        <Comment />
                    </div>

                    <div className='mt-10'>
                        <ThreadCard

                        />
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
