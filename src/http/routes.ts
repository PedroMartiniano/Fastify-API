import { FastifyInstance } from "fastify";
import { createUserController, deleteUserController, editUserController, getAllUsersController, getUserByIdController, profileController, uploadImageController } from "./controller/user";
import { createCourseController, deleteCourseController, editCourseController, getAllCoursesController, getCourseByIdController, mostBuyedCoursesController, ratingController } from "./controller/course";
import { createStaffController, editStaffController, getStaffById, deleteStaffController, getAllStaffsController } from "./controller/staff";
import { createModuleController, editModuleController, getModuleByIdController, getModulesByCourseController, moduleGetController } from "./controller/module";
import { createTaskController, deleteTaskByIdController, getNextTaskController, getTaskByIdController, getTasksByIdModuleController } from "./controller/tasks";
import { alumnAverageController, createAlumnAnswerController, getModuleAlumnAnswersController } from "./controller/alumnAnswers";
import { cancelPurchaseController, createPurchaseController, getCoursePurchaseController, getPurchaseController, getUserPurchaseController } from "./controller/purchase";
import { authController } from "./controller/auth";
import { verifyJwt } from "./middlewares/verify-jwt";
import { refreshToken } from "./controller/refresh";
import { verifyRole } from "./middlewares/verify-role";
import { upload } from "../app";
import { createClassController } from "./controller/class";

export const appRoutes = async (app: FastifyInstance) => {
    // app.addHook('onRequest', verifyJwt)
    app.post('/user', {
        schema: {
            tags: ["Default"],
            description: 'Should create an user',
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    username: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        data: { type: 'object', example: {
                            email: 'user@email.com',
                            first_name: 'John',
                            last_name: 'Doe',
                            username: 'username',
                            password: '123456'
                        }}
                    }
                },
                409: {
                    description: 'Error Response',
                    type: 'string',
                    example: 'Algo deu errado'
                }
            }
        },
    }, createUserController)
    app.post('/user/image', { preHandler: upload.single('profile') }, uploadImageController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    app.put('/user', { onRequest: [verifyJwt, verifyRole('MEMBER')] }, editUserController)
    app.delete('/user', { onRequest: [verifyJwt, verifyRole('MEMBER')] }, deleteUserController)
    app.post('/user/login', authController)
    app.get('/user/get-me', { onRequest: [verifyJwt] }, profileController)
    app.patch('/token/refresh', refreshToken)

    app.post('/staff', createStaffController)
    app.get('/staff/:id', getStaffById)
    app.put('/staff/:id', editStaffController)
    app.delete('/staff/:id', deleteStaffController)
    app.get('/staffs', getAllStaffsController)

    app.post('/course', { preHandler: upload.single('course') }, createCourseController)
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
    app.get('/modules', moduleGetController)

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

    app.post('/class/create/:id_module', createClassController)
}