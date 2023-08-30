'use client'

import React, { ChangeEvent, useState } from 'react';
import * as z from "zod";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';

import { UserValidation } from '@/lib/validations/user';
import { updateUser } from '@/lib/actions/user.actions';

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

import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';

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



    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");

    // Validation Form user
    const form  = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image ? user.image : "",
            name: user?.name ? user.name : "",
            username: user?.username ? user.username : "",
            bio: user?.bio ? user.bio : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {

        const blob = values.profile_photo;

        const hasImageChanged = isBase64Image(blob);
        if(hasImageChanged) {
            const imgRes = await startUpload(files);

            if(imgRes && imgRes[0].fileUrl) {
                values.profile_photo = imgRes[0].fileUrl;
            }
        }

        await updateUser({
            name: values.name,
            path: pathName,
            username: values.username,
            userId: user.id,
            bio: values.bio,
            image: values.profile_photo,
        });

        if(pathName === `/profile/edit`) {
            router.back();
        }else {
            router.push("/");
        }
        console.log(values);
    };

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

        if (!file.type.includes("image")) return;

        fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
        };

            fileReader.readAsDataURL(file);
        }
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
                            <FormItem className='flex items-center gap-4'>
                                <FormLabel className='account-form_image-label'>
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='rounded-full object-contain'
                                        />
                                    ) : (
                                        <Image
                                            src='/assets/profile.svg'
                                            alt='profile_icon'
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                        />
                                    )}
                                </FormLabel>
                                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        placeholder='Add profile photo'
                                        className='account-form_image-input'
                                        onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </FormControl>
                            </FormItem>
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
                                            placeholder='your name'
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
                                            placeholder='your username'
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
                                            placeholder='your bio'
                                            className='account-form_input no-focus'
                                            {...field}
                                        />
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
                        {btnTitle}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default AccountProfile;
