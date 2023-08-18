import { Course, Prisma } from "@prisma/client"

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
    
    async executeCreateCourse({ name, description, image, price }: CreateCourseRequest): Promise<CourseResponse> {
        const course: Course = await this.courseRepository.create({ name, description, image, price })
        return { course }
    }

    async getCourseById(id: string): Promise<CourseResponse> {
        const course: Course = await this.courseRepository.getCourseById(id)
        return { course }
    }

    async getAllCourses(): Promise<Course[]> {
        const courses: Course[] = await this.courseRepository.getAllCourses()

        return courses
    }
}

