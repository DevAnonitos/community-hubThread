'use client';

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';

import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';
import { CourseValidation } from '@/lib/validations/course';

interface Props {
    userId: string;
    classNames?: string;
};

const PostCourse = ({ userId, classNames }: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form  = useForm<z.infer<typeof CourseValidation>>({
        resolver: zodResolver(CourseValidation),
        defaultValues: {
            courseThumb_photo: "",
            courseName: "",
            authorCourse: "",
            linkUrl: "",
            description: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof CourseValidation>) => {
        try {
            
        } catch (error: any) {
            
        }finally {

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
                        name='courseName'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex w-full flex-col gap-3'
                                >
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Course Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            placeholder='Course name'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </form>
            </Form>
        </>
    );
};

export default PostCourse;;