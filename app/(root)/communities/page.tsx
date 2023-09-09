import React, { Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { SearchBar, Pagination } from '@/components/shared';
import CommunityCard from '@/components/cards/CommunityCard';
import { fetchUser } from '@/lib/actions/user.actions';

const Page = async (
    {
        searchParams,
    }:
    {
        searchParams: {
            [key: string]: string | undefined,
        }

    }) => {

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
            <Suspense>
                <section>
                    <div className='flex items-center'>

                        <Image
                            src="/assets/community.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10'>
                            Communities
                        </h1>
                    </div>

                    <div className='mt-5'>
                        <SearchBar routeType='communities' />
                    </div>

                    <section className='mt-9 flex flex-wrap gap-4'>

                    </section>

                    <Pagination
                        path='communities'
                        pageNumber={5}
                    />
                </section>
            </Suspense>
        </>
    );
};

export default Page;
