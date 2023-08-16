import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PrismaPostRepository } from "../../repositories/prisma/prisma-post-repository"
import { CreatePost } from "../../use-cases/post"

export const createPostController = async (request: FastifyRequest, reply: FastifyReply) => {

    const postSchema = z.object({
        title: z.string(),
        description: z.string(),
        userId: z.string()
    })

    const { title, description, userId } = postSchema.parse(request.body)

    const postRepository = new PrismaPostRepository
    const createPost = new CreatePost(postRepository)

    try {
        await createPost.execute({ title, description, userId })
    } catch (e) {
        reply.status(400).send(e)
    }
    return reply.status(201).send('created')

}