'use client';

import React from 'react';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';

import { deleteThread } from '@/lib/actions/thread.actions';

import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';

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

    const handleDeleteThread = async () => {
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
    };

    return (
        <div className='flex items-center justify-center bg-gray-700 p-2 rounded-full'>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Image
                        src="/assets/delete.svg"
                        alt='Delete'
                        width={20}
                        height={20}
                        loading='lazy'
                        className='cursor-pointer object-contain'
                    />
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-dark-2 border-[1px] border-gray-700'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-red-600 text-lg'>Are you sure delete Thread?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='text-red-600'>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteThread} className='bg-primary-500 hover:bg-primary-500'>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteThread;
