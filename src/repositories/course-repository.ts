import { Course, Prisma } from "@prisma/client";

export interface CourseRepository {
    create(data: Prisma.CourseCreateInput): Promise<Course>
    getCourseById(id: string): Promise<Course | null>
    getAllCourses(): Promise<Course[] | null>
    editCourse(data: Prisma.CourseCreateInput, id: string): Promise<Course | null>
    deleteCourse(id: string): Promise<Course>
}