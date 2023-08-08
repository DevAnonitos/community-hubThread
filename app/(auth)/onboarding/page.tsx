import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
    return (
        <>
            <main
                className="mx-auto flex max-w-3xl
                flex-col justify-start px-10 py-20"
            >
                <h1 className="head-text">
                    OnboardingApp
                </h1>
                <p className='mt-3 text-base-regular text-light-2'>
                    Complete your profile now, to use HubThread.
                </p>

                <section className="mt-9 bg-dark-2 p-10 rounded-xl border-2 border-gray-700">
                    <AccountProfile
                        user={""}
                        btnTitle="Continue"
                    />
                </section>
            </main>
        </>
    );
};

export default Page;
