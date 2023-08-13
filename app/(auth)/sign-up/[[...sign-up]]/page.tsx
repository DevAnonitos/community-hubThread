import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <div
                className="mx-auto flex max-w-3xl
                flex-col justify-center items-center
                px-10 py-20"
            >
                <SignUp />
            </div>
        </>
    );
}
