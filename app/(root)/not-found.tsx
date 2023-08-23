import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div className='flex items-start justify-center'>
                <h2 className='text-red-600 text-xl'>Not Found</h2>
                <p className='text-white'>
                    Could not find requested resource
                </p>
                <Link href="/">
                    Return Home
                </Link>
            </div>
        </>
    );
};
