import { FastifyInstance } from "fastify";
import { createUserController, getUserByIdController } from "./controller/user";
import { createCourseController, getCourseByIdController } from "./controller/course";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    
    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
}