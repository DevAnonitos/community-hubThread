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
};

// FetchUser from MongoDb
export const fetchUser = async (userId: string) => {
    try {
        connectToDB();
    } catch (error: any) {
        throw new Error(`Fail to fetch user: ${error.message}`)
    }
};

export const updateUser = async ({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> => {
    try {
        connectToDB();

        
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
};
