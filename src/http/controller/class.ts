import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeClassUseCase } from "../../use-cases/factory/make-class-use-case";
import { AppError } from "../../errors/AppError";
import { makeModuleUseCase } from "../../use-cases/factory/make-module-use-case";

export const createClassController = async (req: FastifyRequest, rep: FastifyReply) => {
    const classSchema = z.object({
        name: z.string(),
        description: z.string(),
        link: z.string()
    })

    const idModuleSchema = z.object({
        id_module: z.string()
    })

    const { name, description, link } = classSchema.parse(req.body)

    const { id_module } = idModuleSchema.parse(req.params)

    const getModuleByIdUseCase = makeModuleUseCase()

    let moduleId
    try {
        moduleId = await getModuleByIdUseCase.executeGetModuleById(id_module)
    } catch {
        throw new AppError('Something went wrong', 400)
    }

    if (!moduleId) {
        throw new AppError('Modulo não encontrado', 400)
    }

    const createClassUseCase = MakeClassUseCase()

    let classCreate
    try {
        classCreate = await createClassUseCase.executeCreateClass({ name, description, link, id_module })
    } catch {
        throw new AppError('Something went wrong', 400)
    }

    return rep.status(200).send(classCreate)
}