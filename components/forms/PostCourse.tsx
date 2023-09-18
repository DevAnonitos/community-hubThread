'use client';

import React, { useState } from 'react';
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

    return (
        <>
            PostCourse
        </>
    );
};

export default PostCourse;;