import { Course, Prisma, } from "@prisma/client";
import { CourseRepository } from "../course-repository";

export class InMemoryCourseRepository implements CourseRepository {
    public items: Course[] = []

    async create(data: Prisma.CourseCreateInput): Promise<Course> {
        const course = {
            id: 'Course-1',
            name: data.name,
            description: data.description,
            rating: 0,
            image: data.image,
            price: data.price,
            status: 1
        }

        this.items.push(course)

        return course
    }

    async getCourseById(id: string): Promise<Course | null> {
        const course = this.items.find(course => course.id === id)

        if (!course) {
            return null
        }

        return course
    }
}