"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';

interface Props {
    routeType: string,
};

const SearchBar = ({ routeType }: Props) => {

    const router = useRouter();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(search) {
                router.push(`/${routeType}?q=` + search);
            } else {
                router.push(`/${routeType}`)
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, routeType]);

    return (
        <>
            
        </>
    );
};

export default SearchBar;
