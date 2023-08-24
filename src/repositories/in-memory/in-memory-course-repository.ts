import { Course, Prisma, } from "@prisma/client";
import { CourseRepository } from "../course-repository";

type EditCourse = {
    name: string,
    description: string,
    image: string,
    price: number
}

export class InMemoryCourseRepository implements CourseRepository {
    public items: Course[] = []
    public courseItems: Course[] = [
        { id: '123', name: 'course', description: 'course description', rating: 0, image: 'abc', price: 10, status: 1 },
        { id: '321', name: 'course2', description: 'course description2', rating: 0, image: 'cba', price: 15, status: 1 }
    ]

    async create(data: Prisma.CourseCreateInput): Promise<Course> {
        const course = {
            id: `${this.items.length}`,
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

    async editCourse({ name, description, image, price }: EditCourse, id: string): Promise<Course | null> {
        const indexCourse = this.items.findIndex((course) => course.id === id)
        const course = this.items.find((course) => course.id === id)

        if (!course) {
            return null
        }

        let newCourse = {
            ...course,
            name,
            description,
            image,
            price
        }

        this.items[indexCourse] = newCourse
        const courseEdited = this.items[indexCourse]

        return courseEdited
    }

    async deleteCourse(id: string): Promise<Course> {
        const indexCourse = this.items.findIndex((course) => course.id === id)

        let course = this.items[indexCourse]

        course = {
            ...course,
            status: 0
        }

        this.items[indexCourse] = course

        const courseDeleted = this.items[indexCourse]

        return courseDeleted
    }
}