import { SignIn } from "@clerk/nextjs";

export const runtime = 'edge';

export default function Page() {
    return (
        <>
            <div
                className="mx-auto flex max-w-3xl
                flex-col justify-center items-center px-10 py-20"
            >
                <SignIn />
            </div>
        </>
    );
}
