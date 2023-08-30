import { FastifyReply, FastifyRequest } from "fastify"


export const verifyJwt = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        await req.jwtVerify()
    } catch (e) {
        return rep.status(401).send({ message: 'Unauthorized.' })
    }
}