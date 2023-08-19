import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: string;
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type
}: Props) => {
    return (
        <>
            <div className='flex w-full flex-col justify-start'>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center gap-3'>
                        <div className='relative h-20 w-20 object-cover'>
                            <Image
                                src={imgUrl}
                                alt='Logo'
                                fill
                                className='rounded-full object-cover shadow-2xl'
                            />
                        </div>

                        <div className='flex-1'>
                            <h2 className='text-left text-heading3-bold text-light-1'>
                                {name}
                            </h2>
                            <p className='test-base-medium text-gray-1'>
                                @{username}
                            </p>
                        </div>
                    </div>
                    {accountId === authUserId && type !== "Community" && (
                        <>
                            <Link href="/profile/edit">
                                <div
                                    className='flex cursor-pointer gap-3
                                    rounded-full bg-dark-3 px-4 py-2
                                    border-[1px] border-gray-700 mx-3'
                                >
                                    <Image
                                        src="/assets/edit.svg"
                                        alt='Edit'
                                        width={16}
                                        height={16}
                                    />
                                    <p className='text-light-2 max-sm:hidden'>
                                        Edit
                                    </p>
                                </div>
                            </Link>
                        </>
                    )}
                </div>

                <p
                    className='mt-6 w-full text-base-regular
                    text-light-2 border-2 border-gray-700
                    rounded-xl px-4 py-3'
                >
                    {bio}
                </p>

                <div className='mt-12 h-0.5 w-full bg-dark-3' />
            </div>
        </>
    );
};

export default ProfileHeader;
