'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <h2 className="text-white text-xl">
                    Something went wrong!😞
                </h2>
                <button className="bg-primary-500" onClick={() => reset()}>
                    Try again
                </button>
            </body>
        </html>
    )
}