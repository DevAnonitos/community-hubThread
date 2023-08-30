import React, { Suspense } from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import Link from 'next/link';

const Page = async () => {

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarding) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
        <>
            <Suspense>
                <section>
                    <div className='flex items-center'>
                        <Image
                            src="/assets/heart.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10'>
                            Activities
                        </h1>
                    </div>

                    <section className='mt-5 flex flex-col gap-5'>
                        {activity.length > 0 ? (
                            <>
                                {activity.map((active) => (
                                    <>
                                        <Link
                                            key={active._id}
                                            href={`/thread/${active.parentId}`}
                                        >
                                            <article className='activity-card'>
                                                <Image
                                                    src={active.author.image}
                                                    alt='user_logo'
                                                    width={20}
                                                    height={20}
                                                    className='rounded-full object-cover'
                                                />
                                                <p
                                                    className='!text-small-regular text-light-1'
                                                >
                                                    <span className='mr-1 text-primary-500'>
                                                        {active.author.name}
                                                    </span>{" "}
                                                    replied to your thread
                                                </p>
                                            </article>
                                        </Link>
                                    </>
                                ))}
                            </>
                        ): (
                            <>
                                <p className='!text-base-regular text-light-3'>
                                    No activity yet
                                </p>
                            </>
                        )}
                    </section>
                </section>
            </Suspense>
        </>
    );
};

export default Page;
