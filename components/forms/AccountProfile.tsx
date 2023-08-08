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
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

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
                                    <FormControl
                                        className='flex-1 text-base-semibold text-gray-200'
                                    >
                                        <Input
                                            type='file'
                                            accept='image/'
                                            placeholder='Add Profile photo'
                                            className='account-form_image-input'
                                            onChange={(e) => {}}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex w-full flex-col gap-3'
                                >
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            placeholder='Enter your name'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex w-full flex-col gap-3'
                                >
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        UserName
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            placeholder='Enter your username'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='bio'
                        render={({ field }) => (
                            <>
                                <FormItem
                                    className='flex w-full flex-col gap-3'
                                >
                                    <FormLabel className='text-base-semibold text-light-2'>
                                        Bio
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={10}
                                            placeholder='Enter your bio'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <Button
                        type='submit'
                        className='bg-primary-500'
                    >
                        {btnTitle}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default AccountProfile;
