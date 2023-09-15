"use client";

import React from 'react'
import { useOthers } from "@/liveblocks.config";

interface Props {
    classNames?: string;
}

const CollaborativeApp = ({ classNames }: Props) => {
    const others = useOthers();
    const userCount = others.length;

    return (
        <>
            <div className={`${classNames}`}>
                {userCount} user(s) online  
            </div>
        </>
    );
};

export default CollaborativeApp