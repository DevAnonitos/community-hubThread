import React from 'react';
import Image from "next/image";
import Link from "next/link";

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
}: Props) => {
    return (
        <>
            <article
                className={`flex w-full flex-col rounded-xl
                ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7" }`}
            >
                <div className='flex items-start justify-between'>
                    
                </div>
            </article>
        </>
    );
};

export default ThreadCard;
