import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { CreateUser } from "../../use-cases/user"
import { PrismaUserRepository } from "../../repositories/prisma-user-repository"

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
        reply.status(400).send(e)
    }

    return reply.status(201).send('created')
}

export const getUsersController = async (request: FastifyRequest, reply: FastifyReply) => {
    
}