import React from 'react';
import { redirect } from 'next/navigation';

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType,
}: Props) => {
    return (
        <>
            <section className='mt-9 flex flex-col gap-10'>
                ThreadTabs
            </section>
        </>
    );
};

export default ThreadsTab;
