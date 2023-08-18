import { FastifyInstance } from "fastify";
import { createUserController, getAllUsersController, getUserByIdController } from "./controller/user";
import { createCourseController, getAllCoursesController, getCourseByIdController } from "./controller/course";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    
    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
    app.get('/courses', getAllCoursesController)
}