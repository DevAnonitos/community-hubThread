"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

// Define Props
interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

// FetchUser from MongoDb
export const fetchUser = async (userId: string) => {
    try {
        connectToDB();
    } catch (error: any) {
        throw new Error(`Fail to fetch user: ${error.message}`)
    }
}
