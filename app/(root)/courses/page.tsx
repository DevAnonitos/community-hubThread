import React, { Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';

import { redirect, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";

import { SearchBar, Pagination } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { fetchUser } from '@/lib/actions/user.actions';


const Page = async (
    { searchParams }: {
        searchParams: {
            [key: string]: string | undefined,
        }
    }
) => {

    const user = await currentUser();
    console.log(user);
    if(!user) {
        notFound();
    }

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
            <section>
                <div className='flex flex-col items-center justify-between sm:flex-row'>
                    <div className='flex items-center'>
                        <Image
                            src="/assets/list.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10 '>
                            CrashCourses
                        </h1>
                    </div>

                    <div className='mb-10 flex items-center'>
                        <Button 
                            className='bg-primary-500 hover:bg-primary-500 
                            rounded-xl'
                        >
                            <Link href={`/create-course`}>
                                Create Course
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className='mt-5'>
                    <SearchBar routeType='courses' />
                </div>
            </section>
        </>
    );
};

export default Page;
