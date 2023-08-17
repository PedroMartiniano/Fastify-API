import { Course, Prisma } from "@prisma/client"

interface CreateCourseRequest {
    name: string,
    description: string,
    image: string,
    price: number
}

interface CreateCourseResponse {
    course: Course
}

export class CourseClass {
    constructor(private courseRepository: any) { }
    
    async executeCreateCourse({ name, description, image, price }: CreateCourseRequest): Promise<CreateCourseResponse> {
        const course = await this.courseRepository.create({ name, description, image, price })
        return { course }
    }

    async getCourseById(id: string): Promise<CreateCourseResponse> {
        const course: Course = await this.courseRepository.getCourseById(id)
        return { course }
    }
}

