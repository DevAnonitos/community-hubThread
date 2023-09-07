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

export const fetchCommunityDetails = async(id: string) => {
    try {
        connectToDB();

        const communityDetails = await Community.findOne({ id }).populate([
            "createdBy",
            {
                path: "members",
                model: User,
                select: "name username image _id id",
            },
        ]);

        return communityDetails;
    } catch (error: any) {
        console.error("Error fetching community details:", error);
        throw error;
    }
};

export const fetchCommunityPost = async(id: string) => {
    try {
        connectToDB();

        const communityPosts = await Community.findById(id).populate(
            {
                path: "threads",
                model: Thread,
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "name image id", // Select the "name" and "_id" fields from the "User" model
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "image _id", // Select the "name" and "_id" fields from the "User" model
                        },
                    },
                ],
            },
        );

        return communityPosts;
    } catch (error: any) {
        console.log("Error fetch community post: ", error);
        throw Error;
    }
};

export const deleteCommunity = async(communityId: string) => {
    try {
        connectToDB();

        const deleteCommunity = await Community.findOneAndDelete({
            id: communityId,
        });

        if(!deleteCommunity){
            throw new Error("Community not found");
        }

        await Thread.deleteMany({
            community: communityId,
        });

        const communityUsers = await User.find({
            communities: communityId,
        });

        const updateUserPromises = communityUsers.map((user) => {
            user.communities.pull(communityId);
            return user.save();
        });

        await Promise.all(updateUserPromises);

        return deleteCommunity;
    } catch (error: any) {
        console.error("Error deleting community: ", error);
        throw error;
    }
};