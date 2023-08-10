"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface Props {
    pageNumber: number;
    isNext: boolean;
    path: string;
}

const Pagination = ({
    pageNumber,
    isNext,
    path
}: Props) => {

    const router = useRouter();

    const handlePagination = (type: string) => {

    };

    if(!isNext && pageNumber ===1) return null;

    return (
        <>
            <div className='pagination'>
                <Button
                    onClick={() => handlePagination("prev")}
                    disabled={pageNumber === 1}
                    className='!text-small-regular text-light-2 bg-slate-500 hover:bg-slate-500'
                >
                    PrevPage
                </Button>
                <p
                    className='text-small-semibold
                    text-light-1 p-2 rounded-lg px-4
                    bg-primary-500'
                >
                    {pageNumber}
                </p>
                <Button
                    onClick={() => handlePagination("next")}
                    disabled={!isNext}
                    className='!text-small-regular text-light-2 bg-slate-500 hover:bg-slate-500'
                >
                    NextPage
                </Button>
            </div>
        </>
    );
};

export default Pagination;
