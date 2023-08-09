import React from 'react';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { SearchBar, Pagination } from '@/components/shared';

const Page = async () => {
    return (
        <>
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

                <SearchBar
                    routeType='search'
                />

                <Pagination />
            </section>
        </>
    );
};

export default Page;
