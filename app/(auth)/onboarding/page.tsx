import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {

    const user = await currentUser();

    if(!user) {
        return null;
    }

    console.log(user);

    const userInfo = await fetchUser(user.id);

    if(userInfo?.onboarding) redirect("/");

    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    }

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
                        user={userData}
                        btnTitle="Continue"
                    />
                </section>
            </main>
        </>
    );
};

export default Page;
