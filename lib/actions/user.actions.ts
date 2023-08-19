"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";

// Import Models Schema
import { User, Thread, Community} from "../models";

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

        return await User.findOne({ id: userId }).populate({
            path: "communities",
            model: Community,
        });
    } catch (error: any) {
        throw new Error(`Fail to fetch user: ${error.message}`)
    }
};

// UpdateUser
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

        await User.findOneAndUpdate(
            {
                id: userId,
            },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarding: true,
            },
            {
                upsert: true,
            },
        );

        if(path === "/profile/edit") {
            revalidatePath(path);
        }

    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
};
