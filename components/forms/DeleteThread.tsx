'use client';

import React from 'react';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';

interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
};

const DeleteThread = ({
    threadId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}: Props) => {

    const pathName = usePathname();
    const router = useRouter();

    if(currentUserId !== authorId || pathName === "/") return null;

    return (
        <div className='bg-gray-700 p-2 rounded-full'>
            <Image
                src="/assets/delete.svg"
                alt='Delete'
                width={20}
                height={20}
                className='cursor-pointer object-contain'
            />
        </div>
    );
};

export default DeleteThread;
