import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AppError } from "../../errors/AppError"
import { makeCourseUseCase } from "../../use-cases/factory/make-course-use-case"
import { makeModuleUseCase } from "../../use-cases/factory/make-module-use-case"
import { makePurchaseUseCase } from "../../use-cases/factory/make-purchase-use-case"

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

    return rep.status(200).send({ courses })
}

export const editCourseController = async (req: FastifyRequest, rep: FastifyReply) => {

    const courseSchema = z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number()
    })

    const idSchema = z.object({
        id: z.string()
    })

    const { name, description, image, price } = courseSchema.parse(req.body)
    const { id } = idSchema.parse(req.params)

    const editCourse = makeCourseUseCase()

    let course
    try {
        course = await editCourse.executeEditCourse({ name, description, image, price }, id)
    } catch (e) {
        throw new AppError('something went wrong', 400)
    }

    return rep.status(200).send(course)
}

export const deleteCourseController = async (req: FastifyRequest, rep: FastifyReply) => {

    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const deleteCourse = makeCourseUseCase()

    let course
    try {
        course = await deleteCourse.executeDeleteCourse(id)
    } catch (e) {
        throw new AppError('Something went wront', 400)
    }

    const deleteModules = makeModuleUseCase()

    try {
        await deleteModules.executeDeleteModulesByCourse(id)
    } catch (e) {
        throw new AppError("something went wrong", 500)
    }

    return rep.status(200).send({ course, message: "deleted" })
}

export const mostBuyedCoursesController = async (req: FastifyRequest, rep: FastifyReply) => {
    const getCourses = makeCourseUseCase()

    let courses
    try {
        courses = await getCourses.executeMostBuyedCourses()
    } catch (e) {
        throw new AppError("something went wrong", 500)
    }

    return rep.status(200).send(courses)
}

export const ratingController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idCourseSchema = z.object({
        id_course: z.string()
    })

    const bodySchema = z.object({
        id_user: z.string(),
        rating: z.number()
    })

    const { id_course } = idCourseSchema.parse(req.params)
    const { id_user, rating } = bodySchema.parse(req.body)

    const getUserPurchase = makePurchaseUseCase()

    let userPurchase
    try {
        userPurchase = await getUserPurchase.executeGetPurchase({ id_user, id_course })
    } catch (e) {
        throw new AppError('Something went wrong')
    }

    if (!userPurchase) {
        throw new AppError('User didnt buyed this course')
    }

}