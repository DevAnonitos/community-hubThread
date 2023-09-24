"use client";

import React, { useEffect, useState } from 'react';
import { getNews } from '@/lib/services/getNews';

const Page = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getNews();
                if (result && result.data && Array.isArray(result.data.coins)) {
                    setCoins(result.data.coins);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='text-white'>
            page news
            <div className='text-white'>
                
            </div>
        </div>
    );
};

export default Page;