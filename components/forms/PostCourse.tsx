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
            course: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof CourseValidation>) => {

    };

    return (
        <>
            <Form {...form}>
                <form
                    className={`mt-10 flex flex-col justify-start gap-10 ${classNames}`}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    
                </form>
            </Form>
        </>
    );
};

export default PostCourse;;