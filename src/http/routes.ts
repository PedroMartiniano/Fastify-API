import { FastifyInstance } from "fastify";
import { createUserController } from "./controller/user";
import { createPostController } from "./controller/post";

export const appRoutes = async (app: FastifyInstance) =>{
    app.post('/users', createUserController)
    app.post('/post', createPostController)
}