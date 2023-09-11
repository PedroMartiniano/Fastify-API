import { Course, Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CourseRepository } from "../course-repository";
import { CreateCourseProps } from "../../@types/create-course";

export class PrismaCourseRepository implements CourseRepository {
    async create(data: CreateCourseProps) {

        const { name, description, image, price, id_staff } = data

        const course = await prisma.course.create({
            data: {
                name,
                description,
                image,
                price,
                id_staff
            }
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

    async ratingCourse(id_course: string, rating: number): Promise<Course | null> {
        const lastRating = await prisma.course.findUnique({
            where: {
                id: id_course
            },
            select: {
                rating: true,
                qtdeRating: true
            }
        })

        if (!lastRating) {
            return null
        }

        let average: number = ((lastRating.rating * lastRating.qtdeRating) + rating) / (lastRating.qtdeRating + 1)

        const newAverage = await prisma.course.update({
            where: {
                id: id_course
            },
            data: {
                rating: average,
                qtdeRating: lastRating.qtdeRating + 1
            }
        })

        return newAverage
    }
}