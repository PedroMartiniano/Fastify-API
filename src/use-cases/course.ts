import { Course, Prisma } from "@prisma/client"
import { CourseRepository } from "../repositories/course-repository"
import { AppError } from "../errors/AppError"

interface CreateCourseRequest {
    name: string,
    description: string,
    image: string,
    price: number
}

interface CourseResponse {
    course: Course
}

export class CourseClass {
    constructor(private courseRepository: any) { }

    async executeCreateCourse({ name, description, image, price }: CreateCourseRequest, id_staff: string): Promise<Course> {
        const course: Course = await this.courseRepository.create({ name, description, image, price, id_staff })

        return course
    }

    async getCourseById(id: string): Promise<Course> {
        const course: Course = await this.courseRepository.getCourseById(id)

        return course
    }

    async getAllCourses(): Promise<Course[]> {
        const courses: Course[] = await this.courseRepository.getAllCourses()

        return courses
    }

    async executeEditCourse({ name, description, image, price }: CreateCourseRequest, id: string): Promise<Course> {
        const courseId: Course = await this.courseRepository.getCourseById(id)

        if (!courseId) {
            throw new AppError('course dont exist', 404)
        }

        if (courseId.status === 0) {
            throw new AppError('course deleted', 400)
        }

        const course: Course = await this.courseRepository.editCourse({ name, description, image, price }, id)

        return course
    }

    async executeDeleteCourse(id: string): Promise<Course> {
        const courseId: Course = await this.courseRepository.getCourseById(id)

        if (!courseId) {
            throw new AppError('course dont exist', 404)
        }

        if (courseId.status === 0) {
            throw new AppError('course already deleted', 400)
        }

        const course: Course = await this.courseRepository.deleteCourse(id)

        return course
    }

    async executeMostBuyedCourses(): Promise<Course[]> {
        const courses: Course[] = await this.courseRepository.mostBuyedCourses()

        return courses
    }

    async executeRatingCourse(id_course: string, rating: number): Promise<Course | null> {
        const course: Course = await this.courseRepository.ratingCourse(id_course, rating)

        return course
    }
}

