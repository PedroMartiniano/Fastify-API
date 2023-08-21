import { FastifyInstance } from "fastify";
import { createUserController, editUserController, getAllUsersController, getUserByIdController } from "./controller/user";
import { createCourseController, getAllCoursesController, getCourseByIdController } from "./controller/course";
import { CreateStaffController, EditStaffController, GetStaffById } from "./controller/staff";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    app.put('/user/:id', editUserController)

    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
    app.get('/courses', getAllCoursesController)

    app.post('/staff', CreateStaffController)
    app.get('/staff/:id', GetStaffById)
    app.put('/staff/:id', EditStaffController)
}