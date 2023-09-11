import { Course, Prisma } from "@prisma/client";
import { CreateCourseProps } from "../@types/create-course";

export interface CourseRepository {
    create(data: CreateCourseProps): Promise<Course>
    getCourseById(id: string): Promise<Course | null>
    getAllCourses(): Promise<Course[] | null>
    editCourse(data: Prisma.CourseCreateInput, id: string): Promise<Course | null>
    deleteCourse(id: string): Promise<Course>
    mostBuyedCourses(): Promise<Course[]>
    ratingCourse(id_course: string, rating: number): Promise<Course | null>
}