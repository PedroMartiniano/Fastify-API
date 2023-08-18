import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AppError } from "../../errors/AppError"
import { makeCourseUseCase } from "../../use-cases/factory/make-course-use-case"

export const createCourseController = async (request: FastifyRequest, reply: FastifyReply) => {

    const courseSchema = z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number()
    })

    const { name, description, image, price } = courseSchema.parse(request.body)

    const createPost = makeCourseUseCase()

    try {
        await createPost.executeCreateCourse({ name, description, image, price })
    } catch (e) {
        throw new AppError(`${e}`, 409)
    }
    return reply.status(201).send('created')
}

export const getCourseByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const courseSchema = z.object({
        id: z.string()
    })

    const { id } = courseSchema.parse(req.params)

    const getCourseById = makeCourseUseCase()

    let course
    try {
        course = await getCourseById.getCourseById(id)
    } catch (e) {
        throw new AppError(`${e}`, 409)
    }

    return rep.status(200).send(course)
}

export const getAllCoursesController = async (req: FastifyRequest, rep: FastifyReply) => {
    const getAllCourses = makeCourseUseCase()

    let courses
    try {
        courses = await getAllCourses.getAllCourses()
    } catch (e) {
        throw new AppError(`${e}`, 409)
    }

    return rep.status(200).send(courses)
}