import React from 'react';
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "../../lib/utils";

interface Props {
    id: string;
    currentUserId: string;
    courseName: string;
    courseNameAuthor: string;
    linkUrl: string;
    typeOfCourse: string;
    description: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    createdAt: string;
    classNames?: string;
}

const CourseCard = ({ 
    id,
    currentUserId,
    courseName,
    courseNameAuthor,
    linkUrl,
    typeOfCourse,
    description,
    author,
    createdAt,
    classNames,
}: Props) => {
    return (
        <>
            <article 
                className={`flex w-full flex-col 
                    rounded-xl border-[1px] 
                    border-gray-700 mt-7 xs:px-7 p-4 ${classNames}`
                }
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
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default CourseCard;