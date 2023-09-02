
import React from 'react';
import Image from "next/image";
import Link from "next/link";


import DeleteThread from '../forms/DeleteThread';

import { formatDateString } from "../../lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';


interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
    classNames?: string;
};

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    classNames,
}: Props) => {


    const formatDates= (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = formatDistanceToNow(date, {
            addSuffix: true,
            includeSeconds: true,
            locale: enUS,
        });
        return formattedDate;
    };

    return (
        <>
            <article
                className={`flex w-full flex-col rounded-xl
                    border-[1px] border-gray-700
                    ${classNames}
                    ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7" }
                `}
            >
                <div className='flex items-start justify-between'>
                    <div className='flex w-full flex-1 flex-row gap-4'>
                        <div className='flex flex-col items-center'>
                            <Link
                                href={`/profile/${author?.id}`}
                                className='relative h-11 w-11'
                            >
                                <Image
                                    src={author?.image}
                                    alt='User-community-image'
                                    fill
                                    className='cursor-pointer rounded-full'
                                />
                            </Link>

                            <div className='thread-card_bar' />
                        </div>

                        <div className='flex w-full flex-col'>
                            <Link
                                href={`/profile/${author?.id}`}
                                className='w-fit'
                            >
                                <h4
                                    className='cursor-pointer
                                    text-base-semibold text-light-1 hover:underline'
                                >
                                    {author?.name}
                                </h4>
                            </Link>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-start">
                                        <h5 className='mt-2 text-gray-500 text-small-regular hover:underline'>
                                            | {formatDates(createdAt)}
                                        </h5>
                                    </TooltipTrigger>
                                    <TooltipContent className="flex items-start justify-start">
                                        <p className='flex items-start justify-start'>
                                            {formatDateString(createdAt)}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <p className='mt-3 text-small-semibold text-light-2'>
                                {content}
                            </p>

                            <div
                                className={`${isComment && "mb-10"}
                                mt-5 flex flex-col gap-3`}
                            >
                                <div className='flex gap-3.5'>
                                    <Image
                                        src="/assets/heart-gray.svg"
                                        alt='heart'
                                        width={26}
                                        height={26}
                                        className='cursor-pointer object-contain hover:scale-125 ease-in-out duration-200'
                                    />
                                    <Link href={`/thread/${id}`}>
                                        <Image
                                            src="/assets/reply.svg"
                                            alt='reply'
                                            width={26}
                                            height={26}
                                            className='cursor-pointer object-contain hover:scale-125 ease-in-out duration-200'
                                        />
                                    </Link>
                                    <Image
                                        src="/assets/repost.svg"
                                        alt='repost'
                                        width={26}
                                        height={26}
                                        className='cursor-pointer object-contain hover:scale-125 ease-in-out duration-200'
                                    />
                                    <Image
                                        src="/assets/share.svg"
                                        alt='share'
                                        width={26}
                                        height={26}
                                        className='cursor-pointer object-contain hover:scale-125 ease-in-out duration-200'
                                    />
                                </div>

                                {isComment && comments.length > 0 && (
                                    <>
                                        <Link href={`/thread/${id}`}>
                                            <p
                                                className='mt-1
                                                text-subtle-medium text-gray-1'
                                            >
                                                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                            </p>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --Delete Thread Btn----- */}
                    <DeleteThread
                        threadId={JSON.stringify(id)}
                        currentUserId={currentUserId}
                        authorId={author?.id}
                        parentId={parentId}
                        isComment={isComment}
                    />
                </div>

                {!isComment && comments?.length > 0 && (
                    <>
                        <div className='ml-1 mt-3 flex items-center gap-2'>
                            {comments.slice(0, 2).map((comment, index) => (
                                <>
                                    <Image
                                        key={index}
                                        src={comment.author?.image}
                                        alt={`user_${index}`}
                                        width={24}
                                        height={24}
                                        className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                                    />
                                </>
                            ))}

                            <Link href={`/thread/${id}`}>
                                <p className='mt-1 text-subtle-medium text-gray-1'>
                                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                </p>
                            </Link>
                        </div>
                    </>
                )}

                {!isComment && community && (
                    <>
                        <Link
                            href={`/community/${community.id}`}
                            className='mt-5 flex items-center'
                        >
                            <p className='text-subtle-medium text-gray-1'>
                                {formatDateString(createdAt)}
                                {community && ` - ${community.name} Community`}
                            </p>

                            <Image
                                src={community.image}
                                alt={community.name}
                                width={14}
                                height={14}
                                className='ml-1 rounded-full object-cover'
                            />
                        </Link>
                    </>
                )}
            </article>
        </>
    );
};

export default ThreadCard;
