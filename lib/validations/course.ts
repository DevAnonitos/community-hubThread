import * as z from "zod";

export const CourseValidation  = z.object({
    course: z.string().nonempty().min(3, {
        message: "Minimum 3 characters.",
    }),
    accountId: z.string(),
});

