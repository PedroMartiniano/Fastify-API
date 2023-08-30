import { FastifyInstance } from "fastify";
import { createUserController, deleteUserController, editUserController, getAllUsersController, getUserByIdController, profileController } from "./controller/user";
import { createCourseController, deleteCourseController, editCourseController, getAllCoursesController, getCourseByIdController, mostBuyedCoursesController, ratingController } from "./controller/course";
import { createStaffController, editStaffController, getStaffById, deleteStaffController, getAllStaffsController } from "./controller/staff";
import { createModuleController, editModuleController, getModuleByIdController, getModulesByCourseController } from "./controller/module";
import { createTaskController, deleteTaskByIdController, getNextTaskController, getTaskByIdController, getTasksByIdModuleController } from "./controller/tasks";
import { alumnAverageController, createAlumnAnswerController, getModuleAlumnAnswersController } from "./controller/alumnAnswers";
import { cancelPurchaseController, createPurchaseController, getCoursePurchaseController, getPurchaseController, getUserPurchaseController } from "./controller/purchase";
import { authController } from "./controller/auth";
import { verifyJwt } from "./middlewares/verify-jwt";
import { refreshToken } from "./controller/refresh";
import { verifyRole } from "./middlewares/verify-role";

export const appRoutes = async (app: FastifyInstance) => {
    // app.addHook('onRequest', verifyJwt)
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    app.put('/user/:id', { onRequest: [verifyJwt, verifyRole('ADMIN')] }, editUserController)
    app.delete('/user/:id', deleteUserController)
    app.post('/user/login', authController)
    app.get('/user/get-me', { onRequest: [verifyJwt] }, profileController)
    app.patch('/token/refresh', refreshToken)

    app.post('/staff', createStaffController)
    app.get('/staff/:id', getStaffById)
    app.put('/staff/:id', editStaffController)
    app.delete('/staff/:id', deleteStaffController)
    app.get('/staffs', getAllStaffsController)

    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
    app.get('/courses', getAllCoursesController)
    app.put('/course/:id', editCourseController)
    app.delete('/course/:id', deleteCourseController)
    app.get('/courses/buyed', mostBuyedCoursesController)
    app.post('/course/rating/:id_course', ratingController)

    app.post('/module/:id_course', createModuleController)
    app.get('/module/:id', getModuleByIdController)
    app.put('/module/:id', editModuleController)
    app.get('/modules/:id_course', getModulesByCourseController)

    app.post('/task/:id_module', createTaskController)
    app.get('/task/:id', getTaskByIdController)
    app.delete('/task/:id', deleteTaskByIdController)
    app.get('/tasks/:id_module', getTasksByIdModuleController)
    app.post('/next-task/:id_module', getNextTaskController)

    app.post('/answer-task/:id_task', createAlumnAnswerController)
    app.post('/get-alumn-answers/:id_module', getModuleAlumnAnswersController)
    app.post('/alumn-average/:id_module', alumnAverageController)

    app.post('/purchase/:id_course', createPurchaseController)
    app.get('/purchase/:id_course/:id_user', getPurchaseController)
    app.get('/purchase/course/:id_course', getCoursePurchaseController)
    app.get('/purchase/user/:id_user', getUserPurchaseController)
    app.delete('/purchase/:id', cancelPurchaseController)
}