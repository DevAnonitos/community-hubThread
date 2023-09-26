import React, { Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";

import { SearchBar, Pagination } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchCourses } from '@/lib/actions/course.actions';

import { CourseCard } from '@/components/cards';
import { 
    Accordion, 
    AccordionItem, 
    AccordionContent, 
    AccordionTrigger  
} from '@/components/ui/accordion';

const Page = async (
    { searchParams = {} }: {
        searchParams?: {
            [key: string]: string | undefined,
        }
    }
) => {

    const user = await currentUser();
    if(!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarding) redirect("/onboarding");

    const result = await fetchCourses(
        searchParams?.page ? +searchParams.page : 1,
        30,
    );

    return (
        <>
            <section>
                <div className='flex flex-col items-center justify-between sm:flex-row'>
                    <div className='flex items-center'>
                        <Image
                            src="/assets/list.svg"
                            alt='UserProfile'
                            width={34}
                            height={34}
                            className='object-contain flex items-center mb-10 mr-4'
                        />

                        <h1 className='head-text mb-10 '>
                            CrashCourses
                        </h1>
                    </div>

                    <div className='mb-10 flex items-center'>
                        <Button 
                            className='bg-primary-500 hover:bg-primary-500 
                            rounded-xl'
                        >
                            <Link href={`/create-course`}>
                                Create Course
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className='mt-5'>
                    <SearchBar routeType='courses' />
                </div>

                <section className='mt-9 flex flex-col gap-10 text-white'>
                    {result.courses.length === 0 ? (
                        <>
                            <p className='text-white'>Not course found</p>
                        </>
                    ): (
                        <>
                            <Accordion type="single" collapsible>
                                {result.courses.map((course) => (
                                    <AccordionItem key={course._id} value={course._id.toString()}>
                                        <AccordionTrigger 
                                            className='border-b-[1px] border-gray-700'
                                        >
                                            {course.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <CourseCard
                                                classNames='border-none mt-5'
                                                id={course._id.toString()}
                                                courseName={course.name}
                                                author={course.author}
                                                courseNameAuthor={course.authorCourse}
                                                currentUserId={user.id}
                                                typeOfCourse={course.typeCourse}
                                                createdAt={course.createdAt}
                                                linkUrl={course.link}
                                                description={course.description}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </>
                    )}
                </section>
            </section>
        </>
    );
};

export default Page;
