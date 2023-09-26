import React from 'react';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { SearchBar, Pagination } from '@/components/shared';

import { fetchUsers, fetchUser } from '@/lib/actions/user.actions';
import UserCard from '@/components/cards/UserCard';

export const revalidate = 10;

const Page = async ({ searchParams }: {
    searchParams: {
        [key: string] : string | undefined,
    };
}) => {

    const user = await currentUser();
    if(!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) return redirect("/onboarding");

    const result = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? + parseInt(searchParams.page) : 1,
        pageSize: 25,
    });

    return (
        <>
            <>
                <section>
                    <div className='flex items-center'>
                        <Image
                            src="/assets/user.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10'>
                            SearchUser
                        </h1>
                    </div>

                    <div className='mt-5'>
                        <SearchBar
                            routeType='search'
                        />
                    </div>

                    <div className='mt-10 flex flex-col gap-9'>
                        {result.users.length === 0 ? (
                            <>
                                <p className='no-result'>
                                    No Result
                                </p>
                            </>
                        ): (
                            <>
                                {result.users.map((person) => (
                                    <>
                                        <UserCard
                                            classNames='my-[-4px]'
                                            key={person.id}
                                            id={person.id}
                                            name={person.name}
                                            username={person.username}
                                            imgUrl={person.image}
                                            personType='User'
                                        />
                                    </>
                                ))}
                            </>
                        )}
                    </div>

                    <Pagination
                        path='search'
                        pageNumber={searchParams?.page ? parseInt(searchParams.page) : 1}
                        isNext={result.isNext}
                    />
                </section>
            </>
        </>
    );
};

export default Page;
