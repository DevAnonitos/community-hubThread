import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    members: {
        image: string;
    }[];
};

const CommunityCard = ({
    id,
    name,
    username,
    imgUrl,
    bio,
    members,
}: Props) => {
    return (
        <>
            <article className='community-card'>
                <div className='flex flex-wrap items-center gap-3'>
                    <Link
                        href={`/communities/${id}`}
                        className='relative h-12 w-12'
                    >
                        <Image
                            src="/assets/user.svg"
                            alt='CommunityLogo'
                            fill
                            className='rounded-full object-cover'
                        />
                    </Link>

                    <div>
                        <Link href={`/communities/${id}`}>
                            <h4 className='text-base-semibold text-light-1'>
                                {name}
                            </h4>
                        </Link>
                        <p className='text-small-medium text-gray-1'>
                            @{username}
                        </p>
                    </div>
                </div>

                <p
                    className='mt-4 text-subtle-medium
                    text-gray-1'
                >
                    {bio}
                </p>
            </article>
        </>
    );
};

export default CommunityCard;
