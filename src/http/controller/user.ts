import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AppError } from "../../errors/AppError"
import { makeUserUseCase } from "../../use-cases/factory/make-user-use-case"
import fs from 'fs/promises'
import path from 'path'

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {

    const userSchema = z.object({
        email: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        username: z.string(),
        password: z.string().min(6)
    })

    let { filename: image } = (request as any).file

    const { email, username, first_name, last_name, password } = userSchema.parse(request.body)

    const createUser = makeUserUseCase()

    try {
        await createUser.executeCreateUser({ email, username, first_name, last_name, image, password })
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }

    return reply.status(201).send('created')
}

export const getUserByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const userSchema = z.object({
        id: z.string()
    })

    const { id } = userSchema.parse(req.params)

    const getUserById = makeUserUseCase()

    let user
    try {
        user = await getUserById.executeGetUserById(id)
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }
    return rep.status(200).send(user)
}

export const getAllUsersController = async (_req: FastifyRequest, rep: FastifyReply) => {
    const getAllUsers = makeUserUseCase()

    let users
    try {
        users = await getAllUsers.executeGetAllUsers()
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }

    return rep.status(200).send(users)
}

export const editUserController = async (req: FastifyRequest, rep: FastifyReply) => {
    const userSchema = z.object({
        email: z.string().email(),
        username: z.string()
    })

    const idSchema = z.object({
        sub: z.string()
    })

    const { email, username } = userSchema.parse(req.body)
    const { sub } = idSchema.parse(req.user)

    const editUser = makeUserUseCase()

    let user

    try {
        user = await editUser.executeEditUser({ sub, email, username })
    } catch (e) {
        throw new AppError(`algo deu errado`, 400)
    }

    return rep.status(200).send(user)
}

export const deleteUserController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        sub: z.string()
    })

    const { sub } = idSchema.parse(req.user)

    const deleteUser = makeUserUseCase()

    let user
    try {
        user = await deleteUser.executeDeleteUser(sub)
    } catch (e) {
        throw new AppError('something went wrong')
    }

    return rep.status(200).send({ user, message: 'deleted' })
}

export const profileController = async (req: FastifyRequest, rep: FastifyReply) => {
    const userUseCase = makeUserUseCase()

    try {
        const user = await userUseCase.executeGetMe({ userId: req.user.sub })

        return rep.status(201).send({
            user: {
                ...user,
                password: undefined
            }
        })
    } catch (e: any) {
        throw new AppError(e.message)
    }
}

export const uploadImageController = async (req: FastifyRequest, rep: FastifyReply) => {

    const file = (req as any).file
    return rep.status(200).send('image uploaded')
}