'use client';

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';

import { 
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";

import { 
    Popover, 
    PopoverContent,
    PopoverTrigger 
} from '../ui/popover';

import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

import { CourseValidation } from '@/lib/validations/course';
import { typeOfCourses } from '@/constants';

import { createCourse } from '@/lib/actions/course.actions';

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
            // courseThumb_photo: "",
            courseName: "",
            authorCourse: "",
            link: "",
            description: "",
            subjects: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof CourseValidation>) => {
        try {
            setIsLoading(true);

            await createCourse({
                name: values.courseName,
                author: userId,
                authorCourse: values.authorCourse,
                link: values.link,
                description: values.description,
                typeCourse: values.subjects,
                path: pathName,
            });

            router.push("/courses");
            
            toast({
                variant: "default",
                title: "Yeah! Create Threads is successful",
                description: "See your threads in homepage",
                action: <ToastAction altText="Continue">Continue</ToastAction>,
            });
        } catch (error: any) {
            console.error("Error to create", error);
            toast({
                variant: "default",
                title: "Yeah! Create Threads is successful",
                description: "See your threads in homepage",
                action: <ToastAction altText="Continue">Continue</ToastAction>,
            });
        }finally {
            setIsLoading(false);
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
                                name='link'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel className='text-base-semibold text-light-2'>
                                            LinkUrl Course
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='url'
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
                            <div className="md:flex md:gap-4">
                                <FormField
                                    control={form.control}
                                    name='subjects'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col gap-3'>
                                            <FormLabel className='text-base-semibold text-light-2'>
                                                Type of Courses
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role='combobox'
                                                            className={`
                                                                w-full md:w-[200px] justify-between account-form_input 
                                                                ${!field.value && "text-muted-foreground"}
                                                            `}
                                                        >
                                                            {field.value
                                                                ? typeOfCourses.find(
                                                                    (course) => course.value === field.value
                                                                )?.label
                                                                : "Select your subjects"
                                                            }
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full md:w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search subject..."
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No subject found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                        {typeOfCourses.map((course) => (
                                                            <>
                                                                <CommandItem
                                                                    value={course.value}
                                                                    key={course.value}
                                                                    onSelect={() => {
                                                                    form.setValue("subjects", course.value);
                                                                    }}
                                                                >
                                                                    {course.label}
                                                                    <CheckIcon
                                                                        className={`
                                                                            ml-auto h-4 w-4
                                                                            ${
                                                                            course.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                            }
                                                                        `}
                                                                    />
                                                                </CommandItem>
                                                            </>
                                                        ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                            </div>
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