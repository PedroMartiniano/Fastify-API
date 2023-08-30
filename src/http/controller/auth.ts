import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository"
import { AuthenticateUseCase } from "../../use-cases/auth"
import { AppError } from "../../errors/AppError"


export const authController = async (req: FastifyRequest, rep: FastifyReply) => {
    const authSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authSchema.parse(req.body)

    const prismaUserRepository = new PrismaUserRepository
    const authUseCase = new AuthenticateUseCase(prismaUserRepository)

    try {
        const user = await authUseCase.execute({ email, password })

        const token = await rep.jwtSign({
            role: user.role
        },
            {
                sign: {
                    sub: user.id
                }
            })

        const refreshToken = await rep.jwtSign({
            role: user.role
        },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            })

        return rep
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({ token })
    } catch (e) {
        if (e instanceof AppError) {
            return rep.status(e.errorCode).send(e.message)
        }
    }
}