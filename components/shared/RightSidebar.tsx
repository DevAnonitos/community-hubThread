
import React from 'react';
import { currentUser } from "@clerk/nextjs";
import UserCard from '../cards/UserCard';

const RightSidebar = async () => {
    return (
        <>
            <section
                className='custom-scrollbar rightsidebar
                border-l-[1px] border-gray-700'
            >
                <div className='flex flex-1 flex-col justify-start'>
                    <h3 className='text-heading4-medium text-light-1'>
                        Suggested Communities
                    </h3>

                    <div className='mt-7 flex-w-[350px] flex-col gap-9'>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />

                    </div>
                </div>

                <div className='flex flex-1 flex-col justify-start'>
                    <h3 className='text-heading4-medium text-light-1'>
                        Similar Minds
                    </h3>

                    <div className='mt-7 flex-w-[350px] flex-col gap-10'>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </div>
                </div>
            </section>
        </>
    );
};

export default RightSidebar;
