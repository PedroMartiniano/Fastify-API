import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeModuleUseCase } from "../../use-cases/factory/make-module-use-case";
import { AppError } from "../../errors/AppError";

export const createModuleController = async (req: FastifyRequest, rep: FastifyReply) => {
    const moduleSchema = z.object({
        name: z.string(),
        description: z.string()
    })
    const idCourseSchema = z.object({
        id_course: z.string()
    })

    const { name, description } = moduleSchema.parse(req.body)
    const { id_course } = idCourseSchema.parse(req.params)

    const createModuleUseCase = makeModuleUseCase()

    let moduleCreate
    try {
        moduleCreate = await createModuleUseCase.executeCreateModule({ name, description, id_course })
    } catch (e) {
        throw new AppError('something went wrong', 400)
    }

    return rep.status(201).send(moduleCreate)
}

export const getModuleByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const moduleUseCase = makeModuleUseCase()

    let moduleGet
    try {
        moduleGet = await moduleUseCase.executeGetModuleById(id)
    } catch (e) {
        throw new AppError('something went wrong', 400)
    }

    return rep.status(200).send(moduleGet)
}

export const editModuleController = async (req: FastifyRequest, rep: FastifyReply) => {

    const moduleSchema = z.object({
        name: z.string(),
        description: z.string()
    })

    const idSchema = z.object({
        id: z.string()
    })

    const { name, description } = moduleSchema.parse(req.body)
    const { id } = idSchema.parse(req.params)

    const moduleUseCase = makeModuleUseCase()

    let moduleEdit
    try {
        moduleEdit = await moduleUseCase.executeEditModule(id, name, description)
    } catch (e) {
        throw new AppError('Something went wrong', 400)
    }

    return rep.status(200).send(moduleEdit)
}

export const getModulesByCourseController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idCourseSchema = z.object({
        id_course: z.string()
    })

    const { id_course } = idCourseSchema.parse(req.params)

    const getModulesByCourseUseCase = makeModuleUseCase()

    let modules
    try {
        modules = await getModulesByCourseUseCase.executeGetModuleByCourse(id_course)
    } catch (e) {
        throw new AppError('Something went wrong', 400)
    }

    return rep.status(200).send(modules)
}