
import React, { Fragment, Suspense } from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Components Tabs
import { profileTabs } from '@/constants';
import { ThreadsTab, ProfileHeader } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { fetchUser } from '@/lib/actions/user.actions';

import { Skeleton } from '@/components/ui/skeleton';

const Page = async (
    { params }: {
        params: { id: string, }
}) => {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(params.id);

    if(!userInfo?.onboarding) redirect("/onboarding");

    return (
        <>
            <Suspense>
                <section>
                    <h1 className='text-white'>
                        <ProfileHeader
                            accountId={userInfo.id}
                            authUserId={user.id}
                            name={userInfo.name}
                            username={userInfo.username}
                            imgUrl={userInfo.image}
                            bio={userInfo.bio}
                        />
                    </h1>

                    <div className='mt-9'>
                        <Tabs defaultValue='threads' className='w-full'>
                            <TabsList className='tab'>
                                {profileTabs.map((tab) => (
                                    <>
                                        <Fragment key={tab.label}>
                                            <TabsTrigger
                                                value={tab.label}
                                                className='tab'
                                            >
                                                <Image
                                                    src={tab.icon}
                                                    alt={tab.label}
                                                    width={24}
                                                    height={24}
                                                    className='object-contain'
                                                />
                                                <p className='max-sm:hidden'>
                                                    {tab.label}
                                                </p>
                                            </TabsTrigger>
                                        </Fragment>
                                    </>
                                ))}
                            </TabsList>
                            {profileTabs.map((tab) => (
                                <>
                                    <Fragment key={`content-${tab.label}`}>
                                        <TabsContent
                                            value={tab.value}
                                            className='w-full text-light-1'
                                        >
                                            <Suspense fallback={<Skeleton />}>
                                                {/* @ts-ignore */}
                                                <ThreadsTab
                                                    currentUserId={user.id}
                                                    accountId={userInfo.id}
                                                    accountType='User'
                                                />
                                            </Suspense>
                                        </TabsContent>
                                    </Fragment>
                                </>
                            ))}
                        </Tabs>
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
