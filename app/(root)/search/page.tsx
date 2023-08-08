import React from 'react';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { SearchBar } from '@/components/shared';

const Page = async () => {
    return (
        <>
            <section>
                <h1 className='head-text mb-10'>
                    SearchUser
                </h1>

                <SearchBar
                    routeType='search'
                />
            </section>
        </>
    );
};

export default Page;
