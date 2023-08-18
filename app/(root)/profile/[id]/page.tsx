
import React, { Fragment } from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Components Tabs
import { profileTabs } from '@/constants';
import { ThreadsTab, ProfileHeader } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Page = () => {
    return (
        <>
            <section>
                <h1 className='text-white'>
                    <ProfileHeader />
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
                    </Tabs>
                </div>
            </section>
        </>
    );
};

export default Page;
