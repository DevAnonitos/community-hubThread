"use server";
// Use Server file
import { FilterQuery, SortOrder } from "mongoose";
import { Community, Thread, User } from "../models";
import { connectToDB } from "../mongoose";

// Handle File Func
export const createCommunity = async(
    id: string,
    name: string,
    username: string,
    image: string,
    bio: string,
    createdById: string,
) => {
    try {
        connectToDB();

        const user = await User.findOne({
            id: createdById,
        });

        if(!user) {
            throw new Error("User not found");
        }

        const newCommunity = new Community({
            id,
            name,
            username,
            image,
            bio,
            createdBy: user._id,
        });

        const createdCommunity = await newCommunity.save();

        user.communities.push(createdCommunity._id);
        await user.save();

        return createCommunity;
    } catch (error: any) {
        console.error("Error creating community: ", error);
        throw error;
    }
};

