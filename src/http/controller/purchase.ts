import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makePurchaseUseCase } from "../../use-cases/factory/make-purchase-use-case"
import { AppError } from "../../errors/AppError"

export const createPurchaseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const purchaseSchema = z.object({
        id_user: z.string(),
    })
    const idCourseSchema = z.object({
        id_course: z.string()
    })

    const { id_user } = purchaseSchema.parse(req.body)
    const { id_course } = idCourseSchema.parse(req.params)

    const createPurchaseUseCase = makePurchaseUseCase()

    let userAlreadyBuyed
    try {
        userAlreadyBuyed = await createPurchaseUseCase.executeGetPurchase({ id_user, id_course })
    } catch (e) {
        throw new AppError('something went wrong')
    }

    if (userAlreadyBuyed) {
        throw new AppError('User Already buyed this course')
    }

    let purchaseCreate
    try {
        purchaseCreate = await createPurchaseUseCase.executeCreatePurchase({ id_user, id_course })
    } catch (e: any) {
        throw new AppError(`${e.message}`, 400)
    }

    return rep.status(201).send(purchaseCreate)
}

export const getPurchaseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id_course: z.string(),
        id_user: z.string()
    })
    const { id_course, id_user } = idSchema.parse(req.params)

    const getPurchaseUseCase = makePurchaseUseCase()

    let purchaseGet
    try {
        purchaseGet = await getPurchaseUseCase.executeGetPurchase({ id_user, id_course })
    } catch (e: any) {
        throw new AppError(`${e.message}`, 400)
    }

    return rep.status(201).send(purchaseGet)
}

export const getCoursePurchaseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idCourseSchema = z.object({
        id_course: z.string()
    })

    const { id_course } = idCourseSchema.parse(req.params)

    const getCoursePurchaseUseCase = makePurchaseUseCase()

    let purchaseGet
    try {
        purchaseGet = await getCoursePurchaseUseCase.executeGetCoursePurchase(id_course)
    } catch (e: any) {
        throw new AppError(`${e.message}`, 400)
    }

    return rep.status(201).send(purchaseGet)
}

export const getUserPurchaseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idUserSchema = z.object({
        id_user: z.string()
    })

    const { id_user } = idUserSchema.parse(req.params)

    const getUserPurchaseUseCase = makePurchaseUseCase()

    let purchaseGet
    try {
        purchaseGet = await getUserPurchaseUseCase.executeGetUserPurchase(id_user)
    } catch (e: any) {
        throw new AppError(`${e.message}`, 400)
    }

    return rep.status(201).send(purchaseGet)
}

export const cancelPurchaseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })
    const { id } = idSchema.parse(req.params)

    const cancelPurchaseUseCase = makePurchaseUseCase()

    let cancelPurchase
    try {
        cancelPurchase = await cancelPurchaseUseCase.executeCancelPurchase(id)
    } catch (e: any) {
        throw new AppError(`${e.message}`, 400)
    }

    return rep.status(201).send(cancelPurchase)
}