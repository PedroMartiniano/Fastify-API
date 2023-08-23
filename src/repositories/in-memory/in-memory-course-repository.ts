import { Course, Prisma, } from "@prisma/client";
import { CourseRepository } from "../course-repository";

export class InMemoryCourseRepository implements CourseRepository {
    public items: Course[] = []
    public courseItems: Course[] = [
        { id: '123', name: 'course', description: 'course description', rating: 0, image: 'abc', price: 10, status: 1 },
        { id: '321', name: 'course2', description: 'course description2', rating: 0, image: 'cba', price: 15, status: 1 }
    ]

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

    async getAllCourses(): Promise<Course[] | null> {
        const courses = this.courseItems

        return courses
    }
}