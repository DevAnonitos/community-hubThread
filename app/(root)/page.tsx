import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

import { Pagination } from "@/components/shared";

export default async function Home() {
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

      <section className="mt-9 flex flex-col gap-10 text-white">

      </section>

      <Pagination
        path="/"
        pageNumber={3}
      />
    </>
  );
};