import React, { Suspense } from 'react';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { SearchBar, Pagination } from '@/components/shared';

const Page = async () => {
    return (
        <>
            <Suspense>
                <section>
                    <div className='flex items-center'>

                        <Image
                            src="/assets/user.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10'>
                            SearchUser
                        </h1>
                    </div>

                    <div className='mt-5'>
                        <SearchBar
                            routeType='search'
                        />
                    </div>

                    <Pagination pageNumber={3}/>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
