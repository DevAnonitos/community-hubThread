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

export const fetchUsers = async ({
    userId,
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc',
    searchString="",
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) => {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: {
                $ne: userId,
            },
        };

        if(searchString.trim() !== ""){
            query.$or = [
                {
                    username: { $regex: regex },
                },
                {
                    name: { $regex: regex },
                },
            ]
        }

        const sortOptions = { createdAt: sortBy, };

        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUserCount = await User.countDocuments(query);

        const users = await userQuery.exec();

        const isNext = totalUserCount > skipAmount + users.length;

        return { isNext, users };

    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
