import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import ThreadCard from '../cards/ThreadCard';

import { fetchUserPosts } from '@/lib/actions/user.actions';

interface Result {
    name: string;
    image: string;
    id: string;
    threads: {
        _id: string;
        text: string;
        parentId: string | null;
        author: {
            name: string;
            image: string;
            id: string;
        };
        community: {
            id: string;
            name: string;
            image: string
        } | null;
        createdAt: string;
        children: {
            author: {
                image: string;
            };
        }[];
    }[];
};

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
    classNames?: string;
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType,
    classNames,
}: Props) => {

    let result: Result;

    if(accountType === "Community") {
        result = await fetchUserPosts(accountId);
    }

    if(!result) {
        redirect("/");
    }

    return (
        <>
            <section className={`mt-9 flex flex-col gap-10 ${classNames}`}>
                {result.threads.map((thread) => (
                    <>
                        <Suspense>
                            <ThreadCard
                                key={thread._id}
                                id={thread._id}
                                currentUserId={currentUserId}
                                parentId={thread.parentId}
                                content={thread.text}
                                author={
                                    accountType === "User"
                                        ? { name: result.name, image: result.image, id: result.id }
                                        : {
                                            name: thread.author.name,
                                            image: thread.author.image,
                                            id: thread.author.id,
                                        }
                                }
                                community={
                                    accountType === "Community"
                                        ? { name: result.name, id: result.id, image: result.image }
                                        : thread.community
                                }
                                createdAt={thread.createdAt}
                                comments={thread.children}
                            />
                        </Suspense>
                    </>
                ))}
            </section>
        </>
    );
};

export default ThreadsTab;
