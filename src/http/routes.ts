import { FastifyInstance } from "fastify";
import { createUserController, deleteUserController, editUserController, getAllUsersController, getUserByIdController } from "./controller/user";
import { createCourseController, deleteCourseController, editCourseController, getAllCoursesController, getCourseByIdController } from "./controller/course";
import { CreateStaffController, EditStaffController, GetStaffById, deleteStaffController, getAllStaffsController } from "./controller/staff";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    app.put('/user/:id', editUserController)
    app.delete('/user/:id', deleteUserController)

    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
    app.get('/courses', getAllCoursesController)
    app.put('/course/:id', editCourseController)
    app.delete('/course/:id', deleteCourseController)
    
    app.post('/staff', CreateStaffController)
    app.get('/staff/:id', GetStaffById)
    app.put('/staff/:id', EditStaffController)
    app.delete('/staff/:id', deleteStaffController)
    app.get('/staffs', getAllStaffsController)
}