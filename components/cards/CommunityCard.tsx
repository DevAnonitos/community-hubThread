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
    classNames?: string;
};

const CommunityCard = ({
    id,
    name,
    username,
    imgUrl,
    bio,
    members,
    classNames,
}: Props) => {
    return (
        <>
            <article className={`community-card ${classNames}`}>
                <div className='flex flex-wrap items-center gap-3'>
                    <Link
                        href={`/communities/${id}`}
                        className='relative h-12 w-12'
                    >
                        <Image
                            src={imgUrl}
                            alt='CommunityLogo'
                            fill
                            loading='lazy'
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

                <div className='mt-5 flex-wrap items-center justify-between gap-3'>
                    <Link 
                        href={`/communities/${id}`} 
                        className='bg-primary-500 px-4 py-2 text-white rounded-lg'
                    >
                        Views
                    </Link>

                    {members.length > 0 && (
                        <>
                            <div className='flex item-center'>
                                {members.map((member, index) => (
                                    <>
                                        <Fragment key={index}>
                                            <Image
                                                src={member.image}
                                                alt={`UserAt${index}`}
                                                width={20}
                                                height={20}
                                                loading='lazy'
                                                className={`
                                                    ${
                                                        index !== 0 && "-ml-2"
                                                    } rounded-full object-cover`
                                                }
                                            />
                                            {members.length > 3 && (
                                                <>
                                                    <p
                                                        className='ml-1
                                                        text-subtle-medium text-gray-1'
                                                    >
                                                        {members.length}+ Users
                                                    </p>
                                                </>
                                            )}
                                        </Fragment>
                                    </>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </article>
        </>
    );
};

export default CommunityCard;
