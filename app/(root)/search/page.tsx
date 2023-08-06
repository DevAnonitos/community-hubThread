import React from 'react';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    return (
        <div className='text-white text-xl'>
            Search page
        </div>
    );
};

export default Page;
