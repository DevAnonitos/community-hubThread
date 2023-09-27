import React from "react";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPosts } from "@/lib/actions/thread.actions";

import { Pagination } from "@/components/shared";
import ThreadCard from "@/components/cards/ThreadCard";

export const revalidate = 0;

export default async function Home({
  searchParams
}: {searchParams: {
    [key: string]: string | undefined,
  }
}) {

  const user = await currentUser();

  if(!user){
    return null;
  } 

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarding) redirect("/onboarding");
  
  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30,
  );
  
  return (
    <div>
      <div className="flex items-center">
        <Image
          src="/assets/home.svg"
          alt='UserProfile'
          width={34}
          height={34}
          className='object-contain flex items-center mb-10 mr-4'
        />
        <h1 className="head-text text-left mb-10">
          Home
        </h1>
      </div>

      <section className="mt-5 flex flex-col gap-10 text-white">
        <>
          {result.posts.length === 0 ? (
            <>
              <p className='no-result'>No threads found</p>
            </>
          ): (
            <>
              {result.posts.map((post) => (
                <>
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user.id}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                  />
                </>
              ))}
            </>
          )}
        </>
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  );
};
