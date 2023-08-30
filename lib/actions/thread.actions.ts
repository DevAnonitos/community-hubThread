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
