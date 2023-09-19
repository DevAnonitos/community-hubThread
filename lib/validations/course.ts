import * as z from "zod";

export const CourseValidation  = z.object({
    courseThumb_photo: z.string().url().nonempty(),
    courseName: z.string().nonempty().min(3, {
        message: "Minimum 3 characters.",
    }),
    authorCourse: z.string().nonempty().min(3, {
        message: "Minimum 3 characters.",
    }),
    linkUrl: z.string().nonempty().min(3, {
        message: "Minimum 3 characters.",
    }),
    description: z.string().nonempty().min(3, {
        message: "Minimum 3 characters.",
    }),
    subjects: z.string({
        required_error: "Please select a subject",
    }),
    accountId: z.string(),
});

