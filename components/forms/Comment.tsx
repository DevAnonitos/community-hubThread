"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions';

interface Props {
    threadId: string;
    currentUserId: string;
    currentUserImg: string;
    classNames?: string;
};

const Comment = ({
    threadId,
    currentUserId,
    currentUserImg,
    classNames,
}: Props) => {

    const pathName = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit =  async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathName,
        );

        form.reset();
    };

    return (
        <>
            <Form {...form}>
                <form
                    className={`comment-form ${classNames}`}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='thread'
                        render={({ field }) => (
                            <>
                                <FormItem className='flex w-full items-center gap-3'>
                                    <FormLabel>
                                        <Image
                                            src={currentUserImg}
                                            alt='current_user'
                                            width={48}
                                            height={48}
                                            loading='lazy'
                                            className='rounded-full object-cover'
                                        />
                                    </FormLabel>
                                    <FormControl className='border-none bg-transparent'>
                                        <Input
                                            type='text'
                                            {...field}
                                            placeholder='Comments...'
                                            className='no-focus text-light-1 outline-none'
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <Button type='submit' className='comment-form_btn'>
                        Reply
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default Comment;
