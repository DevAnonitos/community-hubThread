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
                                src="/assets/user.svg"
                                alt='Logo'
                                fill
                                className='rounded-full object-cover shadow-2xl'
                            />
                        </div>

                        <div className='flex-1'>
                            <h2 className='text-left text-heading3-bold text-light-1'>
                                {name}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
