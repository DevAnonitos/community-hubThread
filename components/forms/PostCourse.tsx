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

                    <FormField
                        control={form.control}
                        name='authorCourse'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex w-full flex-col gap-3'
                                >
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Course Author
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            placeholder='Course author'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <div 
                        className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'
                    >
                        <div className='w-full md:w-2/3'>
                            <FormField
                                control={form.control}
                                name='linkUrl'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel className='text-base-semibold text-light-2'>
                                            LinkUrl Course
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Add link course'
                                                className='account-form_input no-focus'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full md:w-auto'>
                            <FormField
                                control={form.control}
                                name='linkUrl'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel className='text-base-semibold text-light-2'>
                                            Type of Courses
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Add link course'
                                                className='account-form_input no-focus'
                                                {...field}
                                            />
                                        </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <>
                                <FormItem className='flex w-full flex-col gap-3'>
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Description Course
                                    </FormLabel>
                                    <FormControl
                                        className='no-focus bg-dark-3 text-light-1 border-[1px] border-gray-700'
                                    >
                                        <Textarea rows={10} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <Button
                        type='submit'
                        className='bg-primary-500 hover:bg-primary-500 rounded-lg'
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading...": "Share your course"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default PostCourse;;