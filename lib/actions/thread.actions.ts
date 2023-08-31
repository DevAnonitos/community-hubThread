"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";
import { User, Thread, Community } from "../models";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
};

// ToHandleFunc

export const createThread = async({ text, author, communityId, path }: Params) => {
    try {
        connectToDB();

        const communityObject = await Community.findOne(
            {
                id: communityId,
            },
            {
                _id: 1,
            },
        );

        const createThread = await Thread.create({
            text,
            author,
            community: communityObject,
        });

        await User.findByIdAndUpdate(author, {
            $push: {
                threads: createThread._id,
            },
        });

        if(communityObject) {
            await Community.findByIdAndUpdate(communityObject, {
                $pull: {
                    threads: createThread._id,
                }
            })
        }

    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
};

export const fetchPosts = async(pageNumber = 1, pageSize = 20) => {
    try {

        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const postQuery = Thread.find({
            parentId: {
                $in: [null, undefined],
            },
        })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: "author",
                model: User,
            })
            .populate({
                path: "community",
                model: Community,
            })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: User,
                    select: "_id name parentId image",
                },
            });

            const totalPostCount = await Thread.countDocuments({
                parentId: { $in: [null, undefined], },
            });

            const posts = await postQuery.exec();

            const isNext = totalPostCount > skipAmount + posts.length;

            return {
                posts,
                isNext,
            };
    } catch (error: any) {
        console.error('Error to fetchPosts: ', error);
        throw error;
    }
};
