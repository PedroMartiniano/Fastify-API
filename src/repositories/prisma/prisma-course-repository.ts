import { Course, Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CourseRepository } from "../course-repository";

export class PrismaCourseRepository implements CourseRepository {
    async create(data: Prisma.CourseCreateInput) {
        const course = await prisma.course.create({
            data
        })
        return course
    }

    async getCourseById(id: string) {
        const course = await prisma.course.findUnique({
            where: {
                id
            }
        })
        return course
    }

    async getAllCourses() {
        const course = await prisma.course.findMany({
            include: {
                modules: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    include: {
                        tasks: true
                    }
                }
            }
        })

        return course
    }

    async editCourse(data: Prisma.CourseCreateInput, id: string): Promise<Course | null> {
        const edit = await prisma.course.update({
            where: {
                id
            },
            data
        })

        return edit
    }

    async deleteCourse(id: string): Promise<Course> {
        const course = await prisma.course.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return course
    }

    async mostBuyedCourses(): Promise<Course[]> {
        const courses = await prisma.course.findMany({
            where: {
                status: 1
            },
            orderBy: {
                purchase: {
                    _count: 'desc'
                }
            }
        })

        return courses
    }
    
    // async ratingCourse(id_user: string, id_course: string, rating: number): Promise<Course> {
    //     const allRates = await prisma.course.findMany({

    //     })
    // }
}