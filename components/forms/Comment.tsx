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

interface Props {
    threadId: string;
    currentUserId: string;
    currentUserImg: string;
};

const Comment = ({
    threadId,
    currentUserId,
    currentUserImg
}: Props) => {

    const pathName = usePathname();

    return (
        <>
            
        </>
    );
};

export default Comment;
