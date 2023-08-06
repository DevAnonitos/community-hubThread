"use client";

import React, { ChangeEvent, useState } from 'react';
import * as z from "zod";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';

// Define props
interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    },
    btnTitle: string,
}

const AccountProfile = ({ user, btnTitle }: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    
    return (
        <>

        </>
    );
};

export default AccountProfile;
