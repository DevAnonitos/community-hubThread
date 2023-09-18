import React, { Suspense } from 'react';

import { currentUser } from '@clerk/nextjs';
import Image from "next/image";
import { redirect, notFound } from 'next/navigation';

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
            Creator course page
        </>
    );
};

export default Page;