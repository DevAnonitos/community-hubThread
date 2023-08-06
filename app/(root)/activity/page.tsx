import React from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async () => {
    return (
        <div className='text-white'>
            Active page
        </div>
    );
};

export default Page;
