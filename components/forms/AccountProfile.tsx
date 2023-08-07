'use client'

import React, { ChangeEvent, useState } from 'react';
import * as z from "zod";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';

import { UserValidation } from '@/lib/validations/user';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';

// Define props
interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    },
    btnTitle: string,
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    // Validation Form user
    const form  = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image ? user.image : "",
            name: user?.name ? user.name : "",
            username: user?.username ? user.username : "",
            bio: user?.bio ? user.bio : "",
        }
    });

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {

        console.log(values);
    };

    return (
        <>
            <Form {...form}>
                <form
                    className='flex flex-col justify-start gap-10'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='profile_photo'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex items-center gap-4'
                                >
                                    <FormLabel className='account-form_image-label'>
                                        {field.value ? (
                                            <>
                                                <Image
                                                    src={field.value}
                                                    alt='profile_icon'
                                                    width={96}
                                                    height={96}
                                                    priority
                                                    className='rounded-full object-contain'
                                                />
                                            </>
                                        ): (
                                            <>
                                                <Image
                                                    src='/assets/profile.svg'
                                                    alt='profile_icon'
                                                    width={24}
                                                    height={24}
                                                    className='object-contain'
                                                />
                                            </>
                                        )}
                                    </FormLabel>
                                </FormItem>
                            </>
                        )}
                    />

                </form>
            </Form>
        </>
    );
};

export default AccountProfile;
