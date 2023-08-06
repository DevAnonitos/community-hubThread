import React from 'react';
import Image from 'next/image';

const Loading = () => {
    return (
        <div className='flex items-center justify-center'>
            <Image
                src='assets/loader.svg'
                width={50}
                height={50}
                alt='loader'
                className='object-contain'
            />
        </div>
    );
};

export default Loading
