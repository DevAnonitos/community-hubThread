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

export const fetchCommunityPosts = async(id: string) => {
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
                        select: "name image id", 
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "image _id",
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

export const fetchCommunities = async({
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
}: {
    searchString?: string | undefined;
    pageNumber?: number | undefined;
    pageSize?: number | undefined;
    sortBy?: SortOrder;
}) => {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;
        
        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof Community> = {};

        if(searchString.trim() !== ""){
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        }

        const sortOptions = { createdAt: sortBy, };

        const communitiesQuery = Community.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
            .populate("members");
        
        const totalCommunitiesCount = await Community.countDocuments(query);

        const communities = await communitiesQuery.exec();

        const isNext = totalCommunitiesCount > skipAmount + communities.length;

        return { communities, isNext };
    } catch (error: any) {
        console.error("Error to fetching communities: ", error);
        throw error;
    }
};

export const addMemberToCommunity = async(communityId: string, memberId: string) => {
    try {
        connectToDB();

        const community = await Community.findOne({ id: communityId });

        if(!community){
            throw new Error("Community not found");
        }

        const user = await User.findOne({ id: memberId });

        if(!user){
            throw new Error("Community not found");
        }

        if(community.members.includes(user._id)){
            throw new Error("User is already a member of the community");
        }

        community.members.push(community.id);
        await user.save();

        return community;
    } catch (error: any) {
        console.error("Error adding member to community: ", error);
        throw error;
    }
};

export const removeUserFromCommunity = async (userId: string, communityId: string) => {
    try {
        connectToDB();

        const userIdObject = await User.findOne(
            {
                id: userId,
            },
            {
                _id: 1,
            },
        );

        const communityIdObject = await Community.findOne(
            {
                id: communityId,
            },
            {
                _id: 1,
            },
        );

        if(!userIdObject){
            throw new Error("User not found");
        }

        if(!communityIdObject){
            throw new Error("Community not found");
        }

        await Community.updateOne(
            { 
                _id: communityIdObject._id, 
            },
            { 
                $pull: { members: userIdObject._id, }, 
            },
        );

        await User.updateOne(
            { 
                _id: userIdObject._id 
            },
            { 
                $pull: { communities: userIdObject._id, }, 
            },
        );

        return { success: true };
    } catch (error: any) {
        console.error("Error to removeUserFrom Community: ", error);
        throw error;
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