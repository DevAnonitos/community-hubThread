'use client';

import React from 'react';
import * as z from "zod";
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
}

const PostThread = ({ userId }: Props) => {
    return (
        <>

        </>
    );
};

export default PostThread;
