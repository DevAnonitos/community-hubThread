"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";
import { User, Thread, Community, Course } from "../models"

interface Params {
    name: string;
    author: string;
    authorCourse: string;
    link: string;
    description?: string;
    typeCourse: string;
    path: string;
};


export const createCourse = async ({ 
    name, 
    author, 
    authorCourse, 
    link, 
    description, 
    path,
    typeCourse,
}: Params) => {
    try {
        connectToDB();

        const createCourse = await Course.create({
            name,
            author,
            authorCourse,
            link,
            description,
            typeCourse,
        });

        await User.findByIdAndUpdate(author, {
            $push: {
                courses: createCourse._id,
            }
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create course: ${error.message}`);
    }
};

export const fetchCourses = async (pageNumber = 1, pageSize = 20) => {
    try {
        connectToDB();
    
        const skipAmount = (pageNumber - 1) * pageSize;
    
        const courseQuery = Course.find({})
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
            path: "author",
            model: "User",
            });
    
        const totalCourseCount = await Course.countDocuments({});
    
        const courses = await courseQuery.exec();
    
        const isNext = totalCourseCount > skipAmount + courses.length;
    
        return {
            courses,
            isNext,
        };
    } catch (error) {
        console.error("Error fetching courses: ", error);
        throw error;
    }
};