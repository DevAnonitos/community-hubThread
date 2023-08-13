"use client";

import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

// Define Props
interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({
    id,
    name,
    username,
    imgUrl,
    personType,
}: Props) => {

    const router = useRouter();

    const isCommunity = personType === "Community";

    return (
        <>
            <article className='user-card'>
                <div className='user-card_avatar'>
                    <div className='relative'>
                        <Image
                            src="/assets/user.svg"
                            alt='UserLogo'
                            width={18}
                            height={18}
                            className='rounded-full object-cover'
                        />
                    </div>

                    <div className='flex-1 text-ellipsis'>
                        <h4 className='text-base-semibold text-light-1'>
                            {name}
                            Name
                        </h4>
                        <p className='text-small-medium text-gray-1'>
                            @{username}
                            Username
                        </p>
                    </div>
                </div>

                <Button
                    className='user-card_btn'
                    onClick={() => {
                        if (isCommunity) {
                            router.push(`/communities/${id}`);
                        } else {
                            router.push(`/profile/${id}`);
                        }
                    }}
                >
                    Views
                </Button>
            </article>
        </>
    );
};

export default UserCard;
