import { Course, Prisma } from "@prisma/client";

export interface CourseRepository {
    create(data: Prisma.CourseCreateInput): Promise<Course>
    getCourseById(id: string): Promise<Course | null>
    getAllCourses(): Promise<Course[] | null>
}