import React, { Suspense, Fragment } from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import Comment from '@/components/forms/Comment';
import ThreadCard from '@/components/cards/ThreadCard';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchThreadById } from '@/lib/actions/thread.actions';

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) return redirect("/onboarding");

    const thread = await fetchThreadById(params.id);

    return (
        <>
            <Suspense>
                <section className='relative'>
                    <div>
                        <ThreadCard
                            id={thread.id}
                            currentUserId={user.id}
                            parentId={thread.parentId}
                            content={thread.text}
                            author={thread.author}
                            community={thread.community}
                            createdAt={thread.createdAt}
                            comments={thread.children}
                        />  
                    </div>

                    <div className='mt-7'>
                        <Comment 
                            threadId={params.id}
                            currentUserImg={user.imageUrl}
                            currentUserId={JSON.stringify(userInfo._id)}
                        />
                    </div>

                    <div className='mt-10'>
                        {thread.children.map((childItem: any) => (
                            <Fragment key={childItem._id}>
                                    <Suspense>
                                        <ThreadCard
                                            id={childItem._id}
                                            currentUserId={user.id}
                                            parentId={childItem.parentId}
                                            content={childItem.text}
                                            author={childItem.author}
                                            community={childItem.community}
                                            createdAt={childItem.createdAt}
                                            comments={childItem.children}
                                            isComment
                                        />
                                    </Suspense>
                            </Fragment>
                        ))}
                    </div>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
