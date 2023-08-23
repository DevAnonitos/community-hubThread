import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

import { fetchUser } from "@/lib/actions/user.actions";

import { Pagination } from "@/components/shared";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home({
  searchParams
}: {searchParams: {
    [key: string]: string | undefined
  }
}) {

  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarding) redirect("/onboarding");

  return (
    <>
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
        <ThreadCard

        />
      </section>

      <Pagination
        path="/"
        pageNumber={3}
      />
    </>
  );
};
