'use client';

import React from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';

import { ThreadValidation } from '@/lib/validations/thread';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';


interface Props {
    userId: string;
    classNames?: string;
}

const PostThread = ({ userId, classNames }: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    const { organization } = useOrganization();

    const form  = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {


        router.push("/");
    };

    return (
        <>
            <Form {...form}>
                <form
                    className={`mt-10 flex flex-col justify-start gap-10 ${classNames}`}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='thread'
                        render={({ field }) => (
                            <>
                                <FormItem className='flex w-full flex-col gap-3'>
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Content
                                    </FormLabel>
                                    <FormControl
                                        className='no-focus bg-dark-3 text-light-1 border-[1px] border-gray-700'
                                    >
                                        <Textarea rows={15} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <Button
                        type='submit'
                        className='bg-primary-500 hover:bg-primary-500 rounded-lg'
                    >
                        Post Thread
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default PostThread;
