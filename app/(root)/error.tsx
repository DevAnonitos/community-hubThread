'use client';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div
            className="mx-auto my-4 flex max-w-xl flex-col
            rounded-lg border border-gray-700 bg-dark-3
            dark:border-neutral-800 dark:bg-black md:p-12"
        >
            <h2 className="text-xl font-bold text-red-700">
                    Oh no!
            </h2>
            <p className="my-2 text-white">
                    There was an issue with our storefront. This could be a temporary issue, please try your action again.
            </p>
            <button
                className="mx-auto mt-4 flex w-full items-center
                justify-center rounded-full bg-blue-600 p-4
                tracking-wide text-white hover:opacity-90"
                onClick={() => reset()}
            >
                Please Try Again😊
            </button>
        </div>
    );
};
