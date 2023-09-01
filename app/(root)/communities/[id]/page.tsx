import React, { Suspense } from 'react';
import Image from "next/image";

import { currentUser } from '@clerk/nextjs';
import { communityTabs } from '@/constants';

import {
    UserCard,
    ThreadCard,
    CommunityCard
} from '@/components/cards';

import {
    TabsContent,
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

const Page = ({ params }: { params: {id: string} }) => {
    return (
        <>
            <Suspense>
                Community page id
            </Suspense>
        </>
    );
};

export default Page;
