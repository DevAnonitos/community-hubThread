'use client';

import React from 'react';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';

import { deleteThread } from '@/lib/actions/thread.actions';

import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

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

    const { toast } = useToast();

    if(currentUserId !== authorId || pathName === "/") return null;

    return (
        <div className='bg-gray-700 p-2 rounded-full'>
            <Image
                src="/assets/delete.svg"
                alt='Delete'
                width={20}
                height={20}
                className='cursor-pointer object-contain'
                onClick={async () => {
                    await deleteThread(JSON.parse(threadId), pathName);
                    if(!parentId || !isComment){
                        router.push("/");
                        toast({
                            variant: "default",
                            title: "Delete Threads is successful",
                            description: "See your threads in homepage",
                            action: <ToastAction altText="Continue">Continue</ToastAction>,
                        });
                    }
                }}
            />
        </div>
    );
};

export default DeleteThread;
