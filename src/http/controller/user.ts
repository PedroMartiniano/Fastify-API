import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { CreateUser } from "../../use-cases/user"
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository"
import { AppError } from "../../errors/AppError"

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {

    const userSchema = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(7)
    })

    const { email, username, password } = userSchema.parse(request.body)

    const userRepository = new PrismaUserRepository
    const createUser = new CreateUser(userRepository)
    
    try {
        await createUser.execute({ email, username, password })
    } catch (e) {
        throw new AppError(`Algo deu errado`, 409)
    }

    return reply.status(201).send('created')
}

export const getUserByIdController = async (request: FastifyRequest, reply: FastifyReply) => {

}