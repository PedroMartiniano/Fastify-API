import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { makeStaffUseCase } from "../../use-cases/factory/make-staff-use-case"
import { AppError } from "../../errors/AppError"


export const CreateStaffController = async (req: FastifyRequest, rep: FastifyReply) => {
    const staffSchema = z.object({
        cpf: z.string().length(11),
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(6)
    })

    const { cpf, email, username, password } = staffSchema.parse(req.body)

    const staffClass = makeStaffUseCase()

    let staff
    try {
        staff = await staffClass.executeCreateStaff({ cpf, email, username, password })
    } catch (e) {
        throw new AppError('something went wrong', 400)
    }

    return rep.status(201).send(staff)
}

export const GetStaffById = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const staffClass = makeStaffUseCase()

    let staff
    try {
        staff = await staffClass.executeGetStaffById(id)
    } catch (e) {
        throw new AppError('Something went wrong', 400)
    }

    return rep.status(200).send(staff)
}

export const EditStaffController = async (req: FastifyRequest, rep: FastifyReply) => {
    const staffSchema = z.object({
        email: z.string().email(),
        username: z.string()
    })

    const idSchema = z.object({
        id: z.string()
    })

    const { email, username } = staffSchema.parse(req.body)
    const { id } = idSchema.parse(req.params)

    const staffClass = makeStaffUseCase()

    let staff
    try {
        staff = await staffClass.executeEditStaff({ id, email, username })
    } catch (e) {
        throw new AppError('something went wrong')
    }

    return rep.status(200).send(staff)
}