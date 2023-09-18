import React, { Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect, notFound } from "next/navigation";

import AccountProfile from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.actions';

const Page = async () => {

    const user = await currentUser();

    if(!user) {
        notFound();
    }

    console.log(user);


    const userInfo = await fetchUser(user.id);

    if(!userInfo.onboarding) return redirect("/onboarding");

    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    };


    return (
        <>
            <>
                <div>
                    <h1 className='head-text'>
                        EditProfile
                    </h1>

                    <p className='mt-3 text-base-regular text-light-2'>
                        Make any change
                    </p>

                    <section className='mt-12'>
                        <AccountProfile
                            user={userData}
                            btnTitle='Continue'
                        />
                    </section>
                </div>
            </>
        </>
    );
};

export default Page;
