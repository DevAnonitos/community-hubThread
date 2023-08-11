"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

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

    const socketInit = async () => {


        socket.on('connect', () => {
            console.log('connected app')
        })

        // @ts-ignore
        socket.on('update-input', (msg: any) => {
            setSearch(msg)
        })
    }

    useEffect(() => {
        socketInit();

    }, []);

    const onChangeHandler = (e: any) => {
        setSearch(e.target.value)
        socket.emit('input-change', e.target.value)
    }


    return (
        <>
            <div className='searchbar'>
                <Image
                    src="/assets/search-gray.svg"
                    alt='SearchIcon'
                    width={24}
                    height={24}
                    className='object-contain'
                />
                <Input
                    id='text'
                    value={search}
                    onChange={onChangeHandler}
                    placeholder={`${
                        routeType !== "/search" ? "Search communities..." : "Search creators..."
                    }`}
                    className='no-focus searchbar_input'
                />
            </div>
        </>
    );
};

export default SearchBar;
