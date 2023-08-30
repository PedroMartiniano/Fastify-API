import { FastifyReply, FastifyRequest } from "fastify"


export const verifyRole = (roleVerify: string) => {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        const { role } = req.user

        if (role !== roleVerify) {
            return rep.status(401).send({ message: 'Unauthorized' })
        }
    }
}