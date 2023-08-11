import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Pagination } from "@/components/shared";

export default async function Home() {
  return (
    <>
      <h1 className="head-text text-left">
        Home
      </h1>

      <section className="mt-9 flex flex-col gap-10 text-white">

      </section>

      <Pagination
        path="/"
        pageNumber={3}
      />
    </>
  );
};
