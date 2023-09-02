import React, { Suspense, Fragment } from 'react';
import Image from "next/image";

import { currentUser } from '@clerk/nextjs';
import { communityTabs } from '@/constants';

import { UserCard } from '@/components/cards';
import { ThreadsTab, ProfileHeader } from '@/components/shared';

import {
    TabsContent,
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

const Page = async({ params }: { params: {id: string} }) => {

    const user = await currentUser();
    if(!user) return null;

    return (
        <>
            <Suspense>
                <section>

                    <div className='mt-9'>
                        <Tabs defaultValue='threads' className='w-full'>
                            <TabsList className='tab'>
                                {communityTabs.map((tab) => (
                                    <>
                                        <Suspense>
                                            <Fragment key={tab.label}>
                                                <TabsTrigger value={tab.value} className='tab'>
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
                                        </Suspense>
                                    </>
                                ))}
                            </TabsList>

                            <TabsContent
                                value='threads'
                                className='w-full text-light-1'
                            >
                                {/* @ts-ignore */}

                            </TabsContent>

                            <TabsContent
                                value='members'
                                className='mt-9 w-full text-light-1'
                            >
                                <section className='mt-9 flex flex-col gap-10'>
                                    {}
                                </section>
                            </TabsContent>

                            <TabsContent value='requests' className='w-full text-light-1'>
                                {/* @ts-ignore */}
                                <ThreadsTab
                                    currentUserId={user.id}
                                    accountId=''
                                    accountType='Community'
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
