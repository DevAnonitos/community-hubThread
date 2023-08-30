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

import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

import { createThread } from '@/lib/actions/thread.actions';


interface Props {
    userId: string;
    classNames?: string;
}

const PostThread = ({ userId, classNames }: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    const { organization } = useOrganization();

    const { toast } = useToast();

    const form  = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        try {

            await createThread({
                text: values.thread,
                author: userId,
                communityId: organization ? organization.id : null,
                path: pathName,
            });

            router.push("/");
            toast({
                variant: "default",
                title: "Yeah! Create Threads is successful",
                description: "See your threads in homepage",
                action: <ToastAction altText="Continue">Continue</ToastAction>,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
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
